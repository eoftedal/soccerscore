<script setup lang="ts">
import { getMatch } from '@/store'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import DateView from '@/components/DateView.vue'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { saveAs } from "file-saver";

const route = useRoute()

const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const state = reactive({
  match: getMatch(id)
})

function download() {
  const node = document.querySelector(".match") as HTMLElement;
  toBlob(node).then(function (blob) {
     saveAs(blob, 'my-node.png');
  });
}
</script>
<template>
  <div class="match" @click="download()">
    <table>
      <tr class="date">
        <td colspan="5"><DateView :time="state.match.time" /></td>
      </tr>
      <tr class="arena">
        <td colspan="5">{{ state.match.arena }}</td>
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
</template>
<style scoped>
.match {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  background: #000;
  padding: 1em;
  background: url('/grass.avif') no-repeat center center;
  background-size: cover;
}
table {
  width: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
  min-height: 50vw;
}
tr.teams {
  font-size: 5vw;
  font-weight: bolder;
  height: 10vw;
}
td:nth-child(1),
td:nth-child(2) {
  text-align: right;
}
td:nth-child(3) {
  width: 5vw;
  text-align: center;
}
tr.date td,
tr.arena td {
  text-align: center;
  font-weight: bold;
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
