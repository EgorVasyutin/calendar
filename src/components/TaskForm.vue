<template>
  <div class="modal-content__title">
    <input
      class="modal-content__input"
      placeholder="Untitled"
      v-model="title"
    />
  </div>
  <div class="modal-content__table">
    <div class="modal-content__table--string">
      <div class="string-left">
        <img src="../assets/img/date.svg" />
        <div class="string-text">Data</div>
      </div>
      <div class="container--data">
        <datepicker
          range
          lang="en"
          type="date"
          v-model="dateModel"
          class="startData"
          placeholder="Start data "
        />
      </div>
    </div>
    <div class="modal-content__table--string">
      <div class="string-left">
        <img src="../assets/img/date.svg" />
        <div class="string-text">Data Created</div>
      </div>
      <div class="string-right string-text-2">13:10 -> 2:13</div>
    </div>
    <div class="modal-content__table--string">
      <div class="string-left">
        <img src="../assets/img/checkbox.svg" />
        <div class="string-text">Готово</div>
      </div>
      <div class="string-right string-text">
        <input
          type="checkbox"
          class="checkbox"
          :checked="isDoneProps"
          @click="emits('clickOnCheckbox')"
        />
      </div>
    </div>
    <div class="modal-content__table--string">
      <div class="string-left" @click="openAndClosePopper('priority')">
        <img src="../assets/img/play.svg" />
        <div class="string-text">Приоритет</div>
        <app-popper
          class="popper"
          :showPopper="showPopperPriority"
          @close="openAndClosePopper('priority')"
          @click.stop.prevent
        >
          <button
            class="popper__btm-tag"
            @click="clickOnTag('priority', $event)"
          >
            1
          </button>
          <button
            class="popper__btm-tag"
            @click="clickOnTag('priority', $event)"
          >
            2
          </button>
          <button
            class="popper__btm-tag"
            @click="clickOnTag('priority', $event)"
          >
            3
          </button>
        </app-popper>
      </div>
      <div class="green string-text-2 string-right priority">
        {{ priority }}
      </div>
    </div>
    <div class="modal-content__table--string">
      <div class="string-left" @click="openAndClosePopper('status')">
        <img src="../assets/img/play.svg" />
        <div class="string-text">Статус</div>
        <app-popper
          class="popper"
          :showPopper="showPopperStatus"
          @close="openAndClosePopper('status')"
          @click.stop.prevent
        >
          <button class="popper__btm-tag" @click="clickOnTag('status', $event)">
            1
          </button>
          <button class="popper__btm-tag" @click="clickOnTag('status', $event)">
            2
          </button>
          <button class="popper__btm-tag" @click="clickOnTag('status', $event)">
            3
          </button>
        </app-popper>
      </div>
      <div class="string-right string-text-2 status">Разработка</div>
    </div>
    <div class="modal-content__table--string">
      <div class="string-left" @click="openAndClosePopper('type')">
        <img src="../assets/img/multiselect.svg" />
        <div class="string-text">Тип</div>
        <app-popper
          class="popper"
          :showPopper="showPopperType"
          @close="openAndClosePopper('type')"
          @click.stop.prevent
        >
          <button class="popper__btm-tag" @click="clickOnTag('type', $event)">
            1
          </button>
          <button class="popper__btm-tag" @click="clickOnTag('type', $event)">
            2
          </button>
          <button class="popper__btm-tag" @click="clickOnTag('type', $event)">
            3
          </button>
        </app-popper>
      </div>
      <div class="string-right string-text-2 type">{{ type }}</div>
    </div>
    <div class="modal-content__table--string add-property">
      <div class="string-left">
        <img src="../assets/img/plus.svg" />
        <div class="string-text">Add property</div>
      </div>
    </div>
    <div class="div"></div>
    <div class="comments__div">
      <div class="comments"></div>
      <input class="comments__input" placeholder="Add a comment..." />
      <div class="comment__div--line"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Datepicker from "@vuepic/vue-datepicker";
import { ref, watch } from "vue";
import AppPopper from "@/components/AppPopper";

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  isDoneProps: {
    type: Boolean,
    required: true,
  },
});

// eslint-disable-next-line no-undef
const emits = defineEmits(["modal-data"]);

const dateModel = ref("");

// eslint-disable-next-line no-unused-vars,no-undef
const title = ref<string>("");
// eslint-disable-next-line no-unused-vars
const isDone = ref<boolean>(false);
const type = ref<string>("sss5");
const priority = ref<string>("normal");
const startDate = ref<string>(new Date().toISOString());
const endDate = ref<string>(new Date().toISOString());

const showPopperPriority = ref(false);

const showPopperStatus = ref(false);

const showPopperType = ref(false);

const openAndClosePopper = (name) => {
  if (name === "priority") showPopperPriority.value = !showPopperPriority.value;
  if (name === "status") showPopperStatus.value = !showPopperStatus.value;
  if (name === "type") showPopperType.value = !showPopperType.value;
};

watch(dateModel, () => {
  if (dateModel.value.length) {
    startDate.value = dateModel.value[0].toISOString();
    endDate.value = dateModel.value[1].toISOString();
  }
});

document
  .querySelector(".modal-overlay")
  .addEventListener("click", async function () {
    console.log(1);
    await emits(
      "modal-data",
      title.value,
      isDone.value,
      type.value,
      priority.value,
      startDate.value,
      endDate.value
    );
  });

const clickOnTag = (name, e) => {
  if (name === "priority")
    document.querySelector(".priority").innerHTML = e.target.innerHTML;
  if (name === "status")
    document.querySelector(".status").innerHTML = e.target.innerHTML;
  if (name === "type")
    document.querySelector(".type").innerHTML = e.target.innerHTML;
};
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
</style>
