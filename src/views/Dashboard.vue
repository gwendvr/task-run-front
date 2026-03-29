<template>
  <div class="dashboard">
    <h1>📋 Mes Tâches</h1>

    <form @submit.prevent="createTask">
      <input v-model="newTask.title" placeholder="Titre" required />
      <input v-model="newTask.description" placeholder="Description" />
      <select v-model="newTask.priorite">
        <option value="BASSE">Basse</option>
        <option value="MOYENNE">Moyenne</option>
        <option value="HAUTE">Haute</option>
      </select>
      <input v-model="newTask.dueDate" type="date" />
      <button type="submit">Ajouter</button>
    </form>

    <div class="task-list">
      <div v-for="task in tasks" :key="task.id" class="task">
        <div class="task-info">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <span :class="'priorite ' + task.priorite">{{ task.priorite }}</span>
          <span class="date" v-if="task.dueDate">📅 {{ task.dueDate }}</span>
        </div>
        <button @click="deleteTask(task.id)">🗑️</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API = 'https://task-run.onrender.com'

const tasks = ref([])
const newTask = ref({
  title: '',
  description: '',
  priorite: 'MOYENNE',
  dueDate: ''
})

const TasksCharge = async () => {
  const response = await axios.get(`${API}/tasks`)
  tasks.value = response.data
}

const createTask = async () => {
  await axios.post(`${API}/tasks`, newTask.value)
  newTask.value = { title: '', description: '', priorite: 'MOYENNE', dueDate: '' }
  TasksCharge()
}

const deleteTask = async (id) => {
  await axios.delete(`${API}/tasks/${id}`)
  TasksCharge()
}

onMounted(TasksCharge)
</script>

<style scoped>
@import '../assets/styles/dashboard.css';
</style>