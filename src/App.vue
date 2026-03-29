<template>
  <div class="app">
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="logo">⚡</span>
        <span class="brand-name">TaskRun</span>
      </div>
      <div class="navbar-links">
        <RouterLink to="/" class="nav-link">
          <span>📋</span> Dashboard
        </RouterLink>
        <RouterLink to="/profil" class="nav-link">
          <span>👤</span> Profil
        </RouterLink>
        <RouterLink to="/badges" class="nav-link">
          <span>🏆</span> Badges
        </RouterLink>
      </div>
    </nav>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: var(--bg-primary);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  font-size: 24px;
}

.brand-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 1px;
}

.navbar-links {
  display: flex;
  gap: 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-link:hover {
  background: var(--bg-card);
  color: var(--text-primary);
}

.nav-link.router-link-active {
  background: var(--bg-card);
  color: var(--accent);
  border: 1px solid var(--accent);
}

.main-content {
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>