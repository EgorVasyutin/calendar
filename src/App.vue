<template>
  <app-header></app-header>
  <router-view></router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<script setup>
import AppHeader from '@/components/AppHeader'
</script>
