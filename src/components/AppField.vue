<template>
  <div
    @drop="onDrop"
    @dragover.prevent
    @dragenter.prevent
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
      @mouseover="Resizable($event.target)"
      v-for="task in tasks"
      :key="task.id"
      @click.stop="modalOpenRedact(task.id)"
      class="task_card"
      id="task"
      :task="task"
      @click-on-checkbox="changeCheckbox(task.id)"
      @delete-todo="deleteTodo(task.id)"
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
  "delete-todo",
  "drag-task",
  "redact-task-date",
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

function direction(elem, event, maxPad) {
  let res = 8;
  const pad = maxPad || 4;
  const pos = elem.getBoundingClientRect();
  const top = pos.top;
  const left = pos.left;
  const width = elem.clientWidth;
  const height = elem.clientHeight;
  const eTop = event.clientY;
  const eLeft = event.clientX;
  const isTop = eTop - top < pad;
  const isRight = left + width - eLeft < pad;
  const isBottom = top + height - eTop < pad;
  const isLeft = eLeft - left < pad;
  if (isTop) res = 0;
  if (isRight) res = 1;
  if (isBottom) res = 2;
  if (isLeft) res = 3;

  return res;
}
const cursors = "n w s e ne se sw nw".split(" ");

function Resizable(elem, options) {
  options = options || {};
  options.max = options.max || [1000, 1000];
  options.min = options.min || [10, 10];
  options.allow = (options.allow || "11111111").split("");

  elem.addEventListener("mousemove", function (e) {
    let dir = direction(this, e);
    if (options.allow[dir] === "0") return;
    this.style.cursor = dir === 8 ? "default" : cursors[dir] + "-resize";
  });

  elem.addEventListener("mousedown", resizeStart);
  document.body.onselectstart = function () {
    return false;
  };

  elem.min = options.min;
  elem.max = options.max;
  elem.allow = options.allow;
  elem.pos = elem.getBoundingClientRect();

  function resizeStart(ev) {
    const dir = direction(this, ev);
    if (this.allow[dir] == "0") return;
    document.documentElement.style.cursor = this.style.cursor =
      cursors[dir] + "-resize";
    const pos = this.getBoundingClientRect();
    const elem = this;
    const height = this.clientHeight;
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", resize);
      document.documentElement.style.cursor = elem.style.cursor = "default";
      document.body.onselectstart = null;
    });

    function resize(e) {
      if (dir === 0) {
        elem.style.top = e.clientY - ev.clientY + pos.top;
        elem.style.height = height + ev.clientY - e.clientY;
      }
      if (dir === 1) {
        elem.style.width = elem.style.width + "500px";
      }
      if (dir === 3) {
        elem.style.width = elem.style.width + "500px";
      }
    }
  }
}

const onDrop = (e) => {
  const taskId = parseInt(e.dataTransfer.getData("taskId"));
  emits("redact-task-date", taskId, props.date);
};

const modalOpenRedact = (id) => {
  emits("open");
  emits("open-redact", id);
};

const deleteTodo = (id) => {
  emits("delete-todo", id);
};

const plusVisibility = ref("hidden");

const modalOpen = () => {
  emits("open");
  newCard();
};

// const onDrop = (taskId, startDate) => {};

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
  width: 250px;
  min-height: 250px;
  flex: 1 0 0px;
  border-right: 1px solid rgb(233, 233, 231);
  border-bottom: 1px solid rgb(233, 233, 231);
  cursor: default;
  background: rgb(251, 251, 250);

  &__container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
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
