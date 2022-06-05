<script setup lang="ts">
import ImageDetails from "@/components/ImageDetails/ImageDetails.vue";
import Loading from "@/partials/LoadingPartial.vue";
import { onErrorCaptured, ref } from "vue";

const error = ref<Error>();

onErrorCaptured((err) => {
  error.value = err;
});
</script>
<template>
  <h1 class="not-found" v-if="error">{{ error }}</h1>
  <Suspense v-else>
    <template #default><ImageDetails /></template>
    <template #fallback><Loading /></template>
  </Suspense>
</template>
