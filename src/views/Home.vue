<template>
  <div>
    <Hero />

    <section class="hero">
      <SplashCard />
    </section>

    <SearchBar v-model="searchQuery" />

    <section class="avatars-section">
      <h2>Browse Avatars</h2>
      <div class="avatar-grid">
        <AvatarCard
          v-for="avatar in filteredAvatars"
          :key="avatar.id"
          :avatar="avatar"
        />
      </div>
    </section>

  </div>

</template>

<script setup>
import { ref, computed } from 'vue'
import Hero from '../components/Hero.vue'
import SplashCard from '../components/SplashCard.vue'
import AvatarCard from '../components/AvatarCard.vue'
import SearchBar from '../components/SearchBar.vue'
import { avatarsData } from '../data/avatars.js'

const searchQuery = ref('')

const filteredAvatars = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return avatarsData
  return avatarsData.filter(a => {
    return (
      (a.name && a.name.toLowerCase().includes(q)) ||
      (a.category && a.category.toLowerCase().includes(q)) ||
      (a.description && a.description.toLowerCase().includes(q))
    )
  })
})
</script>