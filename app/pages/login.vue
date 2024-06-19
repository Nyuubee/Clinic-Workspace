<template>
  <Head>
    <Title>Login</Title>
  </Head>
  <form class="card card-normal h-max  w-full max-w-xl self-center" @submit.prevent="goLogin()">
    <div class="card-body">
      <!-- TODO: Use the commented labels for errors/assistance -->
      <label class="label">
        <span class="label-text">Username:</span>
        <span class="label-text-alt text-error" v-if="wrongCredentials">Wrong username or password</span>
      </label>
      <input required class="input" :class="{ 'input-error': wrongCredentials }" type="text" name="username" id="username"
        placeholder="username" v-model="username" />
      <label class="label">
        <!-- <span class="label-text-alt">Bottom Left label</span>
                    <span class="label-text-alt">Bottom Right label</span> -->
      </label>
      <label class="label">
        <span class="label-text">Password:</span>
        <span class="label-text-alt text-error" v-if="wrongCredentials">Wrong username or password</span>
      </label>
      <input required class="input text-lg" :class="{ 'input-error': wrongCredentials }" type="password" name="password"
        id="password" placeholder="password here" v-model="password" />
      <label class="label">
        <!-- <span class="label-text-alt">Bottom Left label</span> -->
        <!-- <span class="label-text-alt">Bottom Right label</span> -->
      </label>

      <div class="card-actions self-center">
        <button class="btn btn-info" v-if="isLoginPending">Logging in...</button>
        <button class="btn-primary btn h-full px-5 text-lg" v-else>Login</button>
      </div>
    </div>
  </form>
  <div class="divider w-full self-center">OR USE</div>
        <AuthProviders callback-url="" />
  <div class="self-center">OR</div>
  <div class="card">
    <div class="card-body">
      <NuxtLink to="/register" class="btn-secondary btn w-max self-center"> Register </NuxtLink>
      <!-- <NuxtLink to="/recover" class="btn-ghost btn underline"> Recover Account </NuxtLink> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { login } from '~/utils/auth/login';

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
/**
 * @see https://next-auth.js.org/configuration/pages#sign-in-page
 */
const username = ref("");
const password = ref("");
const { data: loginResponse, execute: goLogin, status: loginStatus } = useAsyncData(() => login(username.value, password.value),
  {
    immediate: false,
  },
)
const isLoginPending = computed(() => loginStatus.value == "pending")
const errors = computed(() => loginResponse.value?.error)
const wrongCredentials = computed(() => errors.value == "CredentialsSignin")
</script>
<style scoped>
:deep(.input) {
  @apply lg:py-8 text-xl bg-base-300
}
</style>
