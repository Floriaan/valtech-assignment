<script setup lang="ts">
import { useStore } from "@/store";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ImageDetails } from "../../types";
import ImageItem from "./ImageItem.vue";

const page = ref<number>(1);
const isLoading = ref<boolean>(false);

const store = useStore();
const route = useRoute();
const router = useRouter();

const images = computed<ImageDetails[]>(() => store.getters.images);

watch(
  page,
  (newValue: number) => {
    if (newValue) {
      router.replace({ query: { page: newValue } });
    } else {
      router.replace({ query: { page: 1 } });
    }
  },
  { immediate: true }
);

onMounted(() => {
  window.addEventListener("scroll", handlePagination);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handlePagination);
  store.commit("setImages", []);
});

const handlePagination = async (): Promise<void> => {
  let bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight ===
    document.documentElement.offsetHeight;

  if (bottomOfWindow && !isLoading.value) {
    isLoading.value = true;
    page.value = ++page.value;
    const images = await store.dispatch("getListOfImages", page.value);
    // Remove scroll pagination if there are no more images to fetch
    if (!images.length) {
      window.removeEventListener("scroll", handlePagination);
    }
    setTimeout(() => {
      isLoading.value = false;
    }, 200);
  }
};

const init = async (): Promise<void> => {
  const routePage = parseInt(route.query.page as string);
  if (routePage) {
    page.value = routePage;
    const images = await store.dispatch("getListOfImages", page.value);
    if (!images.length) {
      page.value = 1;
      await store.dispatch("getListOfImages", page.value);
    }
  } else {
    page.value = 1;
    await store.dispatch("getListOfImages", page.value);
  }
};
await init();
</script>
<template>
  <ul
    class="dashboard__grid"
    v-masonry
    columnWidth=".dashboard__image-wrapper"
    transition-duration="0"
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
<style scoped lang="scss">
.dashboard {
  &__grid {
    margin: 0 calc(var(--gallery-grid-gap) / -2) 0
      calc(var(--gallery-grid-gap) / -2);
  }
}
</style>
