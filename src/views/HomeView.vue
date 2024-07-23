<script setup lang="ts">
import { useRouter } from 'vue-router';
import ListMatches from '../components/ListMatches.vue'

const router = useRouter();
</script>

<template>
  <main>
    <ListMatches />

    <button @click="router.push({ name: 'export' })"  class="small">Export</button>
  </main>
</template>
<style scoped>

button.small {
  margin-top: 2em;
}
</style>