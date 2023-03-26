<template>
  <div class="content">
    <div class="content-menu__fn">
      <div class="content-menu__fn__container">
        <div class="content-menu__fn__container--field search"></div>
        <div class="new" @click="modalOpen">New</div>
      </div>
    </div>
    <div class="data-switch__container">
      <div class="data__container">
        <div class="calendar-data">Сентябрь 2022</div>
      </div>
      <div class="month-switch">
        <div class="month-switch__arrow-left">
          <img src="../assets/img/arrow-left.svg" class="month-switch__arrow-left--svg" @click="scrollMonthAgo" />
        </div>
        <div class="month-switch__text" @click="scrollToday">Сегодня</div>
        <div class="month-switch__arrow-right" @click="scrollMonthBefore">
          <img src="../assets/img/arrow-right.svg" class="month-switch__arrow-left--svg" />
        </div>
      </div>
    </div>
    <div class="calendar">
      <div class="calendar__container">
        <div class="calendar__container__days">
          <div class="mouth_sun mouth">Вос</div>
          <div class="mouth">Пон</div>
          <div class="mouth">Вт</div>
          <div class="mouth">Сред</div>
          <div class="mouth">Чет</div>
          <div class="mouth">Пят</div>
          <div class="mouth_sat mouth">Суб</div>
          <app-field
            v-for="(fieldLine, idx) in dats.length"
            :key="fieldLine"
            :date="dats[idx]"
            :mouse-field-date="mouseFieldDate"
            :tasks="getFieldTasks(dats[idx].slice(0, 11))"
            @open="modalOpen"
            @new-card="createCard"
            @open-redact="modalOpenRedact"
            @change-checkbox="changeCheckbox"
            @delete-todo="deleteTask"
            @redact-task-date="changeTaskStartDate"
            @mouseenter="setMouseFieldDate(dats[idx])"
          />
        </div>
      </div>
    </div>
  </div>
  <modal-window :modal-open="modalValue" @modal-close="modalClose" @on-copy="onCopy" @delete-todo-modal="deleteTask">
    <task-form
      :created="false"
      :task-id="idTodo"
      :is-done-props="task.isDone"
      @clickOnCheckbox="clickOnCheckbox(idTodo)"
      @update-task="updateTask"
    />
  </modal-window>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import AppField from '@/components/AppField.vue'
import useTasks from '@/composables/useTasks'
import '@vuepic/vue-datepicker/dist/main.css'

import modalWindow from '@/UI/ModalWindow.vue'
import { Task } from '@/types'

import TaskForm from '@/components/TaskForm.vue'
import useMouseField from '@/composables/useMouseField'

const { tasks, getCards, deleteTodo, patch, getOneCard, newCard } = useTasks()

const { mouseFieldDate, setMouseFieldDate } = useMouseField()

const idTodo = ref('')

const task = ref({
  title: '',
  isDone: false,
  type: '',
  status: '',
  priority: '',
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
})

const dats = ref([])
const fullDates = ref<string[]>([])

let modalValue = ref(false)

const renderingCards = (): void => {
  for (let i = -14; i < 14; i++) {
    const date = new Date()

    date.setDate(date.getDate() + i)
    dats.value.push(date.toISOString())
    fullDates.value.push(date.toISOString())
  }
}
renderingCards()

getCards()

const clickOnCheckbox = async (id) => {
  await tasks.value.forEach((Task) => {
    if (Task.id === id) task.value.isDone = !Task.isDone
  })
}

// const createCard = false;

const createCard = () => {
  //без watch-а
  watch(modalValue, async () => {
    await newCard(task.value).then(await getCards)
  })
}

const modalOpenRedact = (id) => {
  idTodo.value = id
}

const changeTaskStartDate = (id, date, width) => {
  const del = ref(parseInt(width, 10) / 260)
  if (del.value === 1) del.value = 0
  console.log(del, 'del')
  const date2 = new Date(date)
  date2.setDate(date2.getDate() + del.value)
  patch(id, { startDate: date })
  patch(id, { endDate: date2.toISOString() }).then(getCards)
}

const changeCheckbox = async (id) => {
  await clickOnCheckbox(id)
  patch(id, { isDone: task.value.isDone }).then(await getCards)
}

const onCopy = async () => {
  const copyTask = await getOneCard(idTodo.value)
  console.log(copyTask)
  newCard(copyTask).then(await getCards)
}

const updateTask = async () => {
  await getCards()
}

