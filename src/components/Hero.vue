<template>
  <div class="hero-container">
    <video
      class="hero-video"
      autoplay
      muted
      loop
      playsinline
    >
      <source src="../assets/videos/Background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">AVAILABLE NOW</h1>
      <p class="hero-subtitle">SOLARIS & LUNARA RETURN TO NEW EDEN</p>

    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.hero-container {
  position: relative;
   width: 100vw;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  margin-left: calc(50% - 50vw);
}


.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   min-width: 100%;
   min-height: 100%;
   width: auto;
   height: auto;
  display: block;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
  z-index: 2;
}

.hero-content {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 10;
  padding: 4rem 2rem;
  max-width: 600px;
  margin-left: 3rem;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 900;
  line-height: 1.1;
  color: #000;
  margin: 0;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 0.95rem;
  color: #000;
  margin: 0;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}


@media (max-width: 1024px) {
  .hero-container {
    height: 80vh;
    justify-content: center;
  }

  .hero-content {
    padding: 2rem;
    margin-left: 0;
    text-align: center;
  }

  .hero-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 640px) {
  .hero-container {
    height: 70vh;
  }

  .hero-content {
    padding: 1.5rem;
    max-width: 100%;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 0.85rem;
  }


}



</style>
