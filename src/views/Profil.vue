<template>
  <div class="profil">
    <div v-if="user">
      <h1>👤 {{ user.nom }}</h1>

      <div class="stats">
        <div class="stat">
          <span class="stat-value">{{ user.xp }}</span>
          <span class="stat-label">XP</span>
        </div>
        <div class="stat">
          <span class="stat-value">{{ user.level }}</span>
          <span class="stat-label">Niveau</span>
        </div>
        <div class="stat">
          <span class="stat-value">🔥 {{ user.streak }}</span>
          <span class="stat-label">Streak</span>
        </div>
      </div>

      <div class="xp-bar">
        <div class="xp-progress" :style="{ width: progressionXp + '%' }"></div>
      </div>
      <p class="xp-label">{{ user.xp }} XP — Niveau {{ user.level }}</p>

      <div class="badges">
        <h2>🏆 Badges débloqués</h2>
        <div v-if="user.badges.length === 0">Aucun badge pour l'instant</div>
        <div class="badge-list">
          <div v-for="badge in user.badges" :key="badge.id" class="badge">
            <span class="badge-icone">{{ badge.icone }}</span>
            <span class="badge-nom">{{ badge.nom }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Chargement...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const API = 'https://task-run.onrender.com'

const user = ref(null)

const progressionXp = computed(() => {
  if (!user.value) return 0
  const xp = user.value.xp
  if (xp >= 1000) return 100
  if (xp >= 500) return (xp - 500) / 5
  if (xp >= 200) return (xp - 200) / 3
  if (xp >= 100) return xp / 2
  return xp
})

const UserCharge = async () => {
  const response = await axios.get(`${API}/users`)
  if (response.data.length > 0) {
    user.value = response.data[0]
  }
}

onMounted(UserCharge)
</script>

<style scoped>
@import '../assets/styles/profil.css';
</style>