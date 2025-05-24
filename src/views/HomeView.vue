<script setup lang="ts">
import { onMounted } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import FeaturesSection from '../components/sections/FeaturesSection.vue'
import DemoSection from '../components/sections/DemoSection.vue'
import PricingSection from '../components/sections/PricingSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
}

onMounted(() => {
  // Get all section elements and observe them
  const sectionElements = document.querySelectorAll('.fade-section')

  sectionElements.forEach((section) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove opacity-0 and add transition classes
          entry.target.classList.remove('opacity-0', 'translate-y-5')
          entry.target.classList.add('opacity-100', 'translate-y-0')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    observer.observe(section)
  })
})
</script>

<template>
  <div class="overflow-hidden">
    <HeroSection
      class="fade-section opacity-0 translate-y-5 transition-all duration-700 ease-out"
    />
    <FeaturesSection
      class="fade-section opacity-0 translate-y-5 transition-all duration-700 ease-out"
    />
    <DemoSection
      class="fade-section opacity-0 translate-y-5 transition-all duration-700 ease-out"
    />
    <PricingSection
      class="fade-section opacity-0 translate-y-5 transition-all duration-700 ease-out"
    />
    <ContactSection
      class="fade-section opacity-0 translate-y-5 transition-all duration-700 ease-out"
    />
  </div>
</template>
