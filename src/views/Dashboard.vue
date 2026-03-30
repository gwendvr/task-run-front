<template>
  <div class="dashboard">
    <div class="page-header">
      <h1>📋 Dashboard</h1>
      <span class="task-count">{{ tasks.length }} tâche{{ tasks.length > 1 ? 's' : '' }}</span>
    </div>

    <div class="add-task-card">
      <h2>+ Nouvelle tâche</h2>
      <form @submit.prevent="createTask" class="task-form">
        <input v-model="newTask.title" placeholder="Titre de la tâche" required />
        <input v-model="newTask.description" placeholder="Description (optionnel)" />
        <div class="form-row">
          <select v-model="newTask.priorite">
            <option value="BASSE">🟢 Basse</option>
            <option value="MOYENNE">🟡 Moyenne</option>
            <option value="HAUTE">🔴 Haute</option>
          </select>
          <input v-model="newTask.dueDate" type="date" />
          <button type="submit" class="btn-primary">Ajouter</button>
        </div>
      </form>
    </div>

    <div v-if="charge" class="loading">
      <div class="spinner"></div>
      <p>Chargement des tâches...</p>
    </div>

    <div v-else-if="tasks.length === 0" class="empty-state">
      <span>🎯</span>
      <p>Aucune tâche pour l'instant</p>
      <small>Crée ta première tâche ci-dessus !</small>
    </div>

    <div v-else class="taches-list">
      <div v-for="task in tasks" :key="task.id" class="tache-card">
        <div class="tache-left">
          <div class="tache-header">
            <span :class="'priorite-dot priorite-' + task.priorite"></span>
            <h3>{{ task.title }}</h3>
          </div>
          <p v-if="task.description" class="tache-desc">{{ task.description }}</p>
          <div class="tache-meta">
            <span :class="'badge-priorite ' + task.priorite">{{ task.priorite }}</span>
            <span v-if="task.dueDate" class="due-date">📅 {{ task.dueDate }}</span>
            <span class="statut">{{ task.statut }}</span>
          </div>
        </div>
        <div class="tache-actions">
          <button @click="deleteTask(task.id)" class="btn-danger">🗑️</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const tasks = ref([])
const charge = ref(true)
const newTask = ref({ title: '', description: '', priorite: 'MOYENNE', dueDate: '' })

const taskCharge = async () => {
  charge.value = true
  try {
    const response = await api.get('/tasks')
    tasks.value = response.data
  } finally {
    charge.value = false
  }
}

const createTask = async () => {
  await api.post('/tasks', newTask.value)
  newTask.value = { title: '', description: '', priorite: 'MOYENNE', dueDate: '' }
  taskCharge()
}

const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`)
  taskCharge()
}

onMounted(taskCharge)
</script>

<style scoped>
@import '../assets/styles/dashboard.css';
</style>