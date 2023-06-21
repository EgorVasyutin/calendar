<template>
  <div class="modal-content__title">
    <input v-model="task.title" class="modal-content__input" placeholder="Untitled" />
  </div>
  <div class="modal-content__table">
    <div class="modal-content__table--string">
      <div class="string-left">
        <img src="../assets/img/date.svg" class="string-left__icon" />
        <div class="string-text">Data</div>
      </div>
      <div class="container--data">
        <datepicker v-model="dateModel" range lang="en" type="date" class="startData" placeholder="Start data " />
      </div>
    </div>
    <div class="modal-content__table--string">
      <div class="string-left">
        <img src="../assets/img/date.svg" class="string-left__icon" />
        <div class="string-text">Data Created</div>
      </div>
      <div class="string-right string-text-2">13:10 -> 2:13</div>
    </div>
    <div class="modal-content__table--string">
      <div class="string-left">
        <img src="../assets/img/checkbox.svg" class="string-left__icon" />
        <div class="string-text">Готово</div>
      </div>
      <div class="string-right string-text">
        <input type="checkbox" class="checkbox" :checked="isDoneProps" @click="clickOnCheckbox" />
      </div>
    </div>
    <div class="modal-content__table--string">
      <div class="string-left" @click="openAndClosePopper('priority')">
        <img src="../assets/img/play.svg" class="string-left__icon" />
        <div class="string-text">Приоритет</div>
        <app-popper
          class="popper"
          :show-popper="showPopperPriority"
          @close="openAndClosePopper('priority')"
          @click.stop.prevent
        >
          <button class="popper__btm-tag" @click="clickOnTag('priority', $event)">1</button>
          <button class="popper__btm-tag" @click="clickOnTag('priority', $event)">2</button>
          <button class="popper__btm-tag" @click="clickOnTag('priority', $event)">3</button>
        </app-popper>
      </div>
      <div ref="priority" class="green string-text-2 string-right priority">
        {{ task.priority }}
      </div>
    </div>
    <div class="modal-content__table--string">
      <div class="string-left" @click="openAndClosePopper('status')">
        <img src="../assets/img/play.svg" class="string-left__icon" />
        <div class="string-text">Статус</div>
        <app-popper
          class="popper"
          :show-popper="showPopperStatus"
          @close="openAndClosePopper('status')"
          @click.stop.prevent
        >
          <button class="popper__btm-tag" @click="clickOnTag('status', $event)">1</button>
          <button class="popper__btm-tag" @click="clickOnTag('status', $event)">2</button>
          <button class="popper__btm-tag" @click="clickOnTag('status', $event)">3</button>
        </app-popper>
      </div>
      <div ref="status" class="string-right string-text-2 status">{{ task.status }}</div>
    </div>
    <div class="modal-content__table--string">
      <div class="string-left" @click="openAndClosePopper('type')">
        <img src="../assets/img/multiselect.svg" class="string-left__icon" />
        <div class="string-text">Тип</div>
        <app-popper
          class="popper"
          :show-popper="showPopperType"
          @close="openAndClosePopper('type')"
          @click.stop.prevent
        >
          <button class="popper__btm-tag" @click="clickOnTag('type', $event)">1</button>
          <button class="popper__btm-tag" @click="clickOnTag('type', $event)">2</button>
          <button class="popper__btm-tag" @click="clickOnTag('type', $event)">3</button>
        </app-popper>
      </div>
      <div ref="type" class="string-right string-text-2 type">{{ task.type }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import { debounce } from 'throttle-debounce'
import { ref, watch } from 'vue'
import AppPopper from '@/UI/AppPopper'
// import useTasks from "@/composables/useTasks";
import useTasks from '@/composables/useTasks'

const { redact } = useTasks()

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  isDoneProps: {
    type: Boolean,
    required: true,
  },
  created: {
    type: Boolean,
    default: false,
  },
  taskId: {
    type: String,
    required: true,
  },
})

// const refProps = toRefs(props);

// eslint-disable-next-line no-undef
const emits = defineEmits(['modal-data', 'task', 'update-task', 'clickOnCheckbox'])

const dateModel = ref('')

// eslint-disable-next-line no-unused-vars,no-undef
const task = ref({
  title: '',
  isDone: false,
  type: '',
  status: '',
  priority: '',
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
})

const updateTask = async () => {
  // emits("task", task.value);
  await redact(props.taskId, task.value)
  emits('update-task')
}

const debounceUpdateTask = debounce(300, updateTask)

watch(
  task,
  () => {
    console.log(123)
    debounceUpdateTask()
  },
  { deep: true },
)

