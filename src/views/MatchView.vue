<script setup lang="ts">
import { getMatch } from '@/store'
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import DateView from '@/components/DateView.vue'
import { toPng} from 'html-to-image'

const route = useRoute()

const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const state = reactive({
  match: getMatch(id),
  data: '',
});

document.body.scrollTo(0,0);

function download() {
  state.data ='';
  const img = new Image();
  console.log("Loading image...");
  img.onload = () => {
    document.body.scrollTo(0,0);
    setTimeout(() => {
      document.body.scrollTo(0,0);
      const node = document.querySelector('div.match') as HTMLElement
      toPng(node).then(function (dataUrl: string) {
        
        //if (!blob) return alert("error");
        //saveAs(blob, 'match.png')
        if (dataUrl.length < 500000) return setTimeout(() => download(), 500);
        state.data = dataUrl;
      }).catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
    }, 500);
  }
  img.src = "grass.png";
}
download();
</script>
<template>
  <main>
    <div v-if="state.data ==''" class="loader">Forbereder... Vennligst vent</div>
    <div v-if="state.data != ''">
      <!--p>Hvis backgrunnsbildet mangler, trykk her: <button :style="{height: '2em'}" @click="download()">Prøv igjen</button>
      </p-->
      <p>For å laste ned på iphone, trykk på bildet og hold inne til menyen kommer opp.
      </p>
      <!--p>{{ state.data.length }}</p-->
      <img :src="state.data" />
    </div>
  <div class="match" v-if="state.data == ''">
    <table>
      <tr class="date">
        <td colspan="5"><DateView :time="state.match.time" /><br>{{ state.match.arena }}</td>
      </tr>
      <tr class="teams">
        <td>{{ state.match.home.team }}</td>
        <td>{{ state.match.home.score }}</td>
        <td>-</td>
        <td>{{ state.match.away.score }}</td>
        <td>{{ state.match.away.team }}</td>
      </tr>
      <tr v-if="state.match.showShots" class="stat">
        <td>{{ state.match.home.shots }}</td>
        <td colspan="3">Skudd</td>
        <td>{{ state.match.away.shots }}</td>
      </tr>

      <tr v-if="state.match.showCorners" class="stat">
        <td>{{ state.match.home.corners }}</td>
        <td colspan="3">Hjørnespark</td>
        <td>{{ state.match.away.corners }}</td>
      </tr>
      <tr v-if="state.match.showFouls" class="stat">
        <td>{{ state.match.home.fouls }}</td>
        <td colspan="3">Frispark</td>
        <td>{{ state.match.away.fouls }}</td>
      </tr>
      <tr v-if="state.match.showPenalties" class="stat">
        <td>{{ state.match.home.penalties }}</td>
        <td colspan="3">Straffe</td>
        <td>{{ state.match.away.penalties }}</td>
      </tr>
      <tr v-if="state.match.showYellowCards" class="stat">
        <td>{{ state.match.home.yellowCards }}</td>
        <td colspan="3">Gule kort</td>
        <td>{{ state.match.away.yellowCards }}</td>
      </tr>
      <tr v-if="state.match.showRedCards" class="stat">
        <td>{{ state.match.home.redCards }}</td>
        <td colspan="3">Røde kort</td>
        <td>{{ state.match.away.redCards }}</td>
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

  width: 720px;
  height: 1280px;
  background: #000;
  padding: 1em;
  background: url('/grass.png');;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  font-size: 30px;

}
table {
  width: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
  border-collapse: collapse;
}

tr:nth-child(3) td {
  padding-top: 1em;
}

tr.teams {
  font-size: 130%;
  font-weight: bolder;
  height: 1.5em;
}
tr.teams td {
  border-bottom: 2px solid #fff;
  padding-bottom: 0.5em;
}
tr.teams :nth-child(2),
tr.teams :nth-child(4) {
  width: 2em;
}
tr.teams > td:first-child {
  border-left: 0.5em solid transparent;
}
tr.teams > td:last-child {
  border-right: 0.5em solid transparent;
}
td:nth-child(1),
td:nth-child(2) {
  text-align: right;
}
td:nth-child(3) {
  width: 1em;
  text-align: center;
}
tr.date td {
  text-align: center;
  height: 5em;
  padding-top: 3em;
  padding-bottom: 2em;
}

td:nth-child(1),
td:nth-child(5) {
  width: 35%;
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
.loader {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 2em;
}
img {
  width: 100%;
}
</style>
