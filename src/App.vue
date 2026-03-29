<template>
  <nav>
    <RouterLink to="/">Dashboard</RouterLink>
    <RouterLink to="/profil">Profil</RouterLink>
    <RouterLink to="/badges">Badges</RouterLink>
  </nav>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
nav {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #2c3e50;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  color: #42b883;
}
</style>