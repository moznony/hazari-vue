<template>
  <div class="container contact-page">

    <div class="glass contact-card">

      <h1>📡 Contact</h1>
      <p class="subtitle">Got feedback or ideas? Send a message.</p>

      <div class="form">

        <input v-model="name" placeholder="Your Name" />

        <input v-model="email" placeholder="Email Address" />

        <textarea v-model="message" placeholder="Your Message"></textarea>

        <button @click="send">Send Message</button>

      </div>

      <!-- Quick Links -->
      <div class="quick">
        <a :href="mailtoLink">📧 Email</a>
        <a :href="whatsappLink" target="_blank">💬 WhatsApp</a>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

// 👉 CHANGE THIS
const emailTo = "your@email.com"

// FIXED mailto (proper encoding)
const mailtoLink = computed(() => {
  const subject = encodeURIComponent("Contact from Hazari Tracker")
  const body = encodeURIComponent(
    `Name: ${name.value}\nEmail: ${email.value}\n\n${message.value}`
  )
  return `mailto:${emailTo}?subject=${subject}&body=${body}`
})

// FIXED WhatsApp link
const whatsappLink = computed(() => {
  const text = encodeURIComponent(
    `Hey! I want to contact you regarding Hazari Tracker`
  )
  return `https://wa.me/?text=${text}`
})

// send button
const send = () => {
  if (!name.value.trim() || !message.value.trim()) {
    alert("Please fill required fields")
    return
  }

  window.location.href = mailtoLink.value
}
</script>

<style scoped>
.contact-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.contact-card {
  width: 100%;
  max-width: 420px;
  text-align: center;
}

/* Subtitle */
.subtitle {
  opacity: 0.7;
  margin-bottom: 20px;
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Inputs */
input,
textarea {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: rgba(255,255,255,0.08);
  color: white;
}

textarea {
  min-height: 100px;
  resize: none;
}

/* Button */
button {
  margin-top: 5px;
}

/* Quick links */
.quick {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.quick a {
  text-decoration: none;
  color: #22c55e;
  font-size: 14px;
}
</style>