const priority = ref(null)
const type = ref(null)
const status = ref(null)
// eslint-disable-next-line no-unused-vars
let modalValue = ref(false)

const showPopperPriority = ref(false)

const showPopperStatus = ref(false)

const showPopperType = ref(false)

const openAndClosePopper = (name) => {
  if (name === 'priority') showPopperPriority.value = !showPopperPriority.value
  if (name === 'status') showPopperStatus.value = !showPopperStatus.value
  if (name === 'type') showPopperType.value = !showPopperType.value
}

const clickOnTag = (name, e) => {
  if (name === 'priority') {
    priority.value.innerHTML = e.target.innerHTML
    // if (refProps.created.value !== true) task.value.priority = e.target.innerHTML;
    task.value.priority = e.target.innerHTML
  }

  if (name === 'status') {
    status.value.innerHTML = e.target.innerHTML
    // if (refProps.created.value !== true) task.value.status = e.target.innerHTML;
    task.value.status = e.target.innerHTML
  }

  if (name === 'type') {
    type.value.innerHTML = e.target.innerHTML
    // if (refProps.created.value !== true) task.value.type = e.target.innerHTML;
    task.value.type = e.target.innerHTML
  }
}

watch(dateModel, () => {
  if (dateModel.value.length) {
    task.value.startDate = dateModel.value[0].toISOString()
    task.value.endDate = dateModel.value[1].toISOString()
  }
})

const clickOnCheckbox = () => {
  console.log(123)
  emits('clickOnCheckbox', props.taskId)
}
</script>

<style scoped lang="scss">
.popper__btm-tag {
  z-index: 10;
  width: 100px;
  height: 35px;
  background-color: #fff;
  border: none;
  font-size: 16px;
}

.popper__btm-tag:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}
.popper {
  margin-top: 130px;
}

@media screen and (max-width: 720px) {
  .modal-content__title {
    margin-bottom: 15px;
    color: black;
    max-width: 100%;
    width: 75%;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    margin-left: 70px;
    margin-top: 50px;
  }
  .modal-content__table {
    margin-top: 5px;
    padding-left: 70px;
    padding-right: calc(126px + env(safe-area-inset-right));
    max-width: 100%;
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .modal-content__title {
    margin-bottom: 15px;
    color: black;
    max-width: 100%;
    width: 75%;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    margin-left: 40px;
    margin-top: 50px;
  }
  .modal-content__table {
    margin-top: 5px;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 100%;
    width: 100%;
  }
  .modal-content__input {
    height: 40px;
    font-size: 30px;
    font-weight: 500;
  }

  .string-text {
    font-size: 14px;
  }

  .string-text-2 {
    font-size: 14px;
  }

  .modal-content__input::placeholder {
    font-size: 30px;
    font-weight: 700;
    color: #d7d7d7;
  }
  .string-left__icon {
    width: 16px;
  }
}

@media screen and (max-width: 360px) {
  .modal-content__title {
    margin-bottom: 15px;
    color: black;
    max-width: 100%;
    width: 75%;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    margin-left: 30px;
    margin-top: 50px;
  }
  .modal-content__table {
    margin-top: 5px;
    padding-left: 30px;
    padding-right: 30px;
    max-width: 100%;
    width: 100%;
  }
  .modal-content__input {
    height: 40px;
    font-size: 30px;
    font-weight: 500;
  }

  .string-text {
    font-size: 14px;
  }

  .string-text-2 {
    font-size: 14px;
  }

  .modal-content__input::placeholder {
    font-size: 30px;
    font-weight: 700;
    color: #d7d7d7;
  }
  .comments__input::placeholder {
    color: #a2a2a2;
    font-size: 14px;
    padding-left: 8px;
  }
}

@media screen and (max-width: 290px) {
  .modal-content__title {
    margin-bottom: 15px;
    color: black;
    max-width: 100%;
    width: 75%;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    margin-left: 5px;
    margin-top: 50px;
  }
  .modal-content__table {
    margin-top: 5px;
    padding-left: 5px;
    padding-right: 30px;
    max-width: 100%;
    width: 100%;
  }
  .modal-content__input {
    height: 40px;
    font-size: 30px;
    font-weight: 500;
  }

  .string-text {
    font-size: 14px;
  }

  .string-text-2 {
    font-size: 14px;
  }

  .modal-content__input::placeholder {
    font-size: 30px;
    font-weight: 700;
    color: #d7d7d7;
  }

  .string-left {
    width: 150px;
  }
  .comments__input::placeholder {
    color: #a2a2a2;
    font-size: 14px;
    padding-left: 8px;
  }
}
</style>
