<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { scrollToSection } from '@/utils/utils'
import { CircleCheck, Zap } from 'lucide-vue-next'

const stats = [
  { label: 'Active Vehicles', value: '10,000+' },
  { label: 'Countries', value: '50+' },
  { label: 'Customer Satisfaction', value: '98%' },
]
</script>

<template>
  <section class="relative overflow-hidden bg-slate-50" id="hero">
    <!-- Background Pattern -->
    <div class="absolute inset-0">
      <div
        class="relative h-full w-full bg-red [&>div]:absolute [&>div]:h-full [&>div]:w-full [&>div]:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [&>div]:[background-size:16px_16px] [&>div]:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      >
        <div></div>
      </div>
    </div>

    <div class="relative py-10 sm:py-24">
      <div class="container mx-auto px-4">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8 flex align-middle flex-col">
          <!-- Text Content -->
          <div class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <div
              class="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4"
            >
              Fleet Management Made Simple
            </div>
            <h1 class="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
              <span class="block">Track Your Fleet</span>
              <span class="block text-emerald-600">Anywhere, Anytime</span>
            </h1>
            <p class="text-xl text-slate-600 mb-8">
              Real-time GPS tracking, advanced analytics, and powerful fleet management tools.
              Optimize your operations and reduce costs with our comprehensive solution.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
              <RouterLink
                to="#"
                class="inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Get Started Free
              </RouterLink>
              <a
                href="/#demo"
                @click="(e) => scrollToSection(e, '#demo')"
                class="inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors duration-200 border border-slate-200 shadow-sm hover:shadow-md"
              >
                Watch Demo
              </a>
            </div>
          </div>

          <!-- Stats -->
          <div
            class="w-full mt-12 lg:mt-0 lg:col-span-6 flex flex-col bg-white rounded-xl shadow-xl p-6 border border-slate-100 h-fit self-center"
          >
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div v-for="stat in stats" :key="stat.label" class="p-4 bg-slate-50 rounded-lg">
                <dt class="text-sm font-medium text-slate-500">
                  {{ stat.label }}
                </dt>
                <dd class="mt-1 text-2xl font-semibold text-slate-800">
                  {{ stat.value }}
                </dd>
              </div>
            </div>

            <!-- Feature Highlights -->
            <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div
                class="relative rounded-lg border border-slate-200 bg-white p-4 flex items-center space-x-3 hover:border-emerald-500 transition-colors duration-200"
              >
                <div class="flex-shrink-0">
                  <CircleCheck class="h-6 w-6 text-emerald-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-slate-800">Real-time Tracking</p>
                  <p class="text-sm text-slate-500">Live location updates every 30 seconds</p>
                </div>
              </div>

              <div
                class="relative rounded-lg border border-slate-200 bg-white p-4 flex items-center space-x-3 hover:border-emerald-500 transition-colors duration-200"
              >
                <div class="flex-shrink-0">
                  <Zap class="h-6 w-6 text-emerald-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-slate-800">Instant Alerts</p>
                  <p class="text-sm text-slate-500">Get notified of important events</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
