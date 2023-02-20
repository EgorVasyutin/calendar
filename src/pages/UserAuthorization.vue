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
        label="Your email"
        v-model:value="v.emailField.$model"
        :error="v.emailField.$errors"
      ></app-input>
      <app-input
        type="password"
        placeholder="Password"
        label="Your password"
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
    <app-button label="Авторизоваться" />
  </form>
  <app-button label="Войти" :outlined="true" @click="routeLogin" class="form-btm" />
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import useAuth from '@/composables/useAuth'
import { ref, computed } from 'vue'
import { minLength, helpers, email, sameAs, required } from '@vuelidate/validators'
import router from '@/router'

const auth = useAuth()

const nameField = ref('')
const emailField = ref('')
const passwordField = ref('')
const confirmPasswordField = ref('')

const rules = computed(() => ({
  nameField: {
    required: helpers.withMessage('Это поле обязательно', required),
    minLength: helpers.withMessage('Минимальная длина: 3 символа', minLength(3)),
  },
  emailField: {
    required: helpers.withMessage('Это поле обязательно', required),
    email: helpers.withMessage('Вы ввели не верный email', email),
  },
  passwordField: {
    required: helpers.withMessage('Это поле обязательно', required),
    minLength: helpers.withMessage('Минимальная длина: 6 символа', minLength(6)),
  },
  confirmPasswordField: {
    required: helpers.withMessage('Это поле обязательно', required),
    sameAsPassword: helpers.withMessage('Пароли не совпадают', sameAs(passwordField.value)),
  },
}))

const v = useVuelidate(rules, {
  nameField,
  emailField,
  passwordField,
  confirmPasswordField,
})

const submitForm = async () => {
  v.value.$touch()
  if (v.value.$error) return
  const response = await auth.singUp({
    username: v.value.nameField.$model,
    email: v.value.emailField.$model,
    password: v.value.passwordField.$model,
  })
  console.log(response)
  auth.userId = response.data.user.id
  localStorage.setItem('accessToken', response.data.accessToken)
  router.push('/')
}

const routeLogin = () => {
  router.push('/login')
}
</script>

<style scoped lang="scss">
.form-btm {
  width: 152px;
}
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
