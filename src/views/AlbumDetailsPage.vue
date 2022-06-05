<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../store";
import { Album, ImageDetails } from "../types";
import AlbumTitleInput from "../components/AlbumTitleInput.vue";
import ImageItem from "../components/AlbumDetails/ImageItem.vue";
import moment from "moment";

const albumTitle = ref<string>("");
const imagesToRemove = ref<ImageDetails[]>([]);
const showAddAlbumButton = ref<boolean>(false);
const showAddAlbumExistsMsg = ref<boolean>(false);

const route = useRoute();
const router = useRouter();
const store = useStore();

const albums = computed<Album[]>(() => store.getters.albums);
const albumDetails = computed<Album>(
  () => albums.value.find((album) => album.id === route.params.id) as Album
);
const hasImages = computed<boolean>(() =>
  albumDetails.value.images.length ? true : false
);

const preloadTitle = (): void => {
  albumTitle.value = albumDetails.value.title;
};
preloadTitle();

watch(
  () => route.params.id,
  () => {
    if (route.name === "AlbumDetails") {
      preloadTitle();
    }
  }
);
watch(albumTitle, (newValue) => {
  if (newValue.length) {
    if (newValue === albumDetails.value.title) {
      showAddAlbumButton.value = false;
      showAddAlbumExistsMsg.value = false;
    } else if (albumExists(newValue)) {
      showAddAlbumButton.value = false;
      showAddAlbumExistsMsg.value = true;
    } else {
      showAddAlbumButton.value = true;
      showAddAlbumExistsMsg.value = false;
    }
  } else {
    showAddAlbumButton.value = false;
    showAddAlbumExistsMsg.value = false;
  }
});

const albumExists = (title: string): boolean => {
  return albums.value.some((album) => album.title === title);
};

const goBack = (): void => {
  router.back();
};

const toggleImageToRemove = (image: ImageDetails): void => {
  const imageIndex = imagesToRemove.value.findIndex(
    ({ id }) => id === image.id
  );
  if (imageIndex === -1) {
    imagesToRemove.value = [...imagesToRemove.value, image];
  } else {
    imagesToRemove.value.splice(imageIndex, 1);
  }
};

const resetTitleStates = (): void => {
  showAddAlbumButton.value = false;
  showAddAlbumExistsMsg.value = false;
};

const saveTitle = (): void => {
  store.commit("updateAlbum", {
    id: albumDetails.value.id,
    field: "title",
    value: albumTitle.value,
  });
  store.commit("setMessagePopup", {
    message: "Album title has been updated",
    state: true,
  });
  resetTitleStates();
};

const saveChanges = (): void => {
  if (imagesToRemove.value.length) {
    imagesToRemove.value.forEach((image: ImageDetails) => {
      store.commit("deleteImageFromAlbum", {
        albumId: albumDetails.value.id,
        image: image,
      });
    });
    store.commit("setMessagePopup", {
      message: "Album has been updated",
      state: true,
    });
  }
};
</script>
<template>
  <div class="album-details">
    <div class="album-details__input">
      <AlbumTitleInput
        v-model.trim="albumTitle"
        @submit="saveTitle"
        submitButtonPos="top"
        :showSubmitButton="showAddAlbumButton"
        :hasError="showAddAlbumExistsMsg"
      />
    </div>
    <p class="album-details__date">
      Date created:
      <span>{{ moment(albumDetails.createdAt).format("Do MMMM YYYY") }}</span>
    </p>
    <template v-if="hasImages">
      <ul class="album-details__grid">
        <ImageItem
          v-for="image in albumDetails.images"
          :key="image.id"
          :image="image"
          :toggleImageToRemove="toggleImageToRemove"
          :imagesToRemove="imagesToRemove"
        />
      </ul>
      <div class="album-details__buttons">
        <div class="album-details__button">
          <button type="button" class="button button--default" @click="goBack">
            Go Back
          </button>
        </div>
        <div class="album-details__button">
          <button
            type="button"
            class="button button--secondary"
            @click="saveChanges"
          >
            Save
          </button>
        </div>
      </div>
    </template>
    <h1 class="album-details__empty" v-else>This Album has no images</h1>
  </div>
</template>
<style scoped lang="scss">
.album-details,
.album-details__buttons {
  display: flex;
}
.album-details {
  padding: toRem(67) 0 toRem(118) 0;
  max-width: toRem(678);
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  &__date {
    color: var(--color-grey);
    font-size: var(--paragraph-1);
    margin: toRem(10) 0 toRem(25) 0;
  }
  &__grid {
    max-width: toRem(642);
    width: 100%;
    display: grid;
    gap: var(--gallery-grid-gap);
    grid-template-columns: repeat(3, 1fr);
  }
  &__buttons {
    margin-top: toRem(70);
  }
  &__button {
    width: toRem(140);
    margin-right: toRem(16);
  }
  &__empty {
    font-size: var(--heading-1);
  }
}
</style>
