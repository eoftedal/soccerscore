<script setup lang="ts">
import { getIndex, getMatch, saveMatch } from "@/store";
import { computed, reactive, ref } from "vue";
import { saveBlob } from "./viewUtils";
import type { Match } from "@/types";
import DateView from "@/components/DateView.vue";

const state = reactive({
  matches: [] as Match[],
  selected: new Map<string, Match>(),
});

const index = getIndex()


for (const id of index) {
  try {
    const match = getMatch(id)
    state.matches.push(match)
  } catch (e) {
    console.error(e)
  }
}

function toggleSelected(match: Match) {
  if (state.selected.has(match.id)) {
    state.selected.delete(match.id);
  } else {
    state.selected.set(match.id, match);
  }
}

function download() {
  const data = JSON.stringify(Array.from(state.selected.values()));
  const file = new Blob([data], { type: "application/json" });
  saveBlob(file, "data.json");
}
function selectAll() {
  for (const m of state.matches) {
    state.selected.set(m.id, m);
  }
}
const file = ref<File | null>(null);
const importMatches = ref<Match[]>([]);

const handleFileUpload = (event: Event) => {
  importMatches.value = [];
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const selectedFile = target.files[0];
    file.value = selectedFile;
    readJsonFile(selectedFile);
  }
};
const readJsonFile = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      importMatches.value = JSON.parse(e.target?.result as string);
    } catch (error) {
      alert("Error parsing match data");
    }
  };
  reader.readAsText(file);
};

function saveImportMatches() {
  for (const m of importMatches.value) {
    saveMatch(m);
  }
  importMatches.value = [];
}
</script>

<template>
  <main>
    <h2>Import matches</h2>
    <div>
      <input type="file" @change="handleFileUpload" accept="application/json" />
      <ul v-if="importMatches.length > 0">
        <li v-for="m in importMatches" v-bind:key="m.id">
          <DateView :time="m.time" /> - {{ m.home.team }} - {{ m.away.team }}
           {{ m.home.score }} - {{ m.away.score }}
        </li>
      </ul>
      <button v-if="importMatches.length > 0" @click="saveImportMatches()">Import</button>
    </div>
    <h2>Export matches</h2>
    <ul class="export">
      <li v-for="m in state.matches" v-bind:key="m.id">
        <input type="checkbox" @change="toggleSelected(m)" :checked="state.selected.has(m.id)" />
        <DateView :time="m.time" /> - {{ m.home.team }} - {{ m.away.team }}
        {{ m.home.score }} - {{ m.away.score }}
      </li>
    </ul>
    <button @click="selectAll()">Select all</button>
    <button @click="download()">Download</button>
  </main>
</template>
<style scoped>
main {
  margin: 2em;
}
ul.export {
  list-style-type: none;
  margin-left: 0;
  padding-left: 0;
}
ul.export input[type="checkbox"] {
  margin-right: 0.5em;
}
button {
  width: auto;
}
h2 {
  margin-top: 1em;
}
</style>
