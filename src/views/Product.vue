<template>
  <div v-if="avatar" class="product-page">
    <button class="back-btn" @click="router.push('/')">← Back to Shop</button>
    
    <div class="product-container">
      <div class="product-left">
        <img :src="avatar.image" :alt="avatar.name" class="product-image" />
      </div>
      
      <div class="product-right">
        <h1 class="product-title">{{ avatar.name }}</h1>
        <div class="product-rating">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffd700" stroke="#ffd700" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span class="product-rating-text">{{ avatar.rating }} ({{ avatar.reviews }} reviews)</span>
        </div>
        
        <p class="product-description">{{ avatar.description }}</p>
        
        <div class="product-features">
          <h3 class="features-title">Features:</h3>
          <ul class="features-list">
            <li v-for="(feature, idx) in avatar.features" :key="idx" class="feature-item">
              ✓ {{ feature }}
            </li>
          </ul>
        </div>
        
        <div class="product-price">${{ avatar.price }}</div>
        
        <div class="product-actions">
          <!-- ✅ Changed to Payhip integration -->
          <button 
            class="add-to-cart-btn" 
            @click="triggerPayhip"
            :disabled="isLoading"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {{ isLoading ? 'Adding...' : 'Add to Cart' }}
          </button>
          <button class="favorite-product-btn" @click="toggleFavorite">
            <svg width="20" height="20" viewBox="0 0 24 24" :fill="isFavorite ? '#ff4757' : 'none'" :stroke="isFavorite ? '#ff4757' : '#fff'" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- ✅ Hidden Payhip trigger link -->
    <a 
      :class="['payhip-buy-button', `payhip-trigger-${avatar.payhipId}`]"
      :href="`https://payhip.com/b/${avatar.payhipId}`" 
      data-theme="none" 
      :data-product="avatar.payhipId" 
      style="display: none;"
      aria-hidden="true"
    >
      Payhip Trigger Link
    </a>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFavoritesStore } from '../stores/favoritesStore'
import { avatarsData } from '../data/avatars'
import { loadPayhip } from '../services/payhipService'

const route = useRoute()
const router = useRouter()
const favoritesStore = useFavoritesStore()

const avatarId = parseInt(route.params.id)
const avatar = avatarsData.find(a => a.id === avatarId)

const isLoading = ref(false)

const isFavorite = computed(() => favoritesStore.isFavorite(avatarId))

const toggleFavorite = () => {
  favoritesStore.toggle(avatarId)
}

// ✅ Load Payhip on component mount
onMounted(async () => {
  try {
    await loadPayhip()
    console.log('✅ Payhip script loaded successfully.')
  } catch (error) {
    console.error('❌ Failed to load Payhip script:', error)
  }
})

// ✅ Trigger Payhip purchase flow
const triggerPayhip = () => {
  if (isLoading.value || !avatar.payhipId) return

  const link = document.querySelector(`.payhip-trigger-${avatar.payhipId}`)

  if (link) {
    link.click()
    
    isLoading.value = true
    
    setTimeout(() => {
      isLoading.value = false
      console.log(`🛒 Product ${avatar.payhipId} added. Overlay should appear.`)
    }, 500)
  } else {
    console.error(`Payhip link for product ${avatar.payhipId} not found.`)
  }
}
</script>