<script setup>
import { ref, onMounted } from 'vue';
import { loadPayhip } from './payhipService'; // Assume this file contains loadPayhip

// 🔴 Product Data Array
const products = ref([
  { 
    id: 'BmzcI', 
    name: 'Scratch 3D Model', 
    price: '$10.00',
    description: 'The original Scratch design.'
  },
  { 
    id: 's8WNI', 
    name: 'Second 3D Model', 
    price: '$15.00',
    description: 'A new design to complete your collection.'
  }
]);

const PAYHIP_DOMAIN = 'https://amygination3d.com/b/'; 

// Refs for state and element access (we only need one loading state for the page)
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    await loadPayhip();
    console.log('✅ Payhip script loaded successfully.');
  } catch (error) {
    console.error('❌ Failed to load Payhip script:', error);
  } finally {
    isLoading.value = false;
  }
});

/**
 * Triggers the hidden Payhip link for the specific product ID passed in.
 * @param {string} productId - The alphanumeric Payhip ID (BmzcI or s8WNI).
 */
const triggerPayhip = (productId) => {
  if (isLoading.value) return; 

  // Use the ID to find the correct hidden link element using a dynamic ref.
  const link = document.querySelector(`.payhip-trigger-${productId}`);

  if (link) {
    link.click(); 
    
    // Set loading state briefly to prevent double-clicking
    isLoading.value = true;
    
    // Crucial Fix: Wait for the Payhip's internal AJAX to finish
    setTimeout(() => {
      isLoading.value = false;
      console.log(`🛒 Product ${productId} added. Overlay should appear.`);
    }, 500); 
  } else {
    console.error(`Payhip link for product ${productId} not found.`);
  }
};

/**
 * Opens the Payhip Cart Modal/Overlay using the helper function.
 */
const goToCheckout = () => {
    // Finds the default Payhip cart button and clicks it (assuming it exists)
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
    
    <div class="product-grid">
      
      <div v-for="product in products" :key="product.id" class="product-card">
        <h3>{{ product.name }}</h3>
        <p class="price">{{ product.price }}</p>
        <p class="description">{{ product.description }}</p>

        <button 
          @click.prevent="triggerPayhip(product.id)" 
          :disabled="isLoading"
          class="add-to-cart-btn"
        >
          {{ isLoading ? 'Processing...' : 'Add to Cart' }}
        </button>
        
        <a 
          :class="['payhip-buy-button', `payhip-trigger-${product.id}`]"
          :href="PAYHIP_DOMAIN + product.id" 
          data-theme="none" 
          :data-product="product.id" 
          style="display: none;"
          aria-hidden="true"
        >
          Payhip Trigger Link
        </a>
      </div>
    </div>

    <button @click.prevent="goToCheckout" class="checkout-btn">
      View Cart / Checkout
    </button>
  </div>
</template>

<style scoped>
.store-container { max-width: 900px; margin: 20px auto; padding: 20px; text-align: center; }
.product-grid { display: flex; gap: 30px; justify-content: center; margin-bottom: 30px; }
.product-card { 
  border: 1px solid #e0e0e0; 
  padding: 20px; 
  border-radius: 10px; 
  width: 45%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}
.price { font-size: 1.4em; color: #42b983; margin: 10px 0; font-weight: bold; }
.description { font-style: italic; color: #666; margin-bottom: 20px; }

.add-to-cart-btn, .checkout-btn {
  padding: 12px 25px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}
.add-to-cart-btn {
  background-color: #007bff;
  color: white;
}
.checkout-btn {
  background-color: #333;
  color: white;
}
.add-to-cart-btn:disabled, .checkout-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>