<template>
  <div class="container legal-page">

    <div class="glass legal-card">
      <h1>🔒 Privacy Policy</h1>

      <p>
        Your privacy is important to us. This app is designed to work without collecting personal data.
      </p>

      <h3>Information We Collect</h3>
      <p>
        We do not collect personal information such as your name, email, or location.
        All game data (players and scores) is stored locally on your device.
      </p>

      <h3>Cookies & Local Storage</h3>
      <p>
        This website may use browser storage to save your game progress.
        This data never leaves your device.
      </p>

      <h3>Third-Party Services</h3>
      <p>
        We may use third-party services such as advertising providers (e.g. Google AdSense)
        which may use cookies to serve ads.
      </p>

      <h3>Data Security</h3>
      <p>
        Since we do not store your data on servers, your information remains under your control.
      </p>

      <h3>Changes</h3>
      <p>
        This policy may be updated from time to time.
      </p>

      <p class="last">
        Last updated: {{ date }}
      </p>
    </div>

  </div>
</template>

<script setup>
const date = new Date().toLocaleDateString()
document.title = "Privacy Policy"
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