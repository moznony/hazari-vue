<template>
  <div>

    <!-- Top Actions -->
    <div class="top-actions">
      <button class="reset-btn" @click="resetScores">🔄 Reset Scores</button>
    </div>

    <!-- Leaderboard -->
    <div class="glass">
      <h2>🏆 Leaderboard</h2>

      <div
        v-for="(p,i) in ranked"
        :key="p.name"
        class="row"
      >
        <span>#{{ i + 1 }} {{ p.name }}</span>
        <strong>{{ p.score }}</strong>
      </div>
    </div>

    <!-- Players -->
    <div
      v-for="(p,i) in players"
      :key="i"
      class="glass player-card"
    >

      <!-- Player Info -->
      <div class="player-row">
        <strong>{{ p }}</strong>
        <span class="score">{{ scores[i] }}</span>
      </div>

      <!-- Input Row -->
      <div class="input-row">
        <input
          v-model.number="inputs[i]"
          type="number"
          placeholder="Points..."
        />

        <button class="add" @click="add(i)">+</button>
        <button class="sub" @click="subtract(i)">−</button>
      </div>

      <!-- Toggle History -->
      <button class="history-btn" @click="toggleHistory(i)">
        📜 History
      </button>

      <!-- History Dropdown -->
      <div v-if="showHistory[i]" class="history">
        <div
          v-for="(h,idx) in history[i]"
          :key="idx"
          class="history-item"
        >
          {{ h }}
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['players','scores','winner'])
const emit = defineEmits(['add','reset'])

const inputs = ref(props.players.map(() => 0))
const history = ref(props.players.map(() => []))
const showHistory = ref(props.players.map(() => false))

// add score
const add = (i) => {
  const val = inputs.value[i] || 0
  emit('add', i, val)
  history.value[i].unshift(`+${val}`)
  inputs.value[i] = 0
}

// subtract score
const subtract = (i) => {
  const val = inputs.value[i] || 0
  emit('add', i, -val)
  history.value[i].unshift(`-${val}`)
  inputs.value[i] = 0
}

// toggle history
const toggleHistory = (i) => {
  showHistory.value[i] = !showHistory.value[i]
}

// reset scores
const resetScores = () => {
  if (confirm("Reset all scores?")) {
    emit('reset')
    history.value = props.players.map(() => [])
  }
}

// leaderboard
const ranked = computed(() => {
  return props.players
    .map((p, i) => ({ name: p, score: props.scores[i] }))
    .sort((a, b) => b.score - a.score)
})
</script>

<style scoped>
.top-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.reset-btn {
  background: #f59e0b;
  color: white;
  padding: 8px 12px;
  border-radius: 10px;
}

/* Player card */
.player-card {
  margin-top: 10px;
}

/* Row */
.player-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.score {
  font-size: 18px;
}

/* Input row */
.input-row {
  display: flex;
  gap: 6px;
}

.input-row input {
  flex: 1;
}

/* Buttons */
.add {
  background: #22c55e;
  width: 45px;
}

.sub {
  background: #ef4444;
  width: 45px;
}

/* History */
.history-btn {
  margin-top: 8px;
  font-size: 12px;
}

.history {
  margin-top: 6px;
  background: rgba(255,255,255,0.05);
  padding: 8px;
  border-radius: 10px;
  max-height: 120px;
  overflow-y: auto;
}

.history-item {
  font-size: 12px;
  opacity: 0.8;
}
</style>