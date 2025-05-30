<script setup lang="ts">
import { onMounted, defineAsyncComponent, ref } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import FeaturesSection from '../components/sections/FeaturesSection.vue'
const DemoSection = defineAsyncComponent(() => import('../components/sections/DemoSection.vue'))
const PricingSection = defineAsyncComponent(
  () => import('../components/sections/PricingSection.vue'),
)
const ContactSection = defineAsyncComponent(
  () => import('../components/sections/ContactSection.vue'),
)

const visibleSections = ref({
  hero: true,
  features: false,
  demo: false,
  pricing: false,
  contact: false,
})

const animatedSections = ref({
  hero: false,
  features: false,
  demo: false,
  pricing: false,
  contact: false,
})

onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: '100px',
    threshold: 0.1,
  }

  const animationOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }

  // Observer for loading sections
  const loadObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = entry.target.getAttribute(
          'data-section',
        ) as keyof typeof visibleSections.value
        if (section) {
          visibleSections.value[section] = true
          loadObserver.unobserve(entry.target)
        }
      }
    })
  }, observerOptions)

  // Observer for animations
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = entry.target.getAttribute(
          'data-animate',
        ) as keyof typeof animatedSections.value
        if (section) {
          animatedSections.value[section] = true
          animationObserver.unobserve(entry.target)
        }
      }
    })
  }, animationOptions)

  // Observe load triggers
  const loadTriggers = document.querySelectorAll('.load-trigger')
  loadTriggers.forEach((trigger) => loadObserver.observe(trigger))

  // Observe animation triggers
  const animationTriggers = document.querySelectorAll('.animate-trigger')
  animationTriggers.forEach((trigger) => animationObserver.observe(trigger))
})
</script>

<template>
  <div class="overflow-hidden">
    <!-- Hero Section -->
    <div class="animate-trigger" data-animate="hero"></div>
    <HeroSection
      :class="[
        'transition-all duration-700 ease-out',
        animatedSections.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
      ]"
    />

    <!-- Features Section -->
    <div class="animate-trigger" data-animate="features"></div>
    <FeaturesSection
      :class="[
        'transition-all duration-700 ease-out',
        animatedSections.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
      ]"
    />

    <!-- Demo Section -->
    <div class="load-trigger" data-section="demo"></div>
    <div class="animate-trigger" data-animate="demo"></div>
    <Suspense v-if="visibleSections.demo">
      <DemoSection
        :class="[
          'transition-all duration-700 ease-out',
          animatedSections.demo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
        ]"
      />
      <template #fallback>
        <div class="h-96 flex items-center justify-center">
          <div class="animate-pulse text-gray-400">Loading demo...</div>
        </div>
      </template>
    </Suspense>

    <!-- Pricing Section -->
    <div class="load-trigger" data-section="pricing"></div>
    <div class="animate-trigger" data-animate="pricing"></div>
    <Suspense v-if="visibleSections.pricing">
      <PricingSection
        :class="[
          'transition-all duration-700 ease-out',
          animatedSections.pricing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
        ]"
      />
      <template #fallback>
        <div class="h-96 flex items-center justify-center">
          <div class="animate-pulse text-gray-400">Loading pricing...</div>
        </div>
      </template>
    </Suspense>

    <!-- Contact Section -->
    <div class="load-trigger" data-section="contact"></div>
    <div class="animate-trigger" data-animate="contact"></div>
    <Suspense v-if="visibleSections.contact">
      <ContactSection
        :class="[
          'transition-all duration-700 ease-out',
          animatedSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
        ]"
      />
      <template #fallback>
        <div class="h-96 flex items-center justify-center">
          <div class="animate-pulse text-gray-400">Loading contact...</div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
.load-trigger,
.animate-trigger {
  height: 1px;
  width: 100%;
  pointer-events: none;
}
</style>
