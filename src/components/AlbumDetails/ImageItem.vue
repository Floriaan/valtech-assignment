<script setup lang="ts">
import { ImageDetails } from "../../types";
import { computed, defineProps } from "vue";
import { baseUrl } from "../../config";

interface ImageItemProps {
  image: ImageDetails;
  toggleImageToRemove(image: ImageDetails): void;
  imagesToRemove: ImageDetails[];
}

const props = defineProps<ImageItemProps>();

const isRemoved = computed<boolean>(() =>
  props.imagesToRemove.some(({ id }) => id === props.image.id)
);
</script>
<template>
  <li class="album-details__grid-item">
    <Transition name="album-details__fade">
      <div class="album-details__image-wrapper" v-if="!isRemoved">
        <img
          :src="`${baseUrl}id/${image.id}/190/190`"
          :alt="image.author"
          class="album-details__image"
        />
        <button
          type="button"
          class="album-details__remove"
          @click="toggleImageToRemove(image)"
        >
          remove
        </button>
      </div>
      <div
        class="album-details__placeholder"
        v-else
        @click="toggleImageToRemove(image)"
      ></div>
    </Transition>
  </li>
</template>
<style scoped lang="scss">
.album-details {
  &__remove {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    font-size: var(--heading-6);
    background-color: var(--button-bg-orange);
    color: var(--color-white);
    text-transform: uppercase;
    font-family: var(--font-ldeb);
    line-height: toRem(18);
    padding: toRem(6) 0;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease-out;
  }
  &__grid-item {
    position: relative;
    transition: all 0.2s ease;
    &:hover .album-details__remove {
      opacity: 1;
      pointer-events: all;
    }
  }
  &__placeholder {
    height: toRem(190);
    cursor: pointer;
    border: toRem(2) solid var(--border-color-grey);
    background: url("../../assets/icons/Icon\ \(Add\).svg") no-repeat center;
    background-size: toRem(6.87) toRem(7.01);
  }
  &__fade-enter-active,
  &__fade-leave-active {
    transition: all 0.8s cubic-bezier(0.8, 0, 0.83, 0.67);
  }
  &__fade-enter-from,
  &__fade-leave-to {
    opacity: 0;
  }
  &__fade-leave-active {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  &__fade-enter-to {
    opacity: 1;
  }
}
</style>
