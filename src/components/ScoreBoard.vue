<template>
    <div>

        <!-- Top Actions -->
        <div class="top-actions">
            <button class="reset-btn" @click="resetScores">🔄 Reset</button>
        </div>

        <!-- Leaderboard -->
        <div class="glass">
            <h2>🏆 Leaderboard</h2>

            <transition-group name="list" tag="div">
                <div v-for="(p, i) in ranked" :key="p.name" class="row leaderboard-row">
                    <span>#{{ i + 1 }} {{ p.name }}</span>
                    <strong>{{ p.score }}</strong>
                </div>
            </transition-group>
        </div>

        <!-- Players -->
        <div v-for="(p, i) in players" :key="i" class="glass player-card">

            <!-- Player Header -->
            <div class="player-row">
                <strong>{{ p }}</strong>
                <span class="score">{{ scores[i] }}</span>
            </div>

            <!-- Input -->
            <div class="input-row">
                <input v-model.number="inputs[i]" type="number" placeholder="Points..." />

                <button class="add" @click="add(i)">+</button>
                <button class="sub" @click="subtract(i)">−</button>
            </div>

            <!-- Actions -->
            <div class="actions">
                <button class="history-btn" :class="{ active: showHistory[i] }" @click="toggleHistory(i)">
                    <span class="label">History</span>

                    <span class="arrow">
                        <span class="line"></span>
                        <span class="line"></span>
                    </span>
                </button>

                <button class="undo-btn" @click="undo(i)" :disabled="!history[i].length">
                    ↩ Undo
                </button>
            </div>

            <!-- History -->
            <transition name="fade">
                <div v-if="showHistory[i]" class="history">

                    <div v-for="(h, idx) in history[i]" :key="idx" class="history-item">
                        <div class="left">
                            <span :class="h.type">
                                {{ h.type === 'plus' ? '+' : '-' }}{{ h.value }}
                            </span>
                        </div>

                        <div class="right">
                            {{ h.time }}
                        </div>
                    </div>

                </div>
            </transition>

        </div>

    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps(['players', 'scores', 'winner'])
const emit = defineEmits(['add', 'reset'])

const inputs = ref(props.players.map(() => 0))
const history = ref(props.players.map(() => []))
const showHistory = ref(props.players.map(() => false))

// time helper
const getTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// add
const add = (i) => {
    const val = inputs.value[i] || 0
    emit('add', i, val)

    history.value[i].unshift({
        value: val,
        type: 'plus',
        time: getTime()
    })

    inputs.value[i] = 0
}

// subtract
const subtract = (i) => {
    const val = inputs.value[i] || 0
    emit('add', i, -val)

    history.value[i].unshift({
        value: val,
        type: 'minus',
        time: getTime()
    })

    inputs.value[i] = 0
}

// undo
const undo = (i) => {
    const last = history.value[i].shift()
    if (!last) return

    const reverse = last.type === 'plus' ? -last.value : last.value
    emit('add', i, reverse)
}

// toggle history
const toggleHistory = (i) => {
    showHistory.value[i] = !showHistory.value[i]
}

// reset
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

// sync players change
watch(() => props.players, (newPlayers) => {
    inputs.value = newPlayers.map(() => 0)
    history.value = newPlayers.map(() => [])
    showHistory.value = newPlayers.map(() => false)
})
</script>

<style scoped>
.top-actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}

/* 🔥 Reset Button */
.reset-btn {
    background: linear-gradient(135deg, #f59e0b, #fbbf24);
    padding: 8px 14px;
    border-radius: 12px;
    font-size: 13px;
    box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
    transition: all 0.2s ease;
}

.reset-btn:hover {
    transform: scale(1.05);
}

/* leaderboard */
.list-move {
    transition: transform 0.3s;
}

/* player card */
.player-card {
    margin-top: 12px;
    transition: transform 0.2s ease;
}

.player-card:hover {
    transform: scale(1.01);
}

/* header */
.player-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.score {
    font-size: 18px;
    font-weight: bold;
}

/* input */
.input-row {
    display: flex;
    gap: 6px;
}

.input-row input {
    flex: 1;
    border-radius: 10px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.06);
}

/* buttons */
.add {
    background: linear-gradient(135deg, #22c55e, #4ade80);
    width: 45px;
    border-radius: 10px;
    box-shadow: 0 0 6px rgba(34, 197, 94, 0.4);
}

.sub {
    background: linear-gradient(135deg, #ef4444, #f87171);
    width: 45px;
    border-radius: 10px;
    box-shadow: 0 0 6px rgba(239, 68, 68, 0.4);
}

/* actions */
.actions {
    display: flex;
    gap: 8px;
    margin-top: 8px;
}

/* 🔥 PREMIUM HISTORY BUTTON */
.history-btn {
    flex: 1;
    padding: 10px 12px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 13px;
    letter-spacing: 0.3px;


    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
}

.history-btn span {
    color: white;
    text-align: center;
}

/* glow layer */
.history-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent, rgba(34, 197, 94, 0.25), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.history-btn:hover {
    transform: scale(1.02);
    border-color: rgba(34, 197, 94, 0.4);
}

.history-btn:hover::before {
    opacity: 1;
}

/* ACTIVE */
.history-btn.active {
    border-color: #22c55e;
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
    background: rgba(34, 197, 94, 0.1);
}

/* 🔽 ARROW */
.arrow {
    transition: transform 0.3s ease;
}

.arrow.open {
    transform: rotate(180deg);
}

/* undo */
.undo-btn {
    width: 80px;
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
    border-radius: 10px;
    box-shadow: 0 0 6px rgba(59, 130, 246, 0.4);
}

.undo-btn:disabled {
    opacity: 0.4;
}

/* 🔥 HISTORY BOX */
.history {
    margin-top: 10px;
    padding: 12px;
    border-radius: 14px;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    max-height: 160px;
    overflow-y: auto;
}

/* scrollbar */
.history::-webkit-scrollbar {
    width: 4px;
}

.history::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
}

/* history items */
.history-item {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding: 6px 0;
    opacity: 0.85;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.history-item:last-child {
    border-bottom: none;
}

/* colors */
.plus {
    color: #22c55e;
    text-shadow: 0 0 6px rgba(34, 197, 94, 0.6);
}

.minus {
    color: #ef4444;
    text-shadow: 0 0 6px rgba(239, 68, 68, 0.6);
}

/* fade */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}
</style>