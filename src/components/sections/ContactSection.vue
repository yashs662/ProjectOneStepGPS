<script setup lang="ts">
import { ref } from 'vue'
import { fleetSizes } from '@/constants/vehicle'
import { CheckCircle, AlertCircle, Loader2, Mail, MapPin, Phone } from 'lucide-vue-next'

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  fleetSize: '',
  message: '',
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  isSubmitting.value = true
  submitError.value = ''

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    submitSuccess.value = true
    formData.value = {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: '',
      fleetSize: '',
      message: '',
    }
  } catch (error) {
    submitError.value = 'Something went wrong. Please try again.'
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="py-10 bg-slate-50" id="contact">
    <div class="container mx-auto px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <div
            class="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4"
          >
            Contact Us
          </div>
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-slate-800">Get in touch</h2>
          <p class="text-xl text-slate-600 max-w-3xl mx-auto">
            Have questions about our GPS fleet tracking solution? We're here to help.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <!-- Contact Form -->
          <div class="bg-white rounded-xl shadow-xl border border-slate-100">
            <div class="p-8">
              <form @submit="handleSubmit" class="space-y-6">
                <div
                  v-if="submitSuccess"
                  class="rounded-lg bg-emerald-50 p-4 mb-6 border border-emerald-100"
                >
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <CheckCircle class="h-5 w-5 text-emerald-600" />
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-emerald-800">
                        Thank you for your message! We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                </div>

                <div v-if="submitError" class="rounded-lg bg-red-50 p-4 mb-6 border border-red-100">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <AlertCircle class="h-5 w-5 text-red-600" />
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-red-800">
                        {{ submitError }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-slate-700 mb-1"
                      >First name</label
                    >
                    <input
                      type="text"
                      id="firstName"
                      v-model="formData.firstName"
                      required
                      class="block w-full h-8 rounded-lg border-slate-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label for="lastName" class="block text-sm font-medium text-slate-700 mb-1"
                      >Last name</label
                    >
                    <input
                      type="text"
                      id="lastName"
                      v-model="formData.lastName"
                      required
                      class="block w-full h-8 rounded-lg border-slate-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-slate-700 mb-1"
                    >Email</label
                  >
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    required
                    class="block w-full h-8 rounded-lg border-slate-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors duration-200"
                  />
                </div>

                <div>
                  <label for="company" class="block text-sm font-medium text-slate-700 mb-1"
                    >Company</label
                  >
                  <input
                    type="text"
                    id="company"
                    v-model="formData.company"
                    required
                    class="block w-full h-8 rounded-lg border-slate-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors duration-200"
                  />
                </div>

                <div>
                  <label for="phone" class="block text-sm font-medium text-slate-700 mb-1"
                    >Phone number</label
                  >
                  <input
                    type="tel"
                    id="phone"
                    v-model="formData.phone"
                    class="block w-full h-8 rounded-lg border-slate-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors duration-200"
                  />
                </div>

                <div>
                  <label for="fleetSize" class="block text-sm font-medium text-slate-700 mb-1"
                    >Fleet size</label
                  >
                  <select
                    id="fleetSize"
                    v-model="formData.fleetSize"
                    required
                    class="block w-full h-8 rounded-lg border-slate-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors duration-200"
                  >
                    <option value="">Select fleet size</option>
                    <option v-for="size in fleetSizes" :key="size" :value="size">
                      {{ size }}
                    </option>
                  </select>
                </div>

                <div>
                  <label for="message" class="block text-sm font-medium text-slate-700 mb-1"
                    >Message</label
                  >
                  <textarea
                    id="message"
                    v-model="formData.message"
                    rows="4"
                    required
                    class="block w-full rounded-lg border-slate-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors duration-200"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full flex justify-center py-3 px-6 rounded-lg text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Loader2
                      v-if="isSubmitting"
                      class="mt-1 mr-2 animate-spin h-5 w-5 text-white"
                    />
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="bg-white rounded-xl shadow-xl border border-slate-100 h-fit">
            <div class="p-8">
              <h3 class="text-lg font-semibold text-slate-800 mb-8">Contact Information</h3>
              <dl class="space-y-6">
                <dt class="flex items-start">
                  <div class="flex-shrink-0">
                    <Mail class="h-6 w-6 text-emerald-600" />
                  </div>
                  <span class="ml-3 text-sm font-medium text-slate-800">Email</span>
                </dt>
                <dd class="ml-9 mt-1 text-sm text-slate-600">
                  <a
                    href="mailto:sales@onestepgps.com"
                    class="hover:text-emerald-600 transition-colors duration-200"
                    >sales@onestepgps.com</a
                  >
                </dd>

                <dt class="flex items-start mt-6">
                  <div class="flex-shrink-0">
                    <Phone class="h-6 w-6 text-emerald-600" />
                  </div>
                  <span class="ml-3 text-sm font-medium text-slate-800">Phone</span>
                </dt>
                <dd class="ml-9 mt-1 text-sm text-slate-600">
                  <a
                    href="tel:+18005551234"
                    class="hover:text-emerald-600 transition-colors duration-200"
                    >+1 (800) 555-1234</a
                  >
                </dd>

                <dt class="flex items-start mt-6">
                  <div class="flex-shrink-0">
                    <MapPin class="h-6 w-6 text-emerald-600" />
                  </div>
                  <span class="ml-3 text-sm font-medium text-slate-800">Office</span>
                </dt>
                <dd class="ml-9 mt-1 text-sm text-slate-600">
                  123 Fleet Street<br />
                  San Francisco, CA 94105<br />
                  United States
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
