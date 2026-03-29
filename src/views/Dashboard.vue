<template>
  <div class="dashboard">
    <h1>📋 Mes Tâches</h1>

    <form @submit.prevent="creerTache">
      <input v-model="nouvelleTache.title" placeholder="Titre" required />
      <input v-model="nouvelleTache.description" placeholder="Description" />
      <select v-model="nouvelleTache.priorite">
        <option value="BASSE">Basse</option>
        <option value="MOYENNE">Moyenne</option>
        <option value="HAUTE">Haute</option>
      </select>
      <input v-model="nouvelleTache.dueDate" type="date" />
      <button type="submit">Ajouter</button>
    </form>

    <div class="taches">
      <div v-for="tache in taches" :key="tache.id" class="tache">
        <div class="tache-info">
          <h3>{{ tache.title }}</h3>
          <p>{{ tache.description }}</p>
          <span :class="'priorite ' + tache.priorite">{{ tache.priorite }}</span>
          <span class="date" v-if="tache.dueDate">📅 {{ tache.dueDate }}</span>
        </div>
        <button @click="supprimerTache(tache.id)">🗑️</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API = 'https://task-run.onrender.com'

const taches = ref([])
const nouvelleTache = ref({
  title: '',
  description: '',
  priorite: 'MOYENNE',
  dueDate: ''
})

const chargerTaches = async () => {
  const response = await axios.get(`${API}/tasks`)
  taches.value = response.data
}

const creerTache = async () => {
  await axios.post(`${API}/tasks`, nouvelleTache.value)
  nouvelleTache.value = { title: '', description: '', priorite: 'MOYENNE', dueDate: '' }
  chargerTaches()
}

const supprimerTache = async (id) => {
  await axios.delete(`${API}/tasks/${id}`)
  chargerTaches()
}

onMounted(chargerTaches)
</script>

<style scoped>
@import '../assets/styles/dashboard.css';
</style>