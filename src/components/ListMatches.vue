<script setup lang="ts">
import { getIndex, getMatch, newMatch } from '@/store'
import type { Match } from '@/types'
import { computed, reactive } from 'vue'
import DateView from './DateView.vue'

const index = getIndex()

const state = reactive({
  matches: [] as Match[]
})

for (const id of index) {
  try {
    const match = getMatch(id)
    state.matches.push(match)
  } catch (e) {
    console.error(e)
  }
}

const sorted = computed(() => {
  return state.matches.slice().sort((m1, m2) => m1.time - m2.time)
})

function addMatch() {
  const m = newMatch()
  state.matches.push(m)
}
</script>
<template>
  <div>
    <ul>
      <li v-for="match in sorted" :key="match.id">
        <router-link :to="{ name: 'edit', params: { id: match.id } }">
          <DateView :time="match.time" /> {{ match.home.team }} - {{ match.away.team }}
        </router-link>
      </li>
    </ul>
    <button @click="addMatch()">Lag ny kamp</button>
  </div>
</template>
