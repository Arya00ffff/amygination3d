<template>
  <div>
    <section class="hero">
      <h1 class="hero-title">Premium VRChat Avatars</h1>
      <p class="hero-subtitle">Discover unique, high-quality avatars for your virtual identity</p>
      <SearchBar v-model="searchQuery" />
    </section>

    <CategoryFilter v-model="selectedCategory" :categories="categories" />

    <section class="avatar-grid">
      <AvatarCard 
        v-for="avatar in filteredAvatars" 
        :key="avatar.id" 
        :avatar="avatar"
      />
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AvatarCard from '../components/AvatarCard.vue'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import { avatarsData } from '../data/avatars'

const searchQuery = ref('')
const selectedCategory = ref('All')
const categories = ['All', 'Anime', 'Kemono', 'Fantasy', 'Sci-Fi', 'Cute', 'Horror']

const filteredAvatars = computed(() => {
  let filtered = avatarsData
  
  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(a => a.category === selectedCategory.value)
  }
  
  if (searchQuery.value) {
    filtered = filtered.filter(a => 
      a.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  return filtered
})
</script>