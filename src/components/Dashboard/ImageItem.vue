<script setup lang="ts">
import { baseUrl } from "@/config";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../../store";
import { ImageDetails } from "../../types";

interface ImageItemProps {
  image: ImageDetails;
  index: number;
}

const router = useRouter();
const store = useStore();

// eslint-disable-next-line no-undef
const props = defineProps<ImageItemProps>();

const goToDetails = (): void => {
  router.push({ name: "ImageDetails", params: { id: props.image.id } });
};

const isEven = computed<boolean>(() => props.index % 2 !== 0);
</script>
<template>
  <li class="dashboard__image-wrapper">
    <div class="dashboard__image">
      <img
        :src="
          isEven
            ? `${baseUrl}id/${image.id}/416/520`
            : `${baseUrl}id/${image.id}/416/276`
        "
        :alt="image.author"
        @click="goToDetails()"
      />
      <button
        type="button"
        class="dashboard__image-button"
        @click="
          store.commit('setShowCreateAlbumPopup', {
            state: true,
            imageToAdd: image,
          })
        "
      >
        add to album
      </button>
    </div>
  </li>
</template>
<style scoped lang="scss">
.dashboard {
  &__image-wrapper {
    margin-bottom: var(--gallery-grid-gap);
    width: toRem(416);
  }
  &__image {
    cursor: pointer;
    position: relative;
    &-button {
      opacity: 0;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: toRem(63);
      background-color: var(--bg-black);
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-white);
      font-size: var(--heading-6);
      font-family: var(--font-ldeb);
      transition: all 0.4s ease-out;
    }
    &:hover {
      .dashboard__image-button {
        opacity: 1;
      }
    }
  }
}
</style>
