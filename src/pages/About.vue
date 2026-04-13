<template>
  <div class="container about-page">

    <div class="glass about-card">

      <h1 class="title">🧠 About Us</h1>

      <p class="tagline">
        This page is not responsible for anything you are about to read.
      </p>

      <div class="content">

        <p>
          In 1432, a chair almost became self-aware but decided it was too much responsibility.
        </p>

        <p>
          The moon once blinked. Scientists ignored it.
        </p>

        <p>
          Johnny Basumatary from Tengapara, drives Maruti Suzuki Swift.
          Nobody asked. Yet here we are.
        </p>

        <p>
          There is a strong possibility that your ceiling knows your secrets.
          Stay calm.
        </p>

        <p>
          Penguins technically cannot drive, but spiritually they are better drivers than most humans.
        </p>

        <p>
          A sandwich somewhere is being overconfident.
          This has consequences.
        </p>

        <p>
          Time is real, but also not. Especially on Wednesdays.
        </p>

        <p>
          Someone once tried to count to infinity and stopped at 7 because it felt right.
        </p>

        <p>
          Your left sock knows things your right sock will never understand.
        </p>

        <p>
          The concept of "later" was invented by a guy who didn’t feel like doing it now.
        </p>

        <p>
          There is absolutely no reason for this page to exist.
          And yet, it persists.
        </p>

        <p class="quote">
          “If it makes sense, we remove it immediately.”
        </p>

        <button @click="brainrot">Do Not Click</button>

      </div>

    </div>

  </div>
</template>

<script setup>
const brainrot = () => {
  alert("You clicked it. Reality has been slightly delayed.")
}

document.title = "About Us"
</script>

<style scoped>
.about-page {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.about-card {
  max-width: 520px;
}

.title {
  font-size: 26px;
  text-align: center;
}

.tagline {
  text-align: center;
  opacity: 0.7;
  margin-bottom: 20px;
}

.content p {
  margin: 12px 0;
  line-height: 1.6;
}

.quote {
  margin-top: 20px;
  font-style: italic;
  opacity: 0.8;
  text-align: center;
}

button {
  margin-top: 20px;
  width: 100%;
}
</style>