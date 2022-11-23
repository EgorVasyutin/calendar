<template class="template">
  <form class="container" @submit.prevent="submitForm">
    <div class="text">Authorization</div>
    <div>
      <app-input
        placeholder="Name"
        label="Your name"
        v-model:value="v.nameField.$model"
        :error="v.nameField.$errors"
      ></app-input>
      <app-input
        type="email"
        placeholder="Email"
        label="Your name"
        v-model:value="v.emailField.$model"
        :error="v.emailField.$errors"
      ></app-input>
      <app-input
        type="password"
        placeholder="Password"
        label="Your Password"
        v-model:value="v.passwordField.$model"
        :error="v.passwordField.$errors"
      ></app-input>
      <app-input
        type="password"
        placeholder="Confirm password"
        label="Confirm password"
        v-model:value="v.confirmPasswordField.$model"
        :error="v.confirmPasswordField.$errors"
      ></app-input>
    </div>
    <app-button label="Authorization" />
  </form>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { ref, computed } from "vue";
import {
  minLength,
  helpers,
  email,
  sameAs,
  required,
} from "@vuelidate/validators";

const nameField = ref("");
const emailField = ref("");
const passwordField = ref("");
const confirmPasswordField = ref("");

const rules = computed(() => ({
  nameField: {
    required: helpers.withMessage("Это поле обязательно", required),
    minLength: helpers.withMessage(
      "Минимальная длина: 3 символа",
      minLength(3)
    ),
  },
  emailField: {
    required: helpers.withMessage("Это поле обязательно", required),
    email: helpers.withMessage("Вы ввели не верный email", email),
  },
  passwordField: {
    required: helpers.withMessage("Это поле обязательно", required),
    minLength: helpers.withMessage(
      "Минимальная длина: 6 символа",
      minLength(6)
    ),
  },
  confirmPasswordField: {
    required: helpers.withMessage("Это поле обязательно", required),
    sameAsPassword: helpers.withMessage(
      "Пароли не совпадают",
      sameAs(passwordField.value)
    ),
  },
}));

const v = useVuelidate(rules, {
  nameField,
  emailField,
  passwordField,
  confirmPasswordField,
});

const submitForm = () => {
  v.value.$touch();
  if (v.value.$error) return;
  alert("Form submitted");
};
</script>

<style scoped lang="scss">
.text {
  color: black;
  font-weight: bold;
  font-size: 40px;
  padding-bottom: 20px;
}
.template {
  display: flex;
  justify-content: center;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 300px;
}
</style>
