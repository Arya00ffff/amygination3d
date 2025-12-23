<template>
  <nav class="nav">
    <div class="nav-container">
      <router-link to="/" class="logo">
        <img
          src="https://payhip.com/cdn-cgi/image/format=auto,width=500/https://pe56d.s3.amazonaws.com/o_1hsqldr3ahtqqfl1hmb1es1aa1p.png"
          alt="VRShop logo"
          class="logo-img"
          width="48"
          height="48"
        />
        <span class="logo-text">amygination</span>
      </router-link>
      
      <div :class="['nav-links', { 'mobile-open': mobileMenuOpen }]">
        <router-link to="/" class="nav-link" @click="mobileMenuOpen = false">
          Home
        </router-link>

      </div>

      <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'


const mobileMenuOpen = ref(false)


</script>