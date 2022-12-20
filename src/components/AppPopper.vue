<template>
  <div class="popper" v-show="showPopper">
    <slot />
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  showPopper: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.popper {
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background: white;
  max-width: calc(100vw - 24px);
  box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
}
</style>
