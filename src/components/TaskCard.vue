<template>
  <div class="card">
    <div class="card_container">
      <div class="card-content">
        <div class="card-content__name">{{ task.title }}</div>
        <div class="card-content__container">
          <div class="card-content__container--status">
            <div class="status">asd</div>
          </div>
          <div class="card-content__container--checkbox">
            <app-checkbox label="готово" :checked="true" />
          </div>
          <div class="card-content__container--priority" v-if="true">
            <div class="priority">asd</div>
          </div>
          <div class="card-content__container--type" v-if="true">
            <div class="type">asd</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.card {
  position: absolute;
  padding: 3px 6px;
  width: 100%;
  height: 200px;
  top: 50px;
}
.card_container:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}

.card_container {
  display: block;
  color: inherit;
  text-decoration: none;
  height: 100%;
  background: white;
  border-radius: 3px;
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 2px 4px;
}
.card-content {
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  width: 100%;
  position: relative;
  padding-top: 2px;
  padding-bottom: 2px;
  height: 100%;
  align-items: flex-start;

  &__name {
    padding-left: 6px;
    padding-right: 6px;
    overflow: hidden;
    width: 42%;
    flex-grow: 1;
    font-size: 16px;
    font-weight: 600;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  &__container {
    padding-left: 6px;
    padding-right: 6px;
    overflow: hidden;
    width: 100%;

    &--status {
      display: flex;
      align-items: center;
      font-size: 12px;
      height: 20px;
      white-space: nowrap;
      padding: 6px;
      .status {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        min-width: 0px;
        height: 14px;
        border-radius: 3px;
        padding: 6px;
        font-size: 12px;
        line-height: 120%;
        color: rgb(76, 35, 55);
        background: rgb(245, 224, 233);
        margin: 0px 4px 0px 0px;
      }
    }
    &--checkbox {
      display: flex;
      align-items: center;
      font-size: 12px;
      height: 20px;
      white-space: nowrap;
      margin: 6px;
    }
    &--priority {
      display: flex;
      align-items: center;
      font-size: 12px;
      height: 20px;
      white-space: nowrap;
      padding: 6px;

      .priority {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        min-width: 0px;
        height: 14px;
        border-radius: 3px;
        padding: 6px;
        font-size: 12px;
        line-height: 120%;
        color: rgb(28, 56, 41);
        background: rgb(219, 237, 219);
        margin: 0px 4px 0px 0px;
      }
    }
    &--type {
      display: flex;
      align-items: center;
      font-size: 12px;
      height: 20px;
      white-space: nowrap;
      padding: 6px;

      .type {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        min-width: 0px;
        height: 14px;
        border-radius: 3px;
        padding: 6px;
        font-size: 12px;
        line-height: 120%;
        color: rgb(93, 23, 21);
        background: rgb(255, 226, 221);
        margin: 0px 4px 0px 0px;
      }
    }
  }
}
</style>
