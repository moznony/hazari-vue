<template>
    <div>
        <div class="top-actions">
            <button class="reset-btn" @click="resetScores">
                🔄 Reset Scores
            </button>
        </div>

        <!-- Leaderboard -->
        <div class="glass">
            <h2>🏆 Leaderboard</h2>

            <transition-group name="list" tag="div">
                <div v-for="(p, i) in ranked" :key="p.name" class="row leaderboard-row" :class="{ top: i === 0 }">
                    <span>#{{ i + 1 }} {{ p.name }}</span>
                    <strong>{{ p.score }}</strong>
                </div>
            </transition-group>
        </div>

        <!-- Players -->
        <div v-for="(p, i) in players" :key="i" class="glass player-card"
            :style="{ borderLeft: '4px solid ' + colors[i % colors.length] }">
            <div class="player-row">
                <strong>{{ p }}</strong>
                <span class="score">{{ scores[i] }}</span>
            </div>

            <div class="input-row">
                <input v-model.number="inputs[i]" type="number" placeholder="Points..." />

                <button @click="add(i)">+</button>
            </div>
        </div>

        <!-- Winner -->
        <div v-if="winner" class="glass winner">
            <h2>🎉 {{ winner }} Wins!</h2>

            <div class="winner-actions">
                <button @click="$emit('reset')">New Game</button>
                <button @click="share">Share</button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps(['players', 'scores', 'winner'])
const emit = defineEmits(['add', 'reset'])

const inputs = ref(props.players.map(() => 0))

const resetScores = () => {
  if (confirm("Reset all scores?")) {
    emit('reset')
  }
}

// 🎨 player colors
const colors = [
    '#22c55e', '#3b82f6', '#f59e0b',
    '#ef4444', '#a855f7', '#14b8a6'
]

// add score
const add = (i) => {
    emit('add', i, inputs.value[i] || 0)
    inputs.value[i] = 0
}

// leaderboard sorting
const ranked = computed(() => {
    return props.players
        .map((p, i) => ({ name: p, score: props.scores[i] }))
        .sort((a, b) => b.score - a.score)
})

// share
const share = () => {
    const url = window.location.origin + '/?players=' + props.players.join(',')
    window.open(`https://wa.me/?text=Play Hazari: ${url}`)
}

// confetti
const confetti = () => {
    for (let i = 0; i < 100; i++) {
        const el = document.createElement('div')
        el.className = 'confetti'
        el.style.left = Math.random() * 100 + 'vw'
        el.style.top = '50vh'
        el.style.background = colors[Math.floor(Math.random() * colors.length)]
        document.body.appendChild(el)

        setTimeout(() => {
            el.style.top = Math.random() * 100 + 'vh'
            el.style.opacity = 0
        }, 10)

        setTimeout(() => el.remove(), 1200)
    }
}

// trigger confetti
watch(() => props.winner, (val) => {
    if (val) confetti()
})

// reset inputs if players change
watch(() => props.players, (newPlayers) => {
    inputs.value = newPlayers.map(() => 0)
})
</script>

<style scoped>
/* leaderboard animation */
.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease;
}

.list-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.list-move {
    transition: transform 0.3s;
}

/* leaderboard row */
.leaderboard-row {
    padding: 6px 0;
}

.top {
    color: #22c55e;
    font-weight: bold;
}

/* player card */
.player-card {
    transition: transform 0.2s ease;
}

.player-card:hover {
    transform: scale(1.02);
}

/* rows */
.player-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

/* input + button inline */
.input-row {
    display: flex;
    gap: 8px;
}

.input-row input {
    flex: 1;
}

/* small button */
.input-row button {
    width: 50px;
    padding: 10px;
    font-size: 18px;
}

/* winner */
.winner {
    text-align: center;
}

.winner-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.winner-actions button {
    flex: 1;
}
</style>