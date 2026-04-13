<template>
  <div class="container contact-page">

    <div class="glass contact-card">
      <h1 class="title">📡 Contact</h1>
      <p class="subtitle">Have feedback or ideas? Reach out.</p>

      <!-- Form -->
      <div class="form">

        <input v-model="name" placeholder="Your Name" />

        <input v-model="email" placeholder="Email Address" />

        <textarea v-model="message" placeholder="Your Message"></textarea>

        <button @click="send">Send Message</button>

      </div>

      <!-- Quick Links -->
      <div class="quick">
        <a :href="`mailto:${emailTo}`">📧 Email</a>
        <a :href="whatsappLink" target="_blank">💬 WhatsApp</a>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

// 👉 change this to your email
const emailTo = "gamedroid168@gmail.com"

// WhatsApp link
const whatsappLink = "https://wa.me/?text=Hey, I found your Hazari Tracker!"

const send = () => {
  if (!name.value || !message.value) {
    alert("Please fill required fields")
    return
  }

  const subject = encodeURIComponent("Contact from Hazari Tracker")
  const body = encodeURIComponent(
    `Name: ${name.value}\nEmail: ${email.value}\n\n${message.value}`
  )

  window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`
}
</script>

<style scoped>
/* Page */
.contact-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

/* Card */
.contact-card {
  width: 100%;
  max-width: 420px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Glow effect */
.contact-card::before {
  content: "";
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(34,197,94,0.2), transparent 60%);
  top: -50%;
  left: -50%;
  animation: rotateGlow 8s linear infinite;
}

@keyframes rotateGlow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Text */
.title {
  font-size: 26px;
  margin-bottom: 5px;
}

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

textarea {
  min-height: 100px;
  resize: none;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: rgba(255,255,255,0.08);
  color: white;
}

/* Button */
button {
  background: linear-gradient(135deg, #22c55e, #4ade80);
  font-weight: bold;
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