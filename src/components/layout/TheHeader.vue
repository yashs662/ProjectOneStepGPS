<script setup lang="ts">
import { scrollToSection, scrollToTop } from '@/utils/utils'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { navItems } from '@/constants/header'
import { MapPin, Menu, X } from 'lucide-vue-next'

const isMenuOpen = ref(false)

const scrollToTopAndCloseMenu = (e: Event) => {
  scrollToTop(e)
  closeMenu()
}

const scrollToSectionAndCloseMenu = (e: Event, href: string) => {
  scrollToSection(e, href)
  closeMenu()
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a href="#" @click="scrollToTopAndCloseMenu" class="flex items-center space-x-2">
          <MapPin class="h-8 w-8 text-emerald-600" />
          <span class="text-xl font-bold text-emerald-600">OneStepGPS</span>
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click="(e) => scrollToSectionAndCloseMenu(e, item.href)"
            class="text-gray-600 hover:text-primary transition-colors duration-200"
          >
            {{ item.name }}
          </a>
          <RouterLink
            to="#"
            class="text-gray-600 hover:text-primary transition-colors duration-200"
          >
            Login
          </RouterLink>
          <RouterLink
            to="#"
            class="inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Get Started
          </RouterLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            <span class="sr-only">Open main menu</span>
            <Menu class="h-6 w-6" :class="{ hidden: isMenuOpen, block: !isMenuOpen }" />
            <X class="h-6 w-6" :class="{ block: isMenuOpen, hidden: !isMenuOpen }" />
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-show="isMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            @click="(e) => scrollToSectionAndCloseMenu(e, item.href)"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            {{ item.name }}
          </a>
          <RouterLink
            to="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
          >
            Login
          </RouterLink>
          <RouterLink
            to="#"
            class="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary-dark"
          >
            Get Started
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
  <!-- Spacer to prevent content from hiding under fixed header -->
  <div class="h-16"></div>
</template>
