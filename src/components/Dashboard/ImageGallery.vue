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
  <ul
    class="dashboard__grid"
    v-masonry
    gutter="36"
    transition-duration="0"
    item-selector=".dashboard__image-wrapper"
  >
    <ImageItem
      v-for="(image, index) in images"
      :key="image.id"
      :image="image"
      :index="index"
      v-masonry-tile
    />
  </ul>
</template>
