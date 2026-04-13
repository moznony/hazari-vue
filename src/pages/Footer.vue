<template>
  <footer class="footer">
    <div class="footer-inner">

      <!-- Links -->
      <div class="links">
        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/contact">Contact</a>
      </div>

      <!-- Copyright -->
      <p class="copy">
        © {{ year }} All rights reserved. Johnny swimming the cars in pork colour evening.
      </p>

    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  margin-top: 40px;
  padding: 20px 10px;
  border-top: 1px solid rgba(255,255,255,0.1);
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(10px);
}

.footer-inner {
  max-width: 420px;
  margin: auto;
  text-align: center;
}

/* Links */
.links {
  margin-bottom: 10px;
}

.links a {
  margin: 0 8px;
  font-size: 13px;
  color: white;
  text-decoration: none;
  opacity: 0.7;
}

.links a:hover {
  opacity: 1;
}

/* Copyright */
.copy {
  font-size: 12px;
  opacity: 0.6;
  line-height: 1.4;
}
</style>