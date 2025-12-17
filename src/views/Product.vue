<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import { loadPayhip } from '../components/payhipService';
import '../assets/styles.css'

// 🔴 Product Data Array
const products = ref([
  { 
    id: 'BmzcI', 
    name: 'Scratch 3D Model', 
    price: 10.00,
    image: 'https://payhip.com/cdn-cgi/image/format=auto,width=1500/https://pe56d.s3.amazonaws.com/o_1ialoodue1gis16pa9dfbibcidr.png',
    rating: 4.8,
    reviews: 24,
    description: 'The original Scratch design.'
  },
]);

const isLoading = ref(false);
const isInitialized = ref(false);
const route = useRoute();

// Watch for route changes and reinitialize ONLY if not already initialized
watch(() => route.path, async () => {
  if (!isInitialized.value) {
    await initializePayhip();
  }
});

onMounted(async () => {
  await initializePayhip();
});

const initializePayhip = async () => {
  // Don't reinitialize if already done
  if (isInitialized.value) {
    console.log('⚠️ Payhip already initialized, skipping...');
    return;
  }

  try {
    isLoading.value = true;

    // Load Payhip script
    await loadPayhip();

    // Wait for Vue to render the hidden links
    await nextTick();

    // Give a moment for DOM to settle
    await new Promise(resolve => setTimeout(resolve, 100));

    // Run Payhip's full Setup to ensure all handlers are attached
    if (window.Payhip?.Setup && typeof window.Payhip.Setup === 'function') {
      window.Payhip.Setup();
      console.log('✅ Payhip Setup called');
    } else if (window.Payhip?.Button?.initiateBuyButtons) {
      // Fallback to just initializing buy buttons
      window.Payhip.Button.initiateBuyButtons();
      console.log('✅ Payhip buy buttons initialized');
    }
    
    isInitialized.value = true;

  } catch (error) {
    console.error('❌ Payhip init failed:', error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Triggers the hidden Payhip link for the specific product ID.
 */
const triggerPayhip = (productId) => {
  const link = document.querySelector(`.payhip-trigger-${productId}`);

  if (!link) {
    console.error(`❌ Payhip link for ${productId} not found`);
    return;
  }

  console.log('🔵 Triggering Payhip for:', productId);
  
  // Just click - don't reinitialize
  link.click();
};

/**
 * Opens the Payhip Cart Modal/Overlay.
 */
const goToCheckout = () => {
  const cartBtn = document.querySelector('.payhip-cart-button');
  if (cartBtn) {
    cartBtn.click();
  } else {
    alert("Payhip Cart not visible. Try adding an item first.");
  }
};
</script>

<template>
  <div class="store-container">
    <h2>Available 3D Models</h2>
    
    <div v-if="isLoading" style="text-align: center; padding: 40px;">
      <p>Loading payment system...</p>
    </div>

    <div v-else class="avatar-grid">
      <div v-for="product in products" :key="product.id" class="avatar-card">
        <div class="avatar-image-container">
          <img :src="product.image" :alt="product.name" class="avatar-image" />
        </div>
        <div class="avatar-info">
          <h3 class="avatar-name">{{ product.name }}</h3>
          <div class="rating-container">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffd700" stroke="#ffd700" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span class="rating">{{ product.rating }}</span>
            <span class="reviews">({{ product.reviews }})</span>
          </div>
          <div class="avatar-footer">
            <span class="price">${{ product.price }}</span>
            <button 
              class="view-btn" 
              @click="triggerPayhip(product.id)"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Hidden Payhip trigger links -->
    <a 
      v-for="product in products"
      :key="`payhip-${product.id}`"
      :class="['payhip-buy-button', `payhip-trigger-${product.id}`]"
      :href="`https://payhip.com/b/${product.id}`"
      data-theme="none"
      :data-product="product.id"
      style="display: none;"
    >
      Buy {{ product.name }}
    </a>
  </div>
</template>