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

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'



</script>