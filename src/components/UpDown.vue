<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps<{
  modelValue: number | undefined
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

watch(() => props.modelValue, (value) => {
  if (value) state.value = value;
});

const state = reactive({
  value: props.modelValue ?? 0
})
function inc() {
  state.value++
  emit('update:modelValue', state.value)
}
function dec() {
  state.value--
  if (state.value < 0) state.value = 0
  emit('update:modelValue', state.value)
}
</script>
<template>
  <div>
    <button class="score" @click="dec()">-</button>
    <button class="score" @click="inc()">+</button>
  </div>
</template>
<style scoped>
input {
}
button.score {
  width: 20vw;
  height: 10vw;
}
</style>
