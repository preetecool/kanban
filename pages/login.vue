<template>
  <div class="container">
    <div class="login">
      <h2 class="headingXL">Sign in to your account</h2>
      <AuthOTP />
      <AuthGoogle />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
  background-color: colors.$lightgrey;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  padding: 5em;
  display: flex;
  flex-direction: column;
  gap: 40px;
  border: 1px solid rgba(204, 204, 204, 0.4);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 2px;
  border-radius: 4px;
}
</style>
