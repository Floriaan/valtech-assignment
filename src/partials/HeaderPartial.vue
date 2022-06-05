<script setup lang="ts">
import logo from "../assets/icons/Site Logo.svg";
</script>
<template>
  <header class="header">
    <div class="container header__container">
      <router-link
        :to="{ name: 'Login' }"
        class="header__logo"
        title="Valstock"
      >
        <img :src="logo" alt="Logo Icon" class="header__logo-img" />
      </router-link>
    </div>
  </header>
</template>
<style scoped lang="scss">
.header {
  height: var(--header-height);
  background-color: var(--bg-black);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 999;
  &__container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
  }
  &__logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__dropdown {
    width: toRem(140);
    :deep(.button) {
      border-color: var(--border-color-white);
    }
  }
  &__dropdown-link {
    color: var(--color-grey);
    &:hover,
    &:focus,
    &--active {
      color: var(--color-black);
    }
  }
}
</style>
