<script setup lang="ts">
interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  faqs: FAQItem[]
}

withDefaults(defineProps<FAQSectionProps>(), {
  title: 'Frequently Asked Questions',
})
</script>

<template>
  <div class="sm:mt-20 mt-10 max-w-3xl mx-auto">
    <h3 class="text-2xl font-bold text-slate-800 text-center mb-12">
      {{ title }}
    </h3>
    <div class="space-y-8">
      <dl
        v-for="faq in faqs"
        :key="faq.question"
        class="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
      >
        <dt class="text-lg font-semibold text-slate-800 mb-2">{{ faq.question }}</dt>
        <dd class="text-slate-600">{{ faq.answer }}</dd>
      </dl>
    </div>
  </div>
</template>
