<script setup lang="ts">
import { getMatch, saveMatch } from '@/store'
import { reactive } from 'vue';
import { useRoute, useRouter } from "vue-router";
import UpDown from '@/components/UpDown.vue';

const route = useRoute();
const router = useRouter();

const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const match = getMatch(id);
const state = reactive({
  match: match,
  date: new Date(match.time).toISOString().split("T")[0],
  time: new Date(match.time).toISOString().split("T")[1].split(":").slice(0,2).join(":")
})

function setDate() {
  state.match.time = new Date(state.date + "T" + state.time + ":00.000Z").getTime();
}
function save() {
  saveMatch(state.match);
}
function view() {
  saveMatch(state.match);
  router.push({ name: 'view', params: { id: state.match.id } })
}

function incHome() {
  state.match.homeScore++;
}
function decHome() {
  state.match.homeScore--;
  if (state.match.homeScore < 0) state.match.homeScore = 0;
}
function incAway() {
  state.match.awayScore++;
}
function decAway() {
  state.match.awayScore--;
  if (state.match.awayScore < 0) state.match.awayScore = 0;
}

</script>
<template>
  <fieldset>
    <div>
      <label for="date">Dato:</label>
      <input type="text" v-model="state.date" @change="setDate()" />
    </div>
    <div>
      <label for="date">Tid:</label>
      <input type="text" v-model="state.time" @change="setDate()" />
    </div>
    <table>
      <tr><td>
        <div>
          <label for="date">Hjemmelag:</label>
          <input type="text" v-model="state.match.home" />
        </div>
        <div>
          <label for="date">Hjemmemål:</label>
          <input type="number" v-model="state.match.homeScore" />
          <UpDown v-model="state.match.homeScore" />
        </div>
        <div>
          <label for="date">Hjørnespark:</label>
          <input type="number" v-model="state.match.homeCorners" />
          <UpDown v-model="state.match.homeCorners" />
        </div>
        <div>
          <label for="date">Skudd:</label>
          <input type="number" v-model="state.match.homeShots" />
          <UpDown v-model="state.match.homeShots" />
        </div>
        <div>
          <label for="date">Frispark:</label>
          <input type="number" v-model="state.match.homeFouls" />
          <UpDown v-model="state.match.homeFouls" />
        </div>

      </td>
      <td>
        <div>
          <label for="date">Bortelag:</label>
          <input type="text" v-model="state.match.away" />
        </div>
        <div>
          <label for="date">Bortescore:</label>
          <input type="number" v-model="state.match.awayScore" />
          <UpDown v-model="state.match.awayScore" />
        </div>
        <div>
          <label for="date">Hjørnespark:</label>
          <input type="number" v-model="state.match.awayCorners" />
          <UpDown v-model="state.match.awayCorners" />
        </div>
        <div>
          <label for="date">Skudd:</label>
          <input type="number" v-model="state.match.awayShots" />
          <UpDown v-model="state.match.awayShots" />
        </div>
        <div>
          <label for="date">Frispark:</label>
          <input type="number" v-model="state.match.awayFouls" />
          <UpDown v-model="state.match.awayFouls" />
        </div>
    </td></tr>
    </table>
    <label for="showShots">Vis skudd</label>
    <input type="checkbox" name="shotShots" v-model="state.match.showShots" />
    <label for="showCorners">Vis hjørnespark</label>
    <input type="checkbox" name="showCorners" v-model="state.match.showCorners" />
    <label for="showFouls">Vis frispark</label>
    <input type="checkbox" name="showFouls" v-model="state.match.showFouls" />

    <div class="buttonbar">
      <button @click="save">Lagre</button>
      <button @click="view">Vis</button>
    </div>
  </fieldset>
</template>
<style scoped>
fieldset {
  border: none;
}
label {
  display:block;
}
input {
  display: block;
}

.buttonbar {
  padding-top: 1em;
}
</style>