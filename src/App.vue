<script setup lang="ts">
import HeaderPartial from "./partials/HeaderPartial.vue";
</script>

<template>
  <main class="wrapper">
    <HeaderPartial />
    <main class="pages">
      <router-view> </router-view>
    </main>
  </main>
</template>

<style scoped lang="scss">
.wrapper {
  position: relative;
}
.pages {
  margin-top: var(--header-height);
}
</style>
