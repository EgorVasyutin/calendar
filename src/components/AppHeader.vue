<template>
  <header class="header">
    <div class="header-left">
      <div class="header-left__container">
        <img src="../assets/img/check.svg" />
        <div class="header__heading">Calendar / Task List</div>
      </div>
    </div>
    <div class="header-right">
      <div class="modal-header__container-icons--right">
        <div class="icon__share">Share</div>
        <div class="icon--right chat">
          <img src="../assets/img/chat.svg" class="icon" />
        </div>
        <div class="icon--right time">
          <img src="../assets/img/time.svg" class="icon" />
        </div>
        <div class="icon--right star">
          <img src="../assets/img/star.svg" class="icon" />
        </div>
        <div class="icon__ellipsis--left">
          <img src="../assets/img/dots.svg" class="icon" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;

  &-left {
    display: flex;

    &__container {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
  &-right {
    display: flex;
  }

  &__heading {
    font-size: 24px;
  }
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
  height: 38px;
  width: 40px;
  padding: 0px;
  margin-right: 2px;
}

.modal-header__container-icons--right {
  display: flex;
  align-items: stretch;
  flex-grow: 0;
  flex-shrink: 0;
  z-index: 1;
  gap: 5px;
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
  height: 38px;
  width: 60px;
  padding: 0px;
  font-size: 20px;
}

.icon__ellipsis--left {
  user-select: none;
  transition: background 20ms ease-in 0s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  width: 40px;
  border-radius: 3px;
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

.star:hover {
  background-color: #eeeeee;
  transition: 0.1s;
}

@media screen and (max-width: 480px) {
  .header__heading {
    font-size: 16px;
  }

  .icon__share {
    font-size: 12px;
    width: 30px;
  }

  .icon {
    width: 16px;
  }

  .icon--right {
    margin-right: 0px;
    width: 20px;
  }

  .icon__ellipsis--left {
    width: 20px;
    border-radius: 3px;
  }
  .time {
    display: none;
  }
  .star {
    display: none;
  }
}

@media screen and (max-width: 291px) {
  .header__heading {
    font-size: 12px;
  }

  .icon__share {
    font-size: 12px;
    width: 30px;
  }

  .icon {
    width: 16px;
  }

  .icon--right {
    margin-right: 0px;
    width: 20px;
  }

  .icon__ellipsis--left {
    width: 20px;
    border-radius: 3px;
  }
  .time {
    display: none;
  }
  .star {
    display: none;
  }
}
</style>
