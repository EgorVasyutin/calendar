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
const emit = defineEmits(["modal-close", "delete-todo-modal"]);

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
</script>

<template>
  <div v-show="modalOpen" class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <div class="modal-header">
        <slot name="header" />
        <div class="modal-header__container">
          <div class="modal-header__container-icons--left">
            <div class="icon--left arrows">
              <svg
                viewBox="0 0 16 16"
                class="openAsPageThick"
                style="
                  width: 16px;
                  height: 16px;
                  display: block;
                  fill: rgba(55, 53, 47, 0.45);
                  flex-shrink: 0;
                  backface-visibility: hidden;
                "
              >
                <path
                  d="M2.16895 7.19629C2.59277 7.19629 2.90723 6.88867 2.90723 6.45801V5.96582L2.75684 3.81934L4.35645 5.50098L6.3252 7.4834C6.46875 7.63379 6.65332 7.70215 6.85156 7.70215C7.30957 7.70215 7.6377 7.39453 7.6377 6.93652C7.6377 6.72461 7.55566 6.54004 7.41211 6.39648L5.43652 4.4209L3.74805 2.82129L5.91504 2.96484H6.44141C6.86523 2.96484 7.18652 2.65723 7.18652 2.22656C7.18652 1.7959 6.87207 1.48145 6.44141 1.48145L2.64746 1.48145C1.86816 1.48145 1.41699 1.93262 1.41699 2.71875L1.41699 6.45801C1.41699 6.88184 1.73828 7.19629 2.16895 7.19629ZM9.55176 14.6543H13.3389C14.125 14.6543 14.5762 14.2031 14.5762 13.417V9.67773C14.5762 9.25391 14.2549 8.93945 13.8242 8.93945C13.4004 8.93945 13.0859 9.24707 13.0859 9.67773V10.1699L13.2295 12.3164L11.6299 10.6348L9.66113 8.65234C9.52441 8.50195 9.33984 8.43359 9.1416 8.43359C8.68359 8.43359 8.35547 8.74121 8.35547 9.19922C8.35547 9.41113 8.43066 9.5957 8.57422 9.73926L10.5566 11.7148L12.2383 13.3145L10.0781 13.1709H9.55176C9.12793 13.1709 8.80664 13.4785 8.80664 13.9092C8.80664 14.3398 9.12109 14.6543 9.55176 14.6543Z"
                ></path>
              </svg>
            </div>
            <div class="icon--left display">
              <svg
                viewBox="0 0 16 16"
                class="peekModeCenter"
                style="
                  width: 14px;
                  height: 14px;
                  display: block;
                  fill: rgba(55, 53, 47, 0.45);
                  flex-shrink: 0;
                  backface-visibility: hidden;
                "
              >
                <path
                  d="M2.1416 14.4492H13.8516C15.3281 14.4492 16.0938 13.6904 16.0938 12.2344V3.9082C16.0938 2.45215 15.3281 1.69336 13.8516 1.69336H2.1416C0.665039 1.69336 -0.100586 2.44531 -0.100586 3.9082V12.2344C-0.100586 13.6904 0.665039 14.4492 2.1416 14.4492ZM2.22363 13.1094C1.58789 13.1094 1.23926 12.7812 1.23926 12.1182V4.02441C1.23926 3.36133 1.58789 3.02637 2.22363 3.02637H13.7695C14.3984 3.02637 14.7539 3.36133 14.7539 4.02441V12.1182C14.7539 12.7812 14.3984 13.1094 13.7695 13.1094H2.22363ZM4.33594 11.0654H11.6504C12.0742 11.0654 12.2588 10.8809 12.2588 10.4502V5.69238C12.2588 5.25488 12.0742 5.07715 11.6504 5.07715H4.33594C3.91211 5.07715 3.72754 5.25488 3.72754 5.69238V10.4502C3.72754 10.8809 3.91211 11.0654 4.33594 11.0654Z"
                ></path>
              </svg>
            </div>
            <div class="line"></div>
            <div class="icon--left arrow-up">
              <svg
                viewBox="0 0 15 9"
                class="chevronUpRounded"
                style="
                  width: 14px;
                  height: 14px;
                  display: block;
                  fill: rgba(55, 53, 47, 0.45);
                  flex-shrink: 0;
                  backface-visibility: hidden;
                "
              >
                <path
                  d="M1.258 6.5L7.203.422a.946.946 0 01.719-.32.99.99 0 01.726.32L14.586 6.5a.89.89 0 01.266.648c0 .524-.407.93-.922.93a.921.921 0 01-.672-.281L7.93 2.32 2.586 7.797a.926.926 0 01-.672.281.915.915 0 01-.922-.93c0-.25.094-.476.266-.648z"
                ></path>
              </svg>
            </div>
            <div class="icon--left arrow-down">
              <svg
                viewBox="0 0 15 9"
                class="chevronDownRounded"
                style="
                  width: 14px;
                  height: 14px;
                  display: block;
                  fill: rgba(55, 53, 47, 0.45);
                  flex-shrink: 0;
                  backface-visibility: hidden;
                "
              >
                <path
                  d="M7.92188 8.65625C8.19531 8.64844 8.44531 8.54688 8.64844 8.32812L14.5859 2.25C14.7578 2.07812 14.8516 1.85938 14.8516 1.60156C14.8516 1.08594 14.4453 0.671875 13.9297 0.671875C13.6797 0.671875 13.4375 0.773438 13.2578 0.953125L7.92969 6.42969L2.58594 0.953125C2.40625 0.78125 2.17188 0.671875 1.91406 0.671875C1.39844 0.671875 0.992188 1.08594 0.992188 1.60156C0.992188 1.85938 1.08594 2.07812 1.25781 2.25L7.20312 8.32812C7.41406 8.54688 7.64844 8.65625 7.92188 8.65625Z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="modal-header__container-icons--right">
            <div class="icon__share">Share</div>
            <div class="icon--right chat">
              <svg viewBox="0 0 20 20" class="topbarComment">
                <path
                  d="M5.9375 18.4844C6.38281 18.4844 6.71094 18.2656 7.25 17.7891L9.92969 15.4297H14.6328C16.9844 15.4297 18.3047 14.0703 18.3047 11.75V5.67969C18.3047 3.35938 16.9844 2 14.6328 2H4.67188C2.32812 2 1 3.35938 1 5.67969V11.75C1 14.0781 2.36719 15.4297 4.61719 15.4297H4.9375V17.3438C4.9375 18.0391 5.30469 18.4844 5.9375 18.4844ZM6.32812 16.7344V14.5078C6.32812 14.0469 6.125 13.8672 5.6875 13.8672H4.72656C3.25781 13.8672 2.55469 13.125 2.55469 11.7031V5.72656C2.55469 4.30469 3.25781 3.5625 4.72656 3.5625H14.5859C16.0469 3.5625 16.75 4.30469 16.75 5.72656V11.7031C16.75 13.125 16.0469 13.8672 14.5859 13.8672H9.84375C9.36719 13.8672 9.13281 13.9453 8.80469 14.2891L6.32812 16.7344ZM5.67969 6.82812H13.5469C13.8125 6.82812 14.0312 6.60156 14.0312 6.32812C14.0312 6.07031 13.8125 5.85156 13.5469 5.85156H5.67969C5.41406 5.85156 5.20312 6.07031 5.20312 6.32812C5.20312 6.60156 5.41406 6.82812 5.67969 6.82812ZM5.67969 9.30469H13.5469C13.8125 9.30469 14.0312 9.08594 14.0312 8.8125C14.0312 8.55469 13.8125 8.32812 13.5469 8.32812H5.67969C5.41406 8.32812 5.20312 8.55469 5.20312 8.8125C5.20312 9.08594 5.41406 9.30469 5.67969 9.30469ZM5.67969 11.7891H10.8047C11.0781 11.7891 11.2891 11.5703 11.2891 11.3047C11.2891 11.0312 11.0781 10.8125 10.8047 10.8125H5.67969C5.41406 10.8125 5.20312 11.0312 5.20312 11.3047C5.20312 11.5703 5.41406 11.7891 5.67969 11.7891Z"
                ></path>
              </svg>
            </div>
            <div class="icon--right time">
              <svg viewBox="0 0 20 20" class="topbarUpdate">
                <path
                  d="M10.0781 18.1562C14.5078 18.1562 18.1641 14.5 18.1641 10.0781C18.1641 5.65625 14.5 2 10.0703 2C5.64844 2 2 5.65625 2 10.0781C2 14.5 5.65625 18.1562 10.0781 18.1562ZM10.0781 16.5469C6.49219 16.5469 3.625 13.6641 3.625 10.0781C3.625 6.49219 6.49219 3.61719 10.0703 3.61719C13.6562 3.61719 16.5391 6.49219 16.5469 10.0781C16.5547 13.6641 13.6641 16.5469 10.0781 16.5469ZM6.14062 11.0625H10.0703C10.4297 11.0625 10.7031 10.7891 10.7031 10.4375V5.32812C10.7031 4.97656 10.4297 4.70312 10.0703 4.70312C9.72656 4.70312 9.45312 4.97656 9.45312 5.32812V9.8125H6.14062C5.78906 9.8125 5.51562 10.0859 5.51562 10.4375C5.51562 10.7891 5.78906 11.0625 6.14062 11.0625Z"
                ></path>
              </svg>
            </div>
            <div class="icon--right star">
              <svg viewBox="0 0 20 20" class="topbarComment">
                <path
                  d="M4.77321 18.0645C5.14821 18.3457 5.60915 18.252 6.1404 17.8691L10.2029 14.8848L14.2576 17.8691C14.7888 18.252 15.2498 18.3457 15.6248 18.0645C15.992 17.7832 16.0701 17.3223 15.8591 16.7051L14.2576 11.9395L18.3513 9.00195C18.8826 8.62695 19.1013 8.20508 18.9529 7.76758C18.8045 7.33008 18.3904 7.11133 17.7341 7.11914L12.7185 7.1582L11.1873 2.36133C10.9841 1.73633 10.6638 1.40039 10.2029 1.40039C9.73415 1.40039 9.41383 1.73633 9.21071 2.36133L7.68727 7.1582L2.66383 7.11914C2.00758 7.11133 1.59352 7.33008 1.44508 7.75977C1.29665 8.20508 1.52321 8.62695 2.04665 9.00195L6.1404 11.9395L4.53883 16.7051C4.3279 17.3223 4.40602 17.7832 4.77321 18.0645ZM6.17165 16.1504C6.15602 16.1348 6.15602 16.127 6.17165 16.0801L7.64821 11.916C7.78102 11.5254 7.74196 11.291 7.37477 11.0488L3.72633 8.54883C3.69508 8.52539 3.67946 8.50977 3.69508 8.49414C3.7029 8.4707 3.71852 8.4707 3.75758 8.4707L8.17946 8.57227C8.58571 8.58789 8.79665 8.45508 8.91383 8.05664L10.156 3.82227C10.1716 3.77539 10.1795 3.75977 10.2029 3.75977C10.2185 3.75977 10.2341 3.77539 10.242 3.82227L11.4841 8.05664C11.6013 8.45508 11.8123 8.58789 12.2263 8.57227L16.6404 8.4707C16.6873 8.4707 16.7029 8.4707 16.7107 8.49414C16.7185 8.50977 16.7029 8.52539 16.6716 8.54883L13.0232 11.0488C12.6638 11.291 12.617 11.5254 12.7576 11.916L14.2263 16.0801C14.242 16.127 14.242 16.1348 14.2263 16.1504C14.2185 16.166 14.1951 16.1582 14.1638 16.1348L10.6638 13.4316C10.3357 13.1816 10.0623 13.1816 9.73415 13.4316L6.23415 16.1348C6.2029 16.1582 6.18727 16.166 6.17165 16.1504Z"
                ></path>
              </svg>
            </div>
            <div class="icon__ellipsis--left">
              <svg viewBox="0 0 13 3" class="dots" @click="openAndClosePopper">
                <g>
                  <path
                    d="M3,1.5A1.5,1.5,0,1,1,1.5,0,1.5,1.5,0,0,1,3,1.5Z"
                  ></path>
                  <path
                    d="M8,1.5A1.5,1.5,0,1,1,6.5,0,1.5,1.5,0,0,1,8,1.5Z"
                  ></path>
                  <path
                    d="M13,1.5A1.5,1.5,0,1,1,11.5,0,1.5,1.5,0,0,1,13,1.5Z"
                  ></path>
                </g>
              </svg>
              <app-popper
                class="popper"
                :showPopper="showPopper"
                @close="openAndClosePopper"
                @click.stop
              >
                <button class="popper__btm" @click="deleteTodo">Delete</button>
                <button class="popper__btm">Copy</button>
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
</style>
