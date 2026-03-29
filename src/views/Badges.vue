<template>
  <div class="badges-page">
    <h1>🏆 Badges</h1>

    <div class="badges-grid">
      <div
        v-for="badge in badges"
        :key="badge.id"
        :class="'badge-card ' + (isUnlock(badge) ? 'unlock' : 'lock')"
      >
        <span class="badge-icone">{{ badge.icone }}</span>
        <h3>{{ badge.nom }}</h3>
        <p>{{ badge.description }}</p>
        <div class="conditions">
          <span v-if="badge.conditionXp > 0">⚡ {{ badge.xpCondition }} XP</span>
          <span v-if="badge.conditionStreak > 0">🔥 {{ badge.streakCondition }} jours</span>
          <span v-if="badge.conditionNiveau > 0">🎯 Niveau {{ badge.niveauCondition }}</span>
        </div>
        <div class="statut">
          {{ isUnlock(badge) ? '✅ Débloqué' : '🔒 Verrouillé' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API = 'https://task-run.onrender.com'

const badges = ref([])
const users = ref(null)

const isUnlock = (badge) => {
  if (!users.value) return false
  return users.value.badges.some(b => b.id === badge.id)
}

const charger = async () => {
  const [badgesRes, utilisateursRes] = await Promise.all([
    axios.get(`${API}/badges`),
    axios.get(`${API}/users`)
  ])
  badges.value = badgesRes.data
  if (utilisateursRes.data.length > 0) {
    users.value = utilisateursRes.data[0]
  }
}

onMounted(charger)
</script>

<style scoped>
@import '../assets/styles/badges.css';
</style>