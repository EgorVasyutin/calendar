<template>
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
</template>

<script>
export default {
  name: 'ModalIcons',
}
</script>

<style scoped lang="scss">
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

.icon__share:hover {
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
</style>
