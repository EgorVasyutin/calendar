<template>
  <app-header></app-header>
  <div>
    <router-link to="/authorization">authorization</router-link>
    <router-link to="/login">login</router-link>
  </div>
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
<script>
import AppHeader from "@/components/AppHeader";
export default {
  components: { AppHeader },
};
</script>
