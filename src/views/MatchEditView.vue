<script setup lang="ts">
import { getMatch, saveMatch } from '@/store'
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UpDown from '@/components/UpDown.vue'

const route = useRoute()
const router = useRouter()

const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const match = getMatch(id)
const state = reactive({
  match: match,
  date: new Date(match.time).toISOString().split('T')[0],
  time: new Date(match.time).toISOString().split('T')[1].split(':').slice(0, 2).join(':')
})

function setDate() {
  state.match.time = new Date(state.date + 'T' + state.time + ':00.000Z').getTime();
  save();
}
function save() {
  console.log("Saving...");
  saveMatch(state.match)
  console.log("Saved");
}
function view() {
  save();
  router.push({ name: 'view', params: { id: state.match.id } })
}
const hours = new Array(24).fill(0).map((_, i) => i);
const minutes = new Array(12).fill(0).map((_,i) => i * 5);
</script>
<template>
  <fieldset>
    <div>
      <label for="date">Dato:</label>
      <input type="text" v-model="state.date" @change="setDate()" />
    </div>
    <div>
      <label for="date">Tid:</label>
      <input type="text" v-model="state.time" @change="setDate()" style="width: 4em;"/>
    </div>
    <div>
      <label for="arena">Arena:</label>
      <input type="text" v-model="state.match.arena" @change="save()" />
    </div>
    <table>
      <tr>
        <td>
          <div>
            <label for="date">Hjemmelag:</label>
            <input type="text" v-model="state.match.home.team" @change="save()"/>
          </div>
          <div>
            <label for="date">Mål:</label>
            <input type="number" v-model="state.match.home.score" @change="save()" />
            <UpDown v-model="state.match.home.score" @update:model-value="save()"/>
          </div>
          <div>
            <label for="date">Skudd:</label>
            <input type="number" v-model="state.match.home.shots" @change="save()" />
            <UpDown v-model="state.match.home.shots" @update:model-value="save()"/>
          </div>
          <div>
            <label for="date">Hjørnespark:</label>
            <input type="number" v-model="state.match.home.corners" @change="save()" />
            <UpDown v-model="state.match.home.corners" @update:model-value="save()"/>
          </div>
          <div>
            <label for="date">Frispark:</label>
            <input type="number" v-model="state.match.home.fouls" @change="save()" />
            <UpDown v-model="state.match.home.fouls" @update:model-value="save()" />
          </div>
          <div>
            <label for="date">Straffer:</label>
            <input type="number" v-model="state.match.home.penalties" @change="save()" />
            <UpDown v-model="state.match.home.penalties" @update:model-value="save()" />
          </div>
        </td>
        <td>
          <div>
            <label for="date">Bortelag:</label>
            <input type="text" v-model="state.match.away.team" @change="save()" />
          </div>
          <div>
            <label for="date">Mål:</label>
            <input type="number" v-model="state.match.away.score" @change="save()" />
            <UpDown v-model="state.match.away.score" @update:model-value="save()" />
          </div>
          <div>
            <label for="date">Skudd:</label>
            <input type="number" v-model="state.match.away.shots" @change="save()" />
            <UpDown v-model="state.match.away.shots" @update:model-value="save()" />
          </div>
          <div>
            <label for="date">Hjørnespark:</label>
            <input type="number" v-model="state.match.away.corners" @change="save()" />
            <UpDown v-model="state.match.away.corners" @update:model-value="save()" />
          </div>
          <div>
            <label for="date">Frispark:</label>
            <input type="number" v-model="state.match.away.fouls" @change="save()" />
            <UpDown v-model="state.match.away.fouls" @update:model-value="save()"/>
          </div>
          <div>
            <label for="date">Straffer:</label>
            <input type="number" v-model="state.match.away.penalties" @change="save()" />
            <UpDown v-model="state.match.away.penalties" @update:model-value="save()"/>
          </div>
        </td>
      </tr>
    </table>
    <label for="showShots">Vis skudd</label>
    <input type="checkbox" name="shotShots" v-model="state.match.showShots" @change="save()" />
    <label for="showCorners">Vis hjørnespark</label>
    <input type="checkbox" name="showCorners" v-model="state.match.showCorners" @change="save()" />
    <label for="showFouls">Vis frispark</label>
    <input type="checkbox" name="showFouls" v-model="state.match.showFouls" @change="save()" />
    <label for="showPenalties">Vis straffer</label>
    <input type="checkbox" name="showPenalties" v-model="state.match.showPenalties" @change="save()" />

    <div class="buttonbar">
      <button @click="view">Vis</button>
    </div>
    <label for="notes">Notater (hvem scora osv.)</label>
    <textarea name="notes" v-model="state.match.notes" @change="save()"></textarea>
  </fieldset>
</template>
<style scoped>
fieldset {
  border: none;
}
label {
  display: block;
}
input {
  display: block;
}
table {
  width: 100%;
}
table tr td {
  width: 50%;
}
input[type='number'] {
  width: 4em;
  text-align: right;
}
.buttonbar {
  padding-top: 1em;
}

label {
  font-weight: bold;
}
textarea {
  width: 100%;
  height: 5em;
  margin-bottom: 5em;
}
</style>