const scrollMonthAgo = () => {
  let date = new Date(dats.value[dats.value.length - 1])
  console.log(date)
  date.setDate(date.getMonth() + 1)
  for (let i = 0; i < 31; i++) {
    date.setDate(date.getDate() - 1)
    dats.value.unshift(date.toISOString())
    if (new Date(date.getDate() - 1).toISOString().slice(8, 11) === dats.value[dats.value.length - 1].slice(8, 11)) {
      return
    }
  }

  scrollUp()
}

window.addEventListener('scroll', () => {
  const height = document.body.offsetHeight
  const screenHeight = window.innerHeight
  const scrolled = window.scrollY
  const threshold = height - (screenHeight - 300)
  const position = scrolled + screenHeight

  if (position >= threshold) {
    addMonthBefore()
  }
})

const scrollUp = () => {
  window.scroll({
    left: 0,
    top: 0,
    behavior: 'smooth',
  })
}

const scrollToday = () => {
  window.scroll({
    left: 0,
    top: (14 * 250) / 7 + 250,
    behavior: 'smooth',
  })
}

const scrollDown = () => {
  window.scroll({
    left: 0,
    top: (dats.value.length * 250) / 7 + 250,
    behavior: 'smooth',
  })
}

const addMonthBefore = () => {
  let date = new Date(dats.value[dats.value.length - 1])
  console.log(date)
  date.setDate(date.getMonth() + 1)
  for (let i = 0; i < 31; i++) {
    date.setDate(date.getDate() + 1)
    dats.value.push(date.toISOString())
    if (new Date(date.getDate() - 1).toISOString() === dats.value[dats.value.length - 1]) {
      return
    }
  }
}

const scrollMonthBefore = () => {
  addMonthBefore()
  setTimeout(() => scrollDown(), 50)
}

const getFieldTasks = (date: string): Task[] => {
  return tasks.value.filter((task) => task.startDate.slice(0, 11) === date)
}

const deleteTask = () => {
  deleteTodo(idTodo.value).then(getCards)
}

const modalClose = () => {
  modalValue.value = false
}
const modalOpen = () => {
  modalValue.value = true
}
</script>

<style lang="scss">
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
}
.div {
  width: 100%;
  height: 1px;
  background: rgba(55, 53, 47, 0.09);
  margin-bottom: 8px;
}
.collectionSearch {
  margin-top: 0px;
  width: 16px;
  display: block;
  fill: rgba(55, 53, 47, 0.65);
  flex-shrink: 0;
  backface-visibility: hidden;
}
.dots {
  margin-top: 2px;
  height: 5px;
  display: block;
  fill: rgba(55, 53, 47, 0.65);
  flex-shrink: 0;
  backface-visibility: hidden;
}
.chevronDown {
  width: 20px;
  height: 100%;
  display: block;
  fill: white;
  flex-shrink: 0;
  backface-visibility: hidden;
  margin-top: 2px;
}
.month-switch__arrow-left--svg {
  width: 20px;
  height: 20px;
  display: block;
  fill: rgba(55, 53, 47, 0.45);
  flex-shrink: 0;
  backface-visibility: hidden;
}
.content {
  margin-left: 100px;
  margin-right: 100px;

  &-menu__fn {
    box-shadow: rgb(233 233 231) 0px -1px 0px inset;
    display: flex;
    justify-content: end;

    &__container {
      display: flex;
      gap: 5px;
      align-items: center;

      &--field {
        padding: 5px 5px 5px 5px;
        color: #a2a2a2;
        font-size: 18px;
        margin-bottom: 7px;
        border-radius: 5px;
      }
    }
  }
}
.filter:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}
.search:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}
.sort {
  color: rgb(35, 131, 226);
}
.sort:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}
.data:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}
.new {
  border-radius: 3px;
  color: white;
  background-color: rgb(35, 131, 226);
  width: 60px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 7px;
  margin-right: 0px;
  margin-left: 5px;
}
.new:hover {
  background-color: #6982f5;
  transition: 0.1s;
}
.new__arrow {
  color: white;
  background-color: rgb(35, 131, 226);
  width: 30px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 7px;
  margin-left: 0px;
  border-radius: 3px;
}
.new__arrow:hover {
  background-color: #6982f5;
  transition: 0.1s;
}

