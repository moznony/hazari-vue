<template>
  <div class="container legal-page">

    <div class="glass legal-card">
      <h1>📜 Terms of Service</h1>

      <p>
        By using this website, you agree to the following terms.
      </p>

      <h3>Use of Service</h3>
      <p>
        This tool is provided for entertainment and score tracking purposes only.
        You use it at your own discretion.
      </p>

      <h3>No Warranty</h3>
      <p>
        We do not guarantee accuracy of scores or uninterrupted service.
        If you lose a game, it is not our responsibility 😄
      </p>

      <h3>Limitation of Liability</h3>
      <p>
        We are not responsible for any disputes, losses, or damages arising from use of this app.
      </p>

      <h3>Third-Party Services</h3>
      <p>
        Ads or external links may be shown. We are not responsible for third-party content.
      </p>

      <h3>Changes</h3>
      <p>
        These terms may be updated at any time without notice.
      </p>

      <p class="last">
        Last updated: {{ date }}
      </p>
    </div>

  </div>
</template>

<script setup>
const date = new Date().toLocaleDateString()
document.title = "Terms of Service"
</script>

<style scoped>
.legal-page {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.legal-card {
  max-width: 520px;
}

h1 {
  margin-bottom: 10px;
}

h3 {
  margin-top: 15px;
}

p {
  margin: 8px 0;
  line-height: 1.6;
}

.last {
  margin-top: 20px;
  opacity: 0.7;
}
</style>