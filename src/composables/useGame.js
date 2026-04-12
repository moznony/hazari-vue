import { ref, watch } from 'vue'

export const useGame = () => {
  const players = ref([])
  const scores = ref([])
  const winner = ref(null)

  const setPlayers = (names) => {
    players.value = names
    scores.value = names.map(() => 0)
    winner.value = null
  }

  const addScore = (i, val) => {
    scores.value[i] += val

    if (scores.value[i] >= 1000 && !winner.value) {
      winner.value = players.value[i]
    }
  }

  // Auto save
  watch([players, scores, winner], () => {
    localStorage.setItem('hazari', JSON.stringify({
      players: players.value,
      scores: scores.value,
      winner: winner.value
    }))
  }, { deep: true })

  const loadGame = () => {
    const data = JSON.parse(localStorage.getItem('hazari'))
    if (data) {
      players.value = data.players || []
      scores.value = data.scores || []
      winner.value = data.winner || null
    }
  }

  const resetGame = () => {
    scores.value = players.value.map(() => 0)
    winner.value = null
  }

  return {
    players,
    scores,
    winner,
    setPlayers,
    addScore,
    loadGame,
    resetGame
  }
}