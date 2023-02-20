<template class="template">
  <form class="container" @submit.prevent="submitForm">
    <div class="text">Login</div>
    <div>
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
    </div>
    <app-button label="Войти" class="form-btm" />
  </form>
  <app-button label="Авторизоваться" :outlined="true" @click="routeAuth" />
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { ref, computed } from 'vue'
import { minLength, helpers, email, required } from '@vuelidate/validators'
import useAuth from '@/composables/useAuth'
import router from '@/router'
const auth = useAuth()
const emailField = ref('')
const passwordField = ref('')

const rules = computed(() => ({
  emailField: {
    required: helpers.withMessage('Это поле обязательно', required),
    email: helpers.withMessage('Вы ввели не верный email', email),
  },
  passwordField: {
    required: helpers.withMessage('Это поле обязательно', required),
    minLength: helpers.withMessage('Минимальная длина: 6 символа', minLength(6)),
  },
}))

const v = useVuelidate(rules, {
  emailField,
  passwordField,
})

const submitForm = async () => {
  v.value.$touch()
  if (v.value.$error) return

  const response = await auth.singIn({
    email: v.value.emailField.$model,
    password: v.value.passwordField.$model,
  })
  auth.userId = response.data.user.id
  localStorage.setItem('accessToken', response.data.accessToken)
  router.push('/')
}

const routeAuth = () => {
  router.push('/Authorization')
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
