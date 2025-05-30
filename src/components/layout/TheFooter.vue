<script setup lang="ts">
import { computed } from 'vue'
import { footerLinks } from '@/constants/footer'
import { getSocialIcon } from '@/constants/icons'
import { MapPin } from 'lucide-vue-next'

const navigationSections = computed(() => [
  { title: 'Product', links: footerLinks.product },
  { title: 'Company', links: footerLinks.company },
  { title: 'Legal', links: footerLinks.legal },
])
</script>

<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Navigation Sections -->
        <div v-for="section in navigationSections" :key="section.title">
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider">
            {{ section.title }}
          </h3>
          <ul class="mt-4 space-y-4">
            <li v-for="item in section.links" :key="item.name">
              <a
                :href="item.href"
                class="text-base hover:text-white transition-colors duration-200"
              >
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Social Links -->
        <div>
          <p class="text-sm font-semibold text-white uppercase tracking-wider">Connect</p>
          <ul class="mt-4 flex space-x-6">
            <li v-for="item in footerLinks.social" :key="item.name">
              <a
                :href="item.href"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                v-html="getSocialIcon(item.icon)"
                aria-label="Social Link {{ item.name }}"
              >
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center space-x-2">
            <MapPin />
            <span class="text-xl font-bold text-white">OneStepGPS</span>
          </div>
          <p class="mt-4 md:mt-0 text-sm text-gray-400">
            © {{ new Date().getFullYear() }} OneStepGPS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
