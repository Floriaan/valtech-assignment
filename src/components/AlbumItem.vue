<script setup lang="ts">
import { computed, defineProps } from "vue";
import { Album } from "../types/index";

interface AlbumProps {
  album: Album;
  selectedAlbums: Album[];
  toggleSelection(album: Album, type: "select" | "deselect"): void;
}

const props = defineProps<AlbumProps>();

const isSelected = computed<boolean>(() =>
  props.selectedAlbums.some(({ id }) => id === props.album.id)
);
</script>
<template>
  <li class="popup__album" :class="{ 'popup__album--selected': isSelected }">
    <a
      class="popup__album-toggler"
      @click="
        !isSelected
          ? toggleSelection(album, 'select')
          : toggleSelection(album, 'deselect')
      "
    >
      <span class="popup__album-icon"></span>
      <span class="popup__album-title">{{ album.title }}</span>
    </a>
  </li>
</template>
<style scoped lang="scss">
.popup__album {
  margin-bottom: toRem(25);
  &-icon {
    width: toRem(10);
    height: toRem(7.2);
    background: url("../assets/icons/Icon\ \(Checkmark\).svg") no-repeat center;
    background-size: contain;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  &-title {
    font-size: var(--heading-4);
    color: var(--color-grey);
    line-height: toRem(25);
    letter-spacing: toRem(0.4);
    text-align: center;
    transition: transform 0.5s ease;
  }
  &--selected {
    .popup__album-icon {
      opacity: 1;
    }
    .popup__album-title {
      transform: translateX(toRem(10));
      color: var(--color-black);
    }
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
