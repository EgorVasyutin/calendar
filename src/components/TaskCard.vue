<template>
  <div
    class="card"
    draggable="true"
    @dragstart="onDragStart"
    @click.right.prevent="openAndClosePopper"
    @dragenter.prevent
    @dragover.prevent
  >
    <div class="card_container">
      <div class="card-content">
        <div class="card-content__name">{{ task.title }}</div>
        <div class="card-content__container">
          <div class="card-content__container--status">
            <div class="status">asd</div>
          </div>
          <div class="card-content__container--checkbox">
            <input
              type="checkbox"
              class="checkbox"
              :checked="task.isDone"
              @click.stop="clickOnCheckbox()"
            />
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
    <app-popper
      class="popper"
      :showPopper="showPopper"
      @close="openAndClosePopper"
      @click.stop
      ><slot>
        <button class="popper__btm" @click="deleteTodo">Delete</button>
        <button class="popper__btm">Copy</button></slot
      ></app-popper
    >
  </div>
</template>

<script setup lang="ts">
import AppPopper from "@/components/AppPopper.vue";
import { ref } from "vue";
// eslint-disable-next-line no-undef,no-unused-vars
const emit = defineEmits(["clickOnCheckbox", "delete-todo", "drop-task"]);

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const showPopper = ref(false);

const openAndClosePopper = () => {
  showPopper.value = !showPopper.value;
};

const onDragStart = (e) => {
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("taskId", props.task.id);
};

const deleteTodo = () => {
  emit("delete-todo");
};

const clickOnCheckbox = () => {
  emit("clickOnCheckbox");
};
</script>

<style scoped lang="scss">
.popper__btm {
  width: 240px;
  height: 35px;
  background-color: #fff;
  border: none;
  font-size: 16px;
}
.popper__btm:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}

.popper {
  top: 90px;
  left: 110px;
}
.btm__delete {
  margin-left: 150px;
  margin-top: 50px;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid black;
}

.btm__delete:hover {
  box-shadow: 0px 0px 2px black;
  transition: 0.1s;
}

.card {
  position: relative;
  padding: 3px 6px;
  width: 100%;
  height: 200px;
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
