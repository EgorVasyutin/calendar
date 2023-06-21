<template>
  <div
    ref="card"
    class="card"
    :style="{ top: top + 45 + 'px', width: cardWidth, left: left + 'px' }"
    @click.right.prevent="openAndClosePopper"
  >
    <div ref="resizer_left" class="resizer_left" draggable="true" @drag="onResizeLeftStart" @dragend="onMouseUp"></div>
    <div class="card_container">
      <div class="card-content" draggable="true" @dragenter.prevent @dragover.prevent @dragstart="onDragStart">
        <div class="card-content__name">{{ task.title }}</div>
        <div class="card-content__container">
          <div class="card-content__container--checkbox">
            <input type="checkbox" class="checkbox" :checked="task.isDone" @click.stop="clickOnCheckbox()" />
          </div>
          <div v-if="task.status" class="card-content__container--status">
            <div class="status">{{ task.status }}</div>
          </div>
          <div v-if="task.priority" class="card-content__container--priority">
            <div class="priority">{{ task.priority }}</div>
          </div>
          <div v-if="task.type" class="card-content__container--type">
            <div class="type">{{ task.type }}</div>
          </div>
        </div>
      </div>
    </div>
    <app-popper class="popper" :show-popper="showPopper" @close="openAndClosePopper" @click.stop
      ><slot>
        <button class="popper__btm" @click="deleteTodo">Delete</button>
        <button class="popper__btm">Copy</button></slot
      ></app-popper
    >
    <div
      ref="resizer_right"
      class="resizer_right"
      draggable="true"
      @dragend="onMouseUp"
      @drag="onResizeRightStart"
    ></div>
  </div>
</template>

<script setup lang="ts">
import AppPopper from '@/UI/AppPopper.vue'
import { onMounted, ref } from 'vue'
import useTasks from '@/composables/useTasks'
// eslint-disable-next-line no-undef,no-unused-vars
const emit = defineEmits(['clickOnCheckbox', 'delete-todo', 'drop-task'])
//<!--    @mouseover="Resizable($event.target)"-->
// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  top: {
    type: Number,
    required: true,
  },
})
console.log(props.task)

const { patch } = useTasks()

const initialCardWidth = ref(0)
const cardWidth = ref('260px')

const left = ref(0)

const card = ref(null)
const resizer_right = ref(null)

const datsCard = ref({ startDate: props.task.startDate, endDate: props.task.endDate })

const widthCheck = () => {
  const endDate = new Date(props.task.endDate).getDate()
  const startDate = new Date(props.task.startDate).getDate()
  console.log(endDate - startDate)
  if (endDate - startDate <= 0) {
    return
  }
  cardWidth.value = (endDate - startDate + 1) * 260 + 'px'
}
widthCheck()

const onResizeRightStart = (e) => {
  const resizerRect = e.target.getBoundingClientRect()
  const resizerEdgeX = resizerRect.x + resizerRect.width
  console.log(resizerRect.x, resizerRect.width)
  const mouseX = e.clientX
  const endDate = new Date(datsCard.value.endDate)
  if (resizerEdgeX < mouseX) {
    endDate.setDate(endDate.getDate() + 1)
    datsCard.value.endDate = endDate.toISOString()
    const prevW = parseInt(cardWidth.value, 10)
    cardWidth.value = prevW + initialCardWidth.value + 'px'
  }
  if (resizerEdgeX - 260 > mouseX) {
    endDate.setDate(endDate.getDate() - 1)
    datsCard.value.endDate = endDate.toISOString()
    const prevW = parseInt(cardWidth.value, 10)
    cardWidth.value = prevW - 260 + 'px'
    console.log('123', prevW, cardWidth.value)
  }
}

const onResizeLeftStart = (e) => {
  console.log(e)
  const resizerRect = e.target.getBoundingClientRect()
  const resizerEdgeX = resizerRect.x - resizerRect.width
  const mouseX = e.clientX
  const startDate = new Date(datsCard.value.startDate)
  if (resizerEdgeX > mouseX) {
    startDate.setDate(startDate.getDate() - 1)
    datsCard.value.startDate = startDate.toISOString()
    left.value = left.value - 260
    const prevW = parseInt(cardWidth.value, 10)
    cardWidth.value = prevW + initialCardWidth.value + 'px'
  }
  if (cardWidth.value === '260px') return
  if (resizerEdgeX + 260 < mouseX) {
    startDate.setDate(startDate.getDate() + 1)
    datsCard.value.startDate = startDate.toISOString()
    left.value = left.value + 260
    const prevW = parseInt(cardWidth.value, 10)
    cardWidth.value = prevW - 260 + 'px'
  }
}

const onMouseUp = () => {
  patch(props.task.id, { startDate: datsCard.value.startDate })
  patch(props.task.id, { endDate: datsCard.value.endDate })
}

onMounted(() => {
  cardWidth.value = card.value.offsetWidth
  initialCardWidth.value = card.value.offsetWidth
})

const showPopper = ref(false)

const openAndClosePopper = () => {
  showPopper.value = !showPopper.value
}

const onDragStart = (e) => {
  e.dataTransfer.dropEffect = 'move'
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('taskId', props.task.id)
  e.dataTransfer.setData('taskWidth', cardWidth.value)
}

const deleteTodo = () => {
  emit('delete-todo')
}

const clickOnCheckbox = () => {
  emit('clickOnCheckbox')
}
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

.resizer_left {
  background-color: #fff;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  width: 5px;
  cursor: col-resize;
  user-select: none;
}

.resizer_right {
  background-color: #fff;
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  width: 5px;
  cursor: col-resize;
  user-select: none;
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
  position: absolute;
  left: 1px;
  right: 0;
  padding: 3px 6px;
  height: 200px;
  width: 250px;
  z-index: 99;
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
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 2px 4px;
}
.card-content {
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  position: relative;
  padding-top: 2px;
  padding-bottom: 2px;
  height: 100%;
  margin: 0px;
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
      margin-top: 5px;
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

@media only screen and (max-width: 1440px) {
  .card {
    height: 175px;
  }
}

@media only screen and (max-width: 1080px) {
  .card {
    height: 100px;
  }
}

@media only screen and (max-width: 480px) {
  .card {
    display: none;
  }
}
</style>
