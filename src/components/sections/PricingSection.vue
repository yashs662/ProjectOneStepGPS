<script setup lang="ts">
import { ref } from 'vue'
import { plans } from '@/constants/billingPlans'
import { pricingFAQs } from '@/constants/faq'
import { Check } from 'lucide-vue-next'
import FAQSection from '../ui/FAQSection.vue'
const billingCycle = ref<'monthly' | 'annual'>('monthly')

const toggleBillingCycle = () => {
  billingCycle.value = billingCycle.value === 'monthly' ? 'annual' : 'monthly'
}
</script>

<template>
  <section class="py-10 bg-slate-50" id="pricing">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <div
          class="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4"
        >
          Pricing
        </div>
        <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-slate-800">
          Simple, transparent pricing
        </h2>
        <p class="text-xl text-slate-600 max-w-3xl mx-auto">
          Choose the perfect plan for your fleet. All plans include a 14-day free trial.
        </p>
      </div>

      <!-- Billing Toggle -->
      <div class="flex justify-center mb-12">
        <div class="relative bg-white rounded-lg p-1 flex shadow-sm border border-slate-200">
          <button
            @click="toggleBillingCycle"
            :class="[
              'relative w-32 py-2 text-sm font-medium rounded-md focus:outline-none transition-colors duration-200',
              billingCycle === 'monthly'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:text-slate-900',
            ]"
          >
            Monthly
          </button>
          <button
            @click="toggleBillingCycle"
            :class="[
              'relative w-32 py-2 text-sm font-medium rounded-md focus:outline-none transition-colors duration-200',
              billingCycle === 'annual'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:text-slate-900',
            ]"
          >
            Annual
            <span
              class="absolute -top-2 -right-2 bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-0.5 rounded-full"
            >
              Save 20%
            </span>
          </button>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-7xl lg:mx-auto">
        <div
          v-for="plan in plans"
          :key="plan.name"
          :class="[
            'bg-white rounded-xl shadow-xl border transition-all duration-300 hover:shadow-2xl',
            plan.popular ? 'border-emerald-500 relative' : 'border-slate-200',
          ]"
        >
          <!-- Popular Badge -->
          <div
            v-if="plan.popular"
            class="absolute top-0 sm:right-0 right-20 -translate-y-1/2 translate-x-1/2"
          >
            <span
              class="inline-flex rounded-full bg-emerald-600 px-4 py-1 text-sm font-semibold text-white shadow-sm"
            >
              Most Popular
            </span>
          </div>

          <div class="p-8">
            <h3 class="text-2xl font-bold text-slate-800 mb-2">{{ plan.name }}</h3>
            <p class="text-slate-600 mb-6">{{ plan.description }}</p>
            <p class="mb-8">
              <span class="text-4xl font-bold text-slate-800"
                >${{ billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual }}</span
              >
              <span class="text-base font-medium text-slate-500"
                >/{{ billingCycle === 'monthly' ? 'month' : 'year' }}</span
              >
            </p>
            <a
              href="#contact"
              class="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-3 px-6 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              {{ plan.cta }}
            </a>
          </div>

          <div class="px-8 pb-8">
            <h4 class="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-6">
              What's included
            </h4>
            <ul class="space-y-4">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start">
                <Check class="flex-shrink-0 h-5 w-5 text-emerald-600 mt-0.5" />
                <span class="ml-3 text-slate-600">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <FAQSection :faqs="pricingFAQs" />
    </div>
  </section>
</template>
