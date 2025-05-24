<script setup lang="ts">
import { features } from '@/constants/features'
import { Check } from 'lucide-vue-next'
</script>

<template>
  <section class="bg-slate-50" id="features">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <div
          class="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4"
        >
          Features
        </div>
        <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-slate-800">
          Everything you need to manage your fleet
        </h2>
        <p class="text-xl text-slate-600 max-w-3xl mx-auto">
          Powerful tools and features to help you optimize your fleet operations and reduce costs.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="feature in features" :key="feature.name" class="relative group">
          <div
            class="bg-white h-full rounded-xl shadow-xl p-6 border border-slate-100 hover:shadow-2xl transition-all duration-300"
          >
            <div
              class="absolute -top-4 sm:-left-4 left-4 w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-200"
            >
              <span v-html="feature.icon" class="h-6 w-6"></span>
            </div>
            <div class="mt-4">
              <h3 class="text-lg font-semibold text-slate-800 mb-2">{{ feature.name }}</h3>
              <p class="text-slate-600">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Feature Highlight -->
      <div
        class="sm:mt-20 mt-10 bg-white rounded-xl shadow-xl overflow-hidden border border-slate-100 mb-8"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="relative h-64 lg:h-auto">
            <div
              class="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-90"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center p-8">
              <div class="text-center">
                <h3 class="text-2xl font-bold text-white mb-4">Ready to get started?</h3>
                <p class="text-lg text-white opacity-90 mb-8">
                  Join thousands of companies already using OneStepGPS to manage their fleet.
                </p>
                <a
                  href="#contact"
                  class="inline-flex items-center px-6 py-3 rounded-lg text-base font-medium text-emerald-600 bg-white hover:bg-slate-50 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
          <div class="p-8 lg:p-12">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <Check class="h-6 w-6 text-emerald-600" />
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-slate-800">24/7 Support</p>
                  <p class="mt-1 text-sm text-slate-600">Round-the-clock customer support</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <Check class="h-6 w-6 text-emerald-600" />
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-slate-800">Easy Integration</p>
                  <p class="mt-1 text-sm text-slate-600">Works with your existing systems</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <Check class="h-6 w-6 text-emerald-600" />
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-slate-800">Mobile App</p>
                  <p class="mt-1 text-sm text-slate-600">Manage on the go with our mobile app</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <Check class="h-6 w-6 text-emerald-600" />
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-slate-800">Data Security</p>
                  <p class="mt-1 text-sm text-slate-600">Enterprise-grade security</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
