<template>
  <div class="app">
    <Navbar />
    <main class="main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { loadPayhip, initPayhipPreventRedirects } from './services/payhipService'

onMounted(async () => {
  // Load and initialize Payhip early
  await loadPayhip()
  // Give the Payhip script time to process and attach handlers
  setTimeout(() => {
    initPayhipPreventRedirects()
  }, 500)
})
</script>