<template>
  <div
    ref="day"
    class="day"
    @mouseover="() => (plusVisibility = 'visible')"
    @mouseleave="() => (plusVisibility = 'hidden')"
  >
    <div class="day__container">
      <div
        class="day__container--plus"
        @click="modalOpen"
        :style="{ visibility: plusVisibility }"
      >
        <svg viewBox="0 0 16 16" class="plus-svg">
          3
          <path
            d="M7.977 14.963c.407 0 .747-.324.747-.723V8.72h5.362c.399 0 .74-.34.74-.747a.746.746 0 00-.74-.738H8.724V1.706c0-.398-.34-.722-.747-.722a.732.732 0 00-.739.722v5.529h-5.37a.746.746 0 00-.74.738c0 .407.341.747.74.747h5.37v5.52c0 .399.332.723.739.723z"
          ></path>
        </svg>
      </div>
      <div class="day__container--num">{{ date.slice(8, 10) }}</div>
    </div>
    <task-card
      v-for="task in tasks"
      :key="task.id"
      @click.stop="modalOpenRedact(task.id)"
      class="task_card"
      id="task"
      :task="task"
      @click-on-checkbox="changeCheckbox(task.id)"
    ></task-card>
  </div>
</template>

<script setup lang="ts">
import taskCard from "@/components/TaskCard.vue";
import { ref } from "vue";

// eslint-disable-next-line no-undef
const emits = defineEmits([
  "open",
  "open-redact",
  "new-card",
  "change-checkbox",
]);

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
  date: {
    type: String,
    default: "",
  },
});

const modalOpenRedact = (id) => {
  emits("open");
  emits("open-redact", id);
};

const plusVisibility = ref("hidden");

const modalOpen = () => {
  emits("open");
  newCard();
};

const changeCheckbox = (id) => {
  emits("change-checkbox", id);
};

const newCard = () => {
  emits("new-card");
};
</script>

<style scoped lang="scss">
.plus-svg {
  width: 16px;
  height: 16px;
  display: inline-block;
  fill: rgba(55, 53, 47, 0.45);
}
.day {
  position: relative;
  width: 250px;
  height: 250px;
  flex: 1 0 0px;
  border-right: 1px solid rgb(233, 233, 231);
  border-bottom: 1px solid rgb(233, 233, 231);
  cursor: default;
  background: rgb(251, 251, 250);

  &__container {
    display: flex;
    justify-content: space-between;
    margin: 10px;

    &--plus {
      visibility: hidden;
      transition: background 20ms ease-in 0s;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border-radius: 3px;
      height: 25px;
      width: 25px;
      padding: 0px;
      background: rgb(241, 241, 238);
      box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px,
        rgb(15 15 15 / 10%) 0px 2px 4px;
      top: 6px;
      left: 6px;
    }
    &--num {
      font-size: 18px;
      top: 4px;
      right: 10px;
      height: 24px;
      line-height: 24px;
      text-align: right;
      transition: color 100ms ease-out 0s;
      color: rgba(55, 53, 47, 0.5);
    }
  }
}
</style>
