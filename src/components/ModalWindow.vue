<script setup lang="ts">
import AppPopper from "@/components/AppPopper.vue";
import { ref } from "vue";
// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  modalOpen: {
    type: Boolean,
    required: false,
  },
});
// eslint-disable-next-line no-undef,no-unused-vars
const emit = defineEmits(["modal-close", "delete-todo-modal", "on-copy"]);

const closeModal = () => {
  emit("modal-close");
};

const deleteTodo = () => {
  emit("delete-todo-modal");
  openAndClosePopper();
  closeModal();
};

const showPopper = ref(false);

const openAndClosePopper = () => {
  showPopper.value = !showPopper.value;
};

const onCopy = () => {
  emit("on-copy");
  openAndClosePopper();
};
</script>

<template>
  <div v-show="modalOpen" class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <slot name="header" />
        <div class="modal-header__container">
          <div class="modal-header__container-icons--left">
            <div class="icon--left arrows">
              <img src="../assets/img/arrows.svg" />
            </div>
            <div class="icon--left display">
              <img src="../assets/img/switchdisplay.svg" />
            </div>
            <!--            <div class="line"></div>-->
          </div>
          <div class="modal-header__container-icons--right">
            <div class="icon__share">Share</div>
            <div class="icon--right chat">
              <img src="../assets/img/chat.svg" />
            </div>
            <div class="icon--right time">
              <img src="../assets/img/time.svg" />
            </div>
            <div class="icon--right star">
              <img src="../assets/img/star.svg" />
            </div>
            <div class="icon__ellipsis--left" @click="openAndClosePopper">
              <img src="../assets/img/dots.svg" />
              <app-popper
                class="popper"
                :showPopper="showPopper"
                @close="openAndClosePopper"
                @click.stop
              >
                <button class="popper__btm" @click="deleteTodo">Delete</button>
                <button class="popper__btm" @click="onCopy">Copy</button>
              </app-popper>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </div>
</template>

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
  left: 860px;
  top: 35px;
}
.modal {
  z-index: 2;
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-left: auto;
  max-width: 970px;
  border-radius: 3px;
  background: white;
  box-shadow: rgb(15 15 15 / 2%) 0px 0px 0px 1px, rgb(15 15 15 / 3%) 0px 3px 6px,
    rgb(15 15 15 / 6%) 0px 9px 24px;
  top: 72px;
  left: 72px;
  right: 72px;
  margin-right: auto;
  height: calc(100% - 144px);

  &-header {
    z-index: 3;
    background: white;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    &__container {
      height: 44px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 12px;
      padding-right: 12px;

      &-icons--left {
        display: grid;
        grid-auto-flow: column;
        column-gap: 2px;
        align-items: center;
      }

      &-icons--right {
        display: flex;
        align-items: stretch;
        flex-grow: 0;
        flex-shrink: 0;
        z-index: 1;
      }
    }
  }

  &-content {
    max-width: 100%;
    min-width: 0px;
    width: 100%;
  }
}

.modal-overlay {
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.line {
  margin-top: 20px;
  height: 14px;
  width: 1px;
  margin-left: 6px;
  margin-right: 6px;
  background: rgba(55, 53, 47, 0.16);
}
.icon--left {
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 3px;
  height: 24px;
  width: 24px;
  padding: 0px;
}
.icon__share {
  color: black;
  margin-right: 5px;
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 3px;
  height: 30px;
  width: 55px;
  padding: 0px;
}
.icon--right {
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 3px;
  height: 28px;
  width: 33px;
  padding: 0px;
  margin-right: 2px;
}
.icon__ellipsis--left {
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 28px;
  border-radius: 3px;
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

.arrows:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}

.display:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}

.arrow-up:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}

.arrow-down:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}

.icon__share:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}

.icon__ellipsis--left:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}

.chat:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}

.time:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}

.star:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}

.topbarComment {
  width: 20px;
  height: 20px;
  display: block;
  fill: rgba(55, 53, 47, 0.85);
  flex-shrink: 0;
  backface-visibility: hidden;
}

.topbarUpdate {
  width: 20px;
  height: 20px;
  display: block;
  fill: rgba(55, 53, 47, 0.85);
  flex-shrink: 0;
  backface-visibility: hidden;
}

.dots {
  position: relative;
  width: 18px;
  height: 18px;
  display: block;
  fill: rgba(55, 53, 47, 0.85);
  flex-shrink: 0;
  backface-visibility: hidden;
}

@media screen and (max-width: 1080px) {
  .modal-overlay {
    display: block;
  }
  .modal {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 3000px;
    height: auto;
  }
}
</style>
