<template>
  <div class="profil">
    <div v-if="charge" class="loading">
      <div class="spinner"></div>
      <p>Chargement du profil...</p>
    </div>

    <div v-else-if="user">
      <div class="page-header">
        <h1>👤 {{ user.nom }}</h1>
        <span class="niveau-badge">Niveau {{ user.niveau }}</span>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-icon">⚡</span>
          <span class="stat-value">{{ user.xp }}</span>
          <span class="stat-label">Points XP</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🎯</span>
          <span class="stat-value">{{ user.level }}</span>
          <span class="stat-label">Niveau</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🔥</span>
          <span class="stat-value">{{ user.streak }}</span>
          <span class="stat-label">Jours streak</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">🏆</span>
          <span class="stat-value">{{ user.badges.length }}</span>
          <span class="stat-label">Badges</span>
        </div>
      </div>

      <div class="xp-section">
        <div class="xp-header">
          <span>Progression vers le niveau {{ user.level + 1 }}</span>
          <span>{{ user.xp }} XP</span>
        </div>
        <div class="xp-bar">
          <div class="xp-progress" :style="{ width: xpProgression + '%' }"></div>
        </div>
      </div>

      <div class="badges-section">
        <h2>🏆 Badges débloqués</h2>
        <div v-if="user.badges.length === 0" class="empty-state">
          <span>🔒</span>
          <p>Aucun badge pour l'instant</p>
          <small>Complete des tâches pour en débloquer !</small>
        </div>
        <div v-else class="badges-grid">
          <div v-for="badge in user.badges" :key="badge.id" class="badge-card">
            <span class="badge-icone">{{ badge.icone }}</span>
            <h3>{{ badge.nom }}</h3>
            <p>{{ badge.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../api'

const user = ref(null)
const charge = ref(true)

const xpProgression = computed(() => {
  if (!user.value) return 0
  const xp = user.value.xp
  if (xp >= 1000) return 100
  if (xp >= 500) return ((xp - 500) / 500) * 100
  if (xp >= 200) return ((xp - 200) / 300) * 100
  if (xp >= 100) return ((xp - 100) / 100) * 100
  return (xp / 100) * 100
})

const UserCharge = async () => {
  charge.value = true
  try {
    const response = await api.get('/users')
    if (response.data.length > 0) user.value = response.data[0]
  } finally {
    charge.value = false
  }
}

onMounted(UserCharge)
</script>

<style scoped>
@import '../assets/styles/profil.css';
</style>