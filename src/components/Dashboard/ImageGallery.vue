<script setup lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
import { ImageDetails } from "../../types";
import ImageItem from "./ImageItem.vue";

const store = useStore();

const images = computed<ImageDetails[]>(() => store.getters.images);
await store.dispatch("getListOfImages");
</script>
<template>
  <ul class="dashboard__grid">
    <ImageItem
      v-for="(image, index) in images"
      :key="image.id"
      :image="image"
      :index="index"
    />
  </ul>
</template>
<style scoped lang="scss">
.dashboard {
  &__grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0 calc(var(--gallery-grid-gap) / -2) 0
      calc(var(--gallery-grid-gap) / -2);
  }
}
</style>
