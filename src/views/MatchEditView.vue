<script setup lang="ts">
import { getMatch, saveMatch } from '@/store'
import { reactive, watch } from 'vue'
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

watch(
  () => state.match.home.score, 
  (to, from) => {
    state.match.home.shots += to - from;
  }
)
watch(
  () => state.match.away.score, 
  (to, from) => {
    state.match.away.shots += to - from;
  }
)

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
function swap() {
  const home = state.match.home;
  state.match.home = state.match.away;
  state.match.away = home;
  save();
}
//const hours = new Array(24).fill(0).map((_, i) => i);
//const minutes = new Array(12).fill(0).map((_,i) => i * 5);
</script>
<template>
  <fieldset>
    <button @click="swap" class="small">Bytt hjemme/bortelag</button>
    <div>
      <label for="date">Dato:</label>
      <input type="date" v-model="state.date" @change="setDate()" />
    </div>
    <div>
      <label for="date">Tid:</label>
      <input type="time" v-model="state.time" @change="setDate()" />
    </div>
    <div>
      <label for="arena">Arena:</label>
      <input type="text" v-model="state.match.arena" @change="save()" />
    </div>
    <div class="grid">
    <div class="column">
          <div>
            <label for="date">Hjemmelag:</label>
            <input type="text" v-model="state.match.home.team" @change="save()"/>
          </div>
          <div>
            <div class="num">
              <label for="date">Mål:</label>
              <input type="number" v-model="state.match.home.score" @change="save()" />
            </div>
            <UpDown v-model="state.match.home.score" @update:model-value="save()"/>
          </div>
          <div>
            <div class="num">
              <label for="date">Skudd:</label>
              <input type="number" v-model="state.match.home.shots" @change="save()" />
            </div>
            <UpDown v-model="state.match.home.shots" @update:model-value="save()"/>
          </div>
          <div>
            <div class="num">
              <label for="date">Hjørnespark:</label>
              <input type="number" v-model="state.match.home.corners" @change="save()" />
            </div>
            <UpDown v-model="state.match.home.corners" @update:model-value="save()"/>
          </div>
          <div>
            <div class="num">
              <label for="date">Frispark:</label>
              <input type="number" v-model="state.match.home.fouls" @change="save()" />
            </div>
            <UpDown v-model="state.match.home.fouls" @update:model-value="save()" />
          </div>
          <div>
            <div class="num">
              <label for="date">Straffer:</label>
              <input type="number" v-model="state.match.home.penalties" @change="save()" />
            </div>
            <UpDown v-model="state.match.home.penalties" @update:model-value="save()" />
          </div>
          <div>
            <div class="num">
              <label for="date">Gule kort:</label>
              <input type="number" v-model="state.match.home.yellowCards" @change="save()" />
            </div>
            <UpDown v-model="state.match.home.yellowCards" @update:model-value="save()"/>
          </div>
          <div>
            <div class="num">
              <label for="date">Røde kort:</label>
              <input type="number" v-model="state.match.home.redCards" @change="save()" />
            </div>
            <UpDown v-model="state.match.home.redCards" @update:model-value="save()"/>
          </div>
    </div>
    <div class="column">
          <div>
            <label for="date">Bortelag:</label>
            <input type="text" v-model="state.match.away.team" @change="save()" />
          </div>
          <div>
            <div class="num">
              <label for="date">Mål:</label>
              <input type="number" v-model="state.match.away.score" @change="save()" />
            </div>
            <UpDown v-model="state.match.away.score" @update:model-value="save()" />
          </div>
          <div>
            <div class="num">
              <label for="date">Skudd:</label>
              <input type="number" v-model="state.match.away.shots" @change="save()" />
            </div>
            <UpDown v-model="state.match.away.shots" @update:model-value="save()" />
          </div>
          <div>
            <div class="num">
              <label for="date">Hjørnespark:</label>
              <input type="number" v-model="state.match.away.corners" @change="save()" />
            </div>
            <UpDown v-model="state.match.away.corners" @update:model-value="save()" />
          </div>
          <div>
            <div class="num">
              <label for="date">Frispark:</label>
              <input type="number" v-model="state.match.away.fouls" @change="save()" />
            </div>
            <UpDown v-model="state.match.away.fouls" @update:model-value="save()"/>
          </div>
          <div>
            <div class="num">
              <label for="date">Straffer:</label>
              <input type="number" v-model="state.match.away.penalties" @change="save()" />
            </div>
            <UpDown v-model="state.match.away.penalties" @update:model-value="save()"/>
          </div>
          <div>
            <div class="num">
              <label for="date">Gule kort:</label>
              <input type="number" v-model="state.match.away.yellowCards" @change="save()" />
            </div>
            <UpDown v-model="state.match.away.yellowCards" @update:model-value="save()"/>
          </div>
          <div>
            <div class="num">
              <label for="date">Røde kort:</label>
              <input type="number" v-model="state.match.away.redCards" @change="save()" />
            </div>
            <UpDown v-model="state.match.away.redCards" @update:model-value="save()"/>
          </div>
        </div>
    </div>
    <label for="showShots">Vis skudd</label>
    <input type="checkbox" name="shotShots" v-model="state.match.showShots" @change="save()" />
    <label for="showCorners">Vis hjørnespark</label>
    <input type="checkbox" name="showCorners" v-model="state.match.showCorners" @change="save()" />
    <label for="showFouls">Vis frispark</label>
    <input type="checkbox" name="showFouls" v-model="state.match.showFouls" @change="save()" />
    <label for="showPenalties">Vis straffer</label>
    <input type="checkbox" name="showPenalties" v-model="state.match.showPenalties" @change="save()" />
    <label for="showYellowCards">Vis gule kort</label>
    <input type="checkbox" name="showYellowCards" v-model="state.match.showYellowCards" @change="save()" />
    <label for="showRedCards">Vis røde kort</label>
    <input type="checkbox" name="showRedCards" v-model="state.match.showRedCards" @change="save()" />

    <div class="buttonbar">
      <button @click="view">Vis</button>
    </div>
    <label for="notes">Notater (hvem scora osv.)</label>
    <textarea name="notes" v-model="state.match.notes" @change="save()"></textarea>

  </fieldset>
</template>
<style scoped>
button.small {
  width: auto;
  font-size: 100%;
  height: auto;
  padding: 0.5em;
}
div.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
}
div.num {
  display: flex;
  margin-top: 5px;
}
div.num label {
  width: 100%;
  color: #00b3ff;
}
div.num input {
  font-size: 130%;
  margin-left: 1em;
  pointer-events:none;
  border: 0;
  padding-right: 2em;
}

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