.calendar-data {
  font-weight: 600;
  margin-left: 8px;
  margin-right: 8px;
  line-height: 1;
  font-size: 18px;
  margin-top: 15px;
}
.data__container {
  display: flex;
  justify-content: flex-start;
}
.data-switch__container {
  display: flex;
  justify-content: space-between;

  .month-switch {
    display: flex;
    justify-content: space-between;

    &__text {
      font-size: 20px;
      margin-top: 13px;
      width: 70px;
      height: 30px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #a2a2a2;
    }
    &__text:hover {
      background-color: #eeeeee;
      transition: 0.1s;
    }
    &__arrow-left:hover {
      background-color: #eeeeee;
      transition: 0.1s;
    }
    &__arrow-right:hover {
      background-color: #eeeeee;
      transition: 0.1s;
    }
    &__arrow-left {
      align-items: center;
      display: flex;
      justify-content: center;
      width: 30px;
      height: 30px;
      margin-top: 13px;
      border-radius: 5px;
    }
    &__arrow-right {
      align-items: center;
      display: flex;
      justify-content: center;
      width: 30px;
      height: 30px;
      margin-top: 13px;
      border-radius: 5px;
    }
  }
}
.calendar {
  display: flex;
  flex-direction: column;
  margin-top: 25px;

  .mouth {
    color: rgba(55, 53, 47, 0.5);
    box-shadow: rgb(233 233 231) 0px -1px 0px inset;
  }
  &__container {
    align-items: center;
    display: flex;
    flex-direction: column;

    &__days {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-column: 7;
      grid-row: auto;
      box-shadow: rgb(233 233 231) -1px 16px 0px;
      margin-top: 1px;
      overflow: hidden;
    }
  }
}
.modal-content {
  &__title {
    margin-bottom: 15px;
    color: black;
    max-width: 100%;
    width: 75%;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    margin-left: 130px;
    margin-top: 50px;
  }
  &__input {
    max-width: 100%;
    width: 100%;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    padding: 3px 2px;
    color: black;
    height: 50px;
    font-size: 40px;
    font-weight: 700;
    border: none;
    outline: none;
  }
  &__input::placeholder {
    font-size: 40px;
    font-weight: 700;
    color: #d7d7d7;
  }
  &__table {
    margin-top: 5px;
    padding-left: calc(126px + env(safe-area-inset-left));
    padding-right: calc(126px + env(safe-area-inset-right));
    max-width: 100%;
    width: 100%;

    .add-property {
      margin-top: 15px;
      margin-bottom: 10px;
      width: 175px;
    }

    &--string {
      display: flex;
      padding-bottom: 4px;
      width: 100%;

      .string-left {
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0px 6px;
        height: 40px;
        width: 215px;
        margin-right: 10px;
        border-radius: 5px;
      }
      .string-left:hover {
        background-color: #eeeeee;
        transition: 0.1s;
      }
      .string-right {
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        display: flex;
        align-items: center;
        border-radius: 5px;
        width: 100%;
        padding: 6px 8px 5px;
        font-size: 14px;
        overflow: hidden;
        height: 40px;
      }
      .string-right:hover {
        background-color: #eeeeee;
        transition: 0.1s;
      }

      .string-text {
        position: relative;
        color: #a2a2a2;
        font-size: 18px;
        padding-left: 8px;
      }
      .string-text-2 {
        color: black;
        font-size: 18px;
        padding-left: 8px;
      }
    }
  }
}

.arrows:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}

.comments__div {
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;

  .comments__input {
    border-radius: 5px;
    width: 100%;
    border: none;
    outline: none;
    height: 40px;
    margin-bottom: 15px;
    color: black;
    font-size: 18px;
    padding-left: 8px;
  }
  .comments__input::placeholder {
    color: #a2a2a2;
    font-size: 18px;
    padding-left: 8px;
  }
  .comments__input:hover {
    background-color: #eeeeee;
    transition: 0.2s;
  }
}

.container--data {
  width: 100%;
  padding: 6px 8px 5px;

  .startData {
    width: 100%;
    overflow: hidden;
    border: none;
    outline: none;
    border-radius: 3px;
  }

  .endData {
    overflow: hidden;
    border: none;
    outline: none;
    border-radius: 3px;
  }
}

.typesDate {
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
  display: block;
  fill: rgba(55, 53, 47, 0.45);
  flex-shrink: 0;
  backface-visibility: hidden;
}

.typesCheckbox {
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
  display: block;
  fill: rgba(55, 53, 47, 0.45);
  flex-shrink: 0;
  backface-visibility: hidden;
}

