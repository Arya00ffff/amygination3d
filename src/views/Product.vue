<script setup>
import { ref, onMounted } from 'vue';
import { loadPayhip } from '../components/payhipService';

// TODO: MOVE THIS INTO SOMEWHERE ELSE WHAT THE FUCK ARE U DOING
const products = ref([
  { 
    id: 'BmzcI', 
    name: 'Scratch 3D Model', 
    price: 10.00,
    image: '...',
    rating: 4.8,
    reviews: 24,
    description: 'The original Scratch design.'
  },
]);

const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    await loadPayhip();
  } catch (err) {
    console.error('Payhip failed to load', err);
  } finally {
    isLoading.value = false;
  }
});

const triggerPayhip = async (productId) => {
  if (!window.Payhip) {
    await loadPayhip();
  }

  // Open using Payhip's native window management
  if (window.Payhip?.Checkout) {
    window.Payhip.Checkout.open({
      product: productId,
      type: 'direct'
    });
  } else {
    //  fallback if shit exploded sends user to the actual payhip page
    window.location.href = `https://amygination3d.com/b/${productId}`;
  }
};
</script>

<template>
  <div class="store-container">
    <div v-if="isLoading">Loading...</div>
    
    <div v-else class="avatar-grid">
      <div v-for="product in products" :key="product.id" class="avatar-card">
        <button class="view-btn" @click="triggerPayhip(product.id)">
          View Details
        </button>
      </div>
    </div>
    
    </div>
    
</template>
