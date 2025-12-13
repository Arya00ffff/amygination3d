<template>
  <section class="categories">
    <button 
      v-for="cat in categories" 
      :key="cat"
      @click="$emit('update:modelValue', cat)"
      :class="['category-btn', { active: modelValue === cat }]"
    >
      {{ cat }}
    </button>
  </section>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'All'
  },
  categories: {
    type: Array,
    default: () => ['All', 'Anime', 'Kemono', 'Fantasy', 'Sci-Fi', 'Cute', 'Horror']
  }
})

defineEmits(['update:modelValue'])
</script>
