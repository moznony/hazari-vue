<template>
  <div class="container">

    <!-- Landing -->
    <div v-if="!started" class="landing">

      <h1 class="title">🃏 Hazari Tracker</h1>
      <p class="subtitle">Track your game. No login. Instant.</p>

      <div class="glass setup">

        <h2>🎯 New Game</h2>

        <!-- Players -->
        <div v-for="(p,i) in inputs" :key="i" class="player-input">
          <input
            v-model="inputs[i]"
            :placeholder="'Player ' + (i+1)"
          />
          <button class="remove" @click="removePlayer(i)">✕</button>
        </div>

        <!-- Add Player -->
        <button class="add-btn" @click="addPlayer">+ Add Player</button>

        <!-- Start -->
        <button class="start-btn" @click="start">Start Game</button>

      </div>
    </div>

    <!-- Game -->
    <div v-else>

  <!-- Top Bar -->
  <div class="top-bar">
    <button class="new-game-btn" @click="newGame">New Game</button>
  </div>

  <ScoreBoard
    :players="players"
    :scores="scores"
    :winner="winner"
    @add="addScore"
    @reset="resetGame"
  />

</div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGame } from '../composables/useGame'
import ScoreBoard from '../components/ScoreBoard.vue'
import { useRoute } from 'vue-router'

const {
  players,
  scores,
  winner,
  setPlayers,
  addScore,
  loadGame,
  resetGame
} = useGame()

const route = useRoute()

const inputs = ref(['', '']) // start with 2 players
const started = ref(false)

// add player
const addPlayer = () => {
  inputs.value.push('')
}

// remove player
const removePlayer = (i) => {
  if (inputs.value.length > 2) {
    inputs.value.splice(i, 1)
  }
}

// start game
const start = () => {
  const p = inputs.value
    .map(x => x.trim())
    .filter(x => x !== '')

  if (p.length >= 2) {
    setPlayers(p)
    started.value = true
  } else {
    alert("Minimum 2 players required")
  }
}

// load shared / saved
onMounted(() => {
  loadGame()

  if (route.query.players) {
    const list = route.query.players.split(',')
    setPlayers(list)
    started.value = true
  } else if (players.value.length) {
    started.value = true
  }
})

const newGame = () => {
  players.value = []
  scores.value = []
  winner.value = null

  inputs.value = ['', '']
  started.value = false

  localStorage.removeItem('hazari')
}

</script>