<script setup lang="ts">
import { getMatch } from '@/store'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import DateView from '@/components/DateView.vue'
import { toPng } from 'html-to-image'
import { default as dl } from 'downloadjs';

const route = useRoute()

const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const state = reactive({
  match: getMatch(id)
})

function download() {
  const node = document.querySelector('div.match') as HTMLElement
  toPng(node).then(function (dataUrl: string) {
    dl(dataUrl, 'matchs.png');
  }).catch(function (error) {
    console.error('oops, something went wrong!', error);
  });;
}
</script>
<template>
  <main>
    <button @click="download()">Last ned</button>
  <div class="match">
    <table>
      <tr class="date">
        <td colspan="5"><DateView :time="state.match.time" /> - {{ state.match.arena }}</td>
      </tr>
      <tr class="teams">
        <td>{{ state.match.home }}</td>
        <td>{{ state.match.homeScore }}</td>
        <td>-</td>
        <td>{{ state.match.awayScore }}</td>
        <td>{{ state.match.away }}</td>
      </tr>

      <tr v-if="state.match.showShots" class="stat">
        <td>{{ state.match.homeShots }}</td>
        <td colspan="3">Skudd</td>
        <td>{{ state.match.awayShots }}</td>
      </tr>

      <tr v-if="state.match.showCorners" class="stat">
        <td>{{ state.match.homeCorners }}</td>
        <td colspan="3">Hjørnespark</td>
        <td>{{ state.match.awayCorners }}</td>
      </tr>
      <tr v-if="state.match.showFouls" class="stat">
        <td>{{ state.match.homeFouls }}</td>
        <td colspan="3">Frispark</td>
        <td>{{ state.match.awayFouls }}</td>
      </tr>

      <tr class="filler">
        <td colspan="5"></td>
      </tr>
    </table>
  </div>
  </main>
</template>
<style scoped>
.match {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 1920px;
  height: 1080px;
  background: #000;
  padding: 1em;
  background: url('/grass.png');;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  font-size: 40px;
}
table {
  width: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
}
tr.teams {
  font-size: 100px;
  font-weight: bolder;
  height: 1.5em;
}
td:nth-child(1),
td:nth-child(2) {
  text-align: right;
}
td:nth-child(3) {
  width: 1.5em;
  text-align: center;
}
tr.date td,
tr.arena td {
  text-align: center;
  height: 3em;
}
tr.arena td {
  height: 1em;
  font-weight: normal;
}

td:nth-child(1),
td:nth-child(5) {
  width: 40%;
}
tr.stat td:nth-child(2) {
  text-align: center;
}
tr.stat td:nth-child(1) {
  text-align: right;
}
tr.stat td:nth-child(3) {
  text-align: left;
}
tr.stat {
  height: 1.5em;
  font-weight: bold;
}
</style>
