<template>
  <div class="avatar-card">
    <div class="avatar-image-container">
      <img :src="avatar.image" :alt="avatar.name" class="avatar-image" />
      <button class="favorite-btn" @click="toggleFavorite">
        <svg width="20" height="20" viewBox="0 0 24 24" :fill="isFavorite ? '#ff4757' : 'none'" :stroke="isFavorite ? '#ff4757' : '#fff'" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
     
    </div>
    <div class="avatar-info">
      <h3 class="avatar-name">{{ avatar.name }}</h3>
      <div class="rating-container">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffd700" stroke="#ffd700" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <span class="rating">{{ avatar.rating }}</span>
        <span class="reviews">({{ avatar.reviews }})</span>
      </div>
      <div class="avatar-footer">
        <span class="price">${{ avatar.price }}</span>
        <button class="view-btn" @click="viewProduct">
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useRouter } from 'vue-router'


const props = defineProps({
  avatar: {
    type: Object,
    required: true
  }
})

const router = useRouter()


const viewProduct = () => {
  router.push(`/product/${props.avatar.id}`)
}
</script>
