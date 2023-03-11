<template>
  <div
    ref="day"
    class="day"
    @drop="onDrop"
    @dragover.prevent
    @dragenter.prevent
    @mouseover="() => (plusVisibility = 'visible')"
    @mouseleave="() => (plusVisibility = 'hidden')"
  >
    <div class="day__container--num">{{ date.slice(8, 10) }}</div>
    <!--    <div class="card_adapt" v-for="task in tasks" :key="task.id" @click.stop="modalOpenRedact(task.id)"></div>-->
    <div class="day__container">
      <div class="day__container--plus" :style="{ visibility: plusVisibility }" @click="modalOpen">
        <svg viewBox="0 0 16 16" class="plus-svg">
          3
          <path
            d="M7.977 14.963c.407 0 .747-.324.747-.723V8.72h5.362c.399 0 .74-.34.74-.747a.746.746 0 00-.74-.738H8.724V1.706c0-.398-.34-.722-.747-.722a.732.732 0 00-.739.722v5.529h-5.37a.746.746 0 00-.74.738c0 .407.341.747.74.747h5.37v5.52c0 .399.332.723.739.723z"
          ></path>
        </svg>
      </div>
    </div>
    <task-card
      v-for="(task, index) in tasks"
      :key="task.id"
      :top="index * 200"
      class="task_card"
      :task="task"
      @click.stop="modalOpenRedact(task.id)"
      @click-on-checkbox="changeCheckbox(task.id)"
      @delete-todo="deleteTodo(task.id)"
    >
    </task-card>
  </div>
</template>
<script setup lang="ts">
import taskCard from '@/components/TaskCard.vue'
import { ref } from 'vue'

// eslint-disable-next-line no-undef
const emits = defineEmits([
  'open',
  'open-redact',
  'new-card',
  'change-checkbox',
  'delete-todo',
  'drag-task',
  'redact-task-date',
])

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
  date: {
    type: String,
    default: '',
  },
})

const day = ref(null)

const onDrop = (e) => {
  const taskId = parseInt(e.dataTransfer.getData('taskId'))
  if (!taskId) return

  emits('redact-task-date', taskId, props.date)
}

const modalOpenRedact = (id) => {
  emits('open')
  emits('open-redact', id)
}

const deleteTodo = (id) => {
  emits('delete-todo', id)
}

const plusVisibility = ref('hidden')

const modalOpen = () => {
  emits('open')
  newCard()
}

// const onDrop = (taskId, startDate) => {};

const changeCheckbox = (id) => {
  emits('change-checkbox', id)
}

const newCard = () => {
  emits('new-card')
}
</script>

<style scoped lang="scss">
.card_adapt__container {
  display: none;
}

.card_adapt {
  display: none;
}

.plus-svg {
  width: 16px;
  height: 16px;
  display: inline-block;
  fill: rgba(55, 53, 47, 0.45);
}

.day {
  min-height: 250px;
  flex: 1 0 0px;
  position: relative;
  border-right: 1px solid rgb(233, 233, 231);
  border-bottom: 1px solid rgb(233, 233, 231);
  cursor: default;
  background: rgb(251, 251, 250);

  &__contaianer {
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
      box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 2px 4px;
      top: 6px;
      left: 6px;
    }
    &--num {
      margin-top: 10px;
      margin-right: 10px;
      font-size: 18px;
      height: 24px;
      line-height: 24px;
      text-align: right;
      transition: color 100ms ease-out 0s;
      color: rgba(55, 53, 47, 0.5);
    }
  }
}

@media screen and (max-width: 1440px) {
  .content {
    margin-left: 50px;
    margin-right: 50px;
  }
  .day {
    position: relative;
    min-height: 200px;
    flex: 1 0 0px;
    border-right: 1px solid rgb(233, 233, 231);
    border-bottom: 1px solid rgb(233, 233, 231);
    cursor: default;
    background: rgb(251, 251, 250);
  }
}
@media screen and (max-width: 1080px) {
  .content {
    margin-left: 35px;
    margin-right: 35px;
  }
  .day {
    min-height: 100px;
    flex: 1 0 0px;
    border-right: 1px solid rgb(233, 233, 231);
    border-bottom: 1px solid rgb(233, 233, 231);
    cursor: default;
    background: rgb(251, 251, 250);
  }
}
@media screen and (max-width: 480px) {
  .content {
    margin-left: 15px;
    margin-right: 15px;
  }
  .day {
    min-height: 50px;
    flex: 1 0 0px;
    border-right: 1px solid rgb(233, 233, 231);
    border-bottom: 1px solid rgb(233, 233, 231);
    cursor: default;
    background: rgb(251, 251, 250);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
  }
  .day__container--num {
    font-size: 10px;
    margin: 0;
    padding: 0;
  }
  .card_adapt {
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 14px;
    background-color: #707070;
    position: absolute;
  }
  .day__container--plus {
    display: none;
  }
}
</style>
