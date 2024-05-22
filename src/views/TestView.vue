<script lang="ts" setup>
import { reactive } from 'vue';


const state = reactive({
  hold: false,
});

</script>

<template>


  <button @touchstart.prevent="state.hold = true" @touchend.prevent="state.hold = false">touchstart</button>
  <button @touchstart="state.hold = true" @touchend="state.hold = false">touchstart</button>

  <button @pointerdown.prevent="state.hold = true" @pointerup.prevent="state.hold = false">pointerdown</button>
  <button @pointerdown="state.hold = true" @pointerup="state.hold = false">pointerdown</button>


<div>
  {{ state.hold }}
</div>
</template>