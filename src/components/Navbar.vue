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
        <!-- ✅ Changed to button that opens Payhip cart -->
        <button @click="openPayhipCart" class="nav-link cart-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          View Cart
        </button>
        <!-- ❌ Removed Account link -->
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

const openPayhipCart = () => {
  openCart()
  mobileMenuOpen.value = false
}
</script>