<template>
  <div class="bg-light">
    <div class="login">
      <h2 class="headingXL">Sign In</h2>
      <AuthOTP />
      <AuthGoogle />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.login {
  padding: 5em;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: auto;
  gap: 40px;
  min-width: 250px;
  background-color: colors.$lightgrey;
  border: 1px solid rgba(204, 204, 204, 0.4);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 2px;
  border-radius: 4px;
}
</style>
