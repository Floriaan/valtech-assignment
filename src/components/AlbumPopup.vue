<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "../store";
import { v4 as uuid } from "uuid";
import { Album, ImageDetails } from "../types";
import AlbumItem from "./AlbumItem.vue";
import AlbumTitleInput from "./AlbumTitleInput.vue";

const store = useStore();
const isCreatingAlbum = ref<boolean>(true);
const albumTitle = ref<string>("");
const showAddAlbumButton = ref<boolean>(false);
const showAddAlbumExistsMsg = ref<boolean>(false);
const selectedAlbums = ref<Album[]>([]);
const deselectedAlbums = ref<Album[]>([]);
const albumPopup = ref<HTMLElement>();

// Reactive data from VUEX store.
const imageToAdd = computed<ImageDetails>(() => store.getters.imageToAdd);
const albums = computed<Album[]>(() => store.getters.albums);

onMounted(() => {
  albumPopup.value?.focus();
});

/* Preload selected albums if the selected image already exists in any album.
If not, store it inside deselected albums.
*/
const preloadSelectedAlbums = (): void => {
  albums.value.forEach((album) => {
    const isImageInAlbum = album.images.some(
      (image) => image.id === imageToAdd.value.id
    );
    if (isImageInAlbum) {
      selectedAlbums.value = [...selectedAlbums.value, album];
    } else {
      deselectedAlbums.value = [...deselectedAlbums.value, album];
    }
  });
};
if (albums.value.length) {
  preloadSelectedAlbums();
}

// Validate album title everytime it changes.
watch(albumTitle, (newValue) => {
  if (newValue.length > 0) {
    showAddAlbumButton.value = true;
    showAddAlbumExistsMsg.value = false;
  } else {
    showAddAlbumButton.value = false;
  }
  if (albumExists(newValue)) {
    showAddAlbumButton.value = false;
    showAddAlbumExistsMsg.value = true;
  } else {
    showAddAlbumExistsMsg.value = false;
  }
});

// Checks whether or not the given title exists in the album array.
const albumExists = (title: string): boolean => {
  return albums.value.some((album) => album.title === title);
};

// Create an album and add the selected image to it.
const addAlbum = (): void => {
  if (albumTitle.value && !albumExists(albumTitle.value)) {
    const id = uuid();
    const album = {
      id,
      title: albumTitle.value,
      images: [],
      createdAt: new Date().toISOString(),
    } as Album;
    store.commit("setAlbums", [...albums.value, album]);
    store.commit("addImageToAlbum", { albumId: id, image: imageToAdd.value });
    selectedAlbums.value = [...selectedAlbums.value, album];
    albumTitle.value = "";
    store.commit("setMessagePopup", { message: "Album added.", state: true });
  }
};

// Check and uncheck albums.
const toggleSelection = (album: Album, type: "select" | "deselect"): void => {
  const albumsToAddTo = type === "select" ? selectedAlbums : deselectedAlbums;
  const albumsToRemoveFrom =
    type === "select" ? deselectedAlbums : selectedAlbums;
  const albumToRemoveIndex = albumsToRemoveFrom.value.findIndex(
    ({ id }) => id === album.id
  );
  if (albumToRemoveIndex !== -1) {
    albumsToRemoveFrom.value.splice(albumToRemoveIndex, 1);
    albumsToAddTo.value = [...albumsToAddTo.value, album];
  }
};

// Close popup
const closePopup = (): void => {
  store.commit("setShowCreateAlbumPopup", { state: false });
};

// Add or delete the selected image, from the VUEX store album.
const commitAlbums = (
  array: Album[],
  commitType: "addImageToAlbum" | "deleteImageFromAlbum"
): void => {
  array.forEach((album) => {
    store.commit(commitType, {
      albumId: album.id,
      image: imageToAdd.value,
    });
  });
};
const saveImageToAlbums = (): void => {
  if (selectedAlbums.value.length) {
    commitAlbums(selectedAlbums.value, "addImageToAlbum");
  }
  if (deselectedAlbums.value.length) {
    commitAlbums(deselectedAlbums.value, "deleteImageFromAlbum");
  }
  if (selectedAlbums.value.length || deselectedAlbums.value.length) {
    store.commit("setMessagePopup", {
      message: "Albums have been updated.",
      state: true,
    });
  }
  closePopup();
};
</script>
<template>
  <div
    class="popup"
    tabindex="0"
    role="dialog"
    ref="albumPopup"
    @click.self="store.commit('setShowCreateAlbumPopup', { state: false })"
    @keydown.esc.exact="closePopup"
  >
    <form class="popup__panel" @submit.prevent="saveImageToAlbums">
      <div class="popup__actions">
        <a
          class="popup__action"
          :class="{ 'popup__action--active': isCreatingAlbum }"
          @click="isCreatingAlbum = true"
          >create new album</a
        >
        <a
          class="popup__action"
          :class="{ 'popup__action--active': !isCreatingAlbum }"
          @click="isCreatingAlbum = false"
          >add to existing</a
        >
      </div>
      <div class="popup__input" v-if="isCreatingAlbum">
        <AlbumTitleInput
          v-model.trim="albumTitle"
          :showSubmitButton="showAddAlbumButton"
          :hasError="showAddAlbumExistsMsg"
          @submit="addAlbum"
        />
      </div>
      <ul class="popup__albums" v-else>
        <template v-if="albums.length">
          <AlbumItem
            v-for="album in albums"
            :key="album.title"
            :album="album"
            :selectedAlbums="selectedAlbums"
            :toggleSelection="toggleSelection"
        /></template>
        <li v-else><p>No albums.</p></li>
      </ul>
      <div class="popup__buttons">
        <div class="popup__button">
          <button
            type="button"
            class="button button--secondary"
            @click="closePopup"
          >
            cancel
          </button>
        </div>
        <div class="popup__button">
          <button type="submit" class="button button--default">save</button>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped lang="scss">
.popup,
.popup__panel,
.popup__buttons,
.popup__actions,
:deep(.popup__album-toggler) {
  display: flex;
}
.popup,
.popup__panel,
:deep(.popup__album-toggler) {
  align-items: center;
}
.popup,
.popup__actions,
.popup__panel {
  justify-content: center;
}
.popup {
  width: 100%;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  outline: none;
  &__panel {
    width: toRem(542);
    height: toRem(463);
    background-color: var(--bg-white);
    border: toRem(4) solid var(--border-color-black);
    flex-direction: column;
    box-shadow: 0 toRem(5) toRem(20) var(--shadow-color-1);
  }
  &__actions {
    margin-bottom: toRem(29);
  }
  &__action {
    text-transform: uppercase;
    font-size: var(--heading-6);
    color: var(--color-grey);
    font-family: var(--font-ldb);
    &--active {
      color: var(--color-black);
    }
    &:first-child {
      margin-right: toRem(27);
    }
  }
  &__input {
    margin-bottom: toRem(60);
  }
  &__albums {
    margin-bottom: toRem(48);
    max-height: toRem(200);
    overflow: auto;
    padding: 0 toRem(20);
  }
  &__button {
    width: toRem(140);
    &:first-child {
      margin-right: toRem(16);
    }
  }
}
</style>