.typesSelect {
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
  display: block;
  fill: rgba(55, 53, 47, 0.45);
  flex-shrink: 0;
  backface-visibility: hidden;
}

.typesMultipleSelect {
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
  display: block;
  fill: rgba(55, 53, 47, 0.45);
  flex-shrink: 0;
  backface-visibility: hidden;
}

.plus {
  width: 24px;
  height: 24px;
  margin-bottom: 3px;
  display: block;
  fill: rgba(55, 53, 47, 0.35);
  flex-shrink: 0;
  backface-visibility: hidden;
  margin-right: 3px;
  margin-top: 1px;
}

.comment__div--line {
  width: 100%;
  height: 1px;
  background: rgba(55, 53, 47, 0.09);
  margin-bottom: 8px;
}

.checkbox {
  width: 25px;
  height: 25px;
}

@media screen and (max-width: 1440px) {
  .content {
    margin-left: 50px;
    margin-right: 50px;
  }
}
@media screen and (max-width: 1080px) {
  .content {
    margin-left: 35px;
    margin-right: 35px;
  }
  .checkbox {
    width: 20px;
    height: 20px;
  }
}
@media screen and (max-width: 480px) {
  .content {
    margin-left: 15px;
    margin-right: 15px;
  }
  .data {
    display: none;
  }
  .filter {
    display: none;
  }
  .sort {
    display: none;
  }
}

@media screen and (max-width: 720px) {
  .content-menu__fn__container--field {
    padding: 5px 5px 5px 5px;
    color: #a2a2a2;
    font-size: 16px;
    margin-bottom: 7px;
    border-radius: 5px;
  }

  .dots {
    width: 18px;
  }
  .new {
    border-radius: 3px;
    color: white;
    background-color: rgb(35, 131, 226);
    width: 50px;
    height: 30px;
  }

  .new__arrow {
    color: white;
    background-color: rgb(35, 131, 226);
    width: 20px;
    height: 30px;
  }

  .calendar-data {
    font-weight: 600;
    margin-left: 8px;
    margin-right: 8px;
    line-height: 1;
    font-size: 16px;
    margin-top: 15px;
  }

  .month-switch__arrow-left--svg {
    width: 15px;
    height: 15px;
    display: block;
    fill: rgba(55, 53, 47, 0.45);
    flex-shrink: 0;
    backface-visibility: hidden;
  }

  .month-switch__text {
    font-size: 16px;
  }
}

@media screen and (max-width: 360px) {
  .content-menu__fn__container--field {
    padding: 5px 5px 5px 5px;
    color: #a2a2a2;
    font-size: 16px;
    margin-bottom: 7px;
    border-radius: 5px;
  }

  .dots {
    width: 18px;
  }
  .new {
    font-size: 14px;
    border-radius: 3px;
    color: white;
    background-color: rgb(35, 131, 226);
    width: 40px;
    height: 25px;
  }

  .new__arrow {
    color: white;
    background-color: rgb(35, 131, 226);
    width: 15px;
    height: 25px;
  }

  .calendar-data {
    font-weight: 600;
    margin-left: 8px;
    margin-right: 8px;
    line-height: 1;
    font-size: 14px;
    margin-top: 15px;
  }

  .month-switch__arrow-left {
    height: 20px;
    width: 20px;
  }
  .month-switch__arrow-right {
    height: 20px;
    width: 20px;
  }

  .month-switch__arrow-left--svg {
    width: 12px;
    height: 12px;
    display: block;
    fill: rgba(55, 53, 47, 0.45);
    flex-shrink: 0;
    backface-visibility: hidden;
  }

  .month-switch__text {
    font-size: 10px;
  }
}

@media only screen and (max-width: 291px) {
  .calendar-data {
    font-weight: 600;
    margin-left: 8px;
    margin-right: 8px;
    line-height: 1;
    font-size: 10px;
    margin-top: 15px;
  }

  .month-switch__arrow-left {
    height: 15px;
    width: 15px;
    margin-top: 0px;
  }
  .month-switch__arrow-right {
    height: 15px;
    width: 15px;
    margin-top: 0px;
  }

  .month-switch__arrow-left--svg {
    width: 10px;
    height: 10px;
    display: block;
    fill: rgba(55, 53, 47, 0.45);
    flex-shrink: 0;
    backface-visibility: hidden;
  }

  .month-switch__text {
    font-size: 10px;
    margin-top: 0px;
    width: 20px;
    height: 30px;
  }
}
</style>
