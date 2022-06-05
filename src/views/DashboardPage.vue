<script setup lang="ts">
import ImageGallery from "@/components/Dashboard/ImageGallery.vue";
import LoadingPartial from "../partials/LoadingPartial.vue";
import { onErrorCaptured, ref } from "vue";

const error = ref<Error>();

onErrorCaptured((err) => {
  error.value = err;
});
</script>
<template>
  <section class="dashboard">
    <div class="container">
      <h1 class="not-found" v-if="error">{{ error }}</h1>
      <Suspense v-else>
        <template #default><ImageGallery /></template>
        <template #fallback> <LoadingPartial /> </template>
      </Suspense>
    </div>
  </section>
</template>
<style scoped lang="scss">
.dashboard {
  padding-bottom: var(--gallery-grid-gap);
}
</style>
