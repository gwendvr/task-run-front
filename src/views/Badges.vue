<template>
  <div class="badges-page">
    <div class="page-header">
      <h1>🏆 Badges</h1>
      <span class="badge-count">{{ unlockBadges }}/{{ badges.length }} débloqués</span>
    </div>

    <div v-if="charge" class="loading">
      <div class="spinner"></div>
      <p>Chargement des badges...</p>
    </div>

    <div v-else-if="badges.length === 0" class="empty-state">
      <span>🏅</span>
      <p>Aucun badge créé</p>
      <small>Crée des badges via l'API pour commencer !</small>
    </div>

    <div v-else class="badges-grid">
      <div
        v-for="badge in badges"
        :key="badge.id"
        :class="['badge-card', isUnlock(badge) ? 'unlock' : 'lock']"
      >
        <div class="badge-icone">{{ badge.icone }}</div>
        <h3>{{ badge.nom }}</h3>
        <p>{{ badge.description }}</p>
        <div class="conditions">
          <span v-if="badge.conditionXp > 0">⚡ {{ badge.xpCondition }} XP</span>
          <span v-if="badge.conditionStreak > 0">🔥 {{ badge.streakCondition }} jours</span>
          <span v-if="badge.conditionNiveau > 0">🎯 Niveau {{ badge.levelCondition }}</span>
        </div>
        <div :class="['statut', isUnlock(badge) ? 'unlock-status' : 'lock-status']">
          {{ isUnlock(badge) ? '✅ Débloqué' : '🔒 Verrouillé' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const API = 'https://task-run.onrender.com'
const badges = ref([])
const user = ref(null)
const charge = ref(true)

const isUnlock = (badge) => {
  if (!user.value) return false
  return user.value.badges.some(b => b.id === badge.id)
}

const unlockBadges = computed(() =>
  badges.value.filter(b => isUnlock(b)).length
)

const charger = async () => {
  charge.value = true
  try {
    const [badgesRes, utilisateursRes] = await Promise.all([
      axios.get(`${API}/badges`),
      axios.get(`${API}/users`)
    ])
    badges.value = badgesRes.data
    if (utilisateursRes.data.length > 0) user.value = utilisateursRes.data[0]
  } finally {
    charge.value = false
  }
}

onMounted(charger)
</script>

<style scoped>
@import '../assets/styles/badges.css';
</style>