<script setup lang="ts">
import { computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store";
import { ImageDetails, DownloadableImage } from "../../types";
import { baseUrl } from "@/config";
import DropdownPartial from "@/partials/DropdownPartial.vue";
import { ref } from "vue";

const downloadableImages = ref<DownloadableImage[]>([
  { name: "original", width: 2632, height: 3290 },
  { name: "large", width: 1920, height: 2400 },
  { name: "medium", width: 1280, height: 1600 },
  { name: "small", width: 640, height: 800 },
]);

const route = useRoute();
const router = useRouter();
const store = useStore();

const imageDetails = computed<ImageDetails>(() => store.getters.imageDetails);

const goBack = (): void => {
  router.back();
};

const createDownloadableImage = async (
  width: number,
  height: number
): Promise<string> => {
  const link = `${baseUrl}id/${imageDetails.value.id}/${width}/${height}.jpg`;
  const image = await fetch(link);
  const blob = await image.blob();

  return URL.createObjectURL(blob);
};

const init = async (): Promise<void> => {
  await store.dispatch("getImageDetails", route.params.id);
  downloadableImages.value = await Promise.all(
    downloadableImages.value.map(async (image) => ({
      blob: await createDownloadableImage(image.width, image.height),
      name: image.name,
      width: image.width,
      height: image.height,
    }))
  );
};

await init();
</script>
<template>
  <section class="details">
    <div class="details__buttons">
      <div class="details__button-wrapper details__button-wrapper--add">
        <button
          type="button"
          class="button button--secondary"
          @click="
            store.commit('setShowCreateAlbumPopup', {
              state: true,
              imageToAdd: imageDetails,
            })
          "
        >
          add to album +
        </button>
      </div>
      <div class="details__button-wrapper">
        <DropdownPartial title="download" :items="downloadableImages">
          <template #item="{ item }">
            <a
              class="details__download"
              :href="item.blob"
              :download="`${imageDetails.author}(${item.width} x ${item.height})`"
            >
              <h3 class="details__download-name">{{ `${item.name}` }}</h3>
              <p class="details__download-dimension">
                {{ `${item.width} x ${item.height}` }}
              </p>
            </a>
          </template>
        </DropdownPartial>
      </div>
    </div>
    <div class="details__image-wrapper">
      <img
        :src="`${baseUrl}id/${route.params.id}/480/600`"
        :alt="imageDetails.author"
        class="details__image"
      />
    </div>
    <p class="details__upload-by">uploaded by</p>
    <h1 class="details__upload-author">{{ imageDetails.author }}</h1>
    <p class="details__upload-date">29th november 2021</p>
    <div class="details__button-wrapper">
      <button type="button" class="button button--secondary" @click="goBack">
        go back
      </button>
    </div>
  </section>
</template>
<style scoped lang="scss">
.details,
.details__buttons,
.details__download {
  display: flex;
}
.details__image-wrapper,
.details__upload-date {
  margin-bottom: 30px;
}
.details__upload-by,
.details__upload-date {
  font-size: var(--paragraph-1);
}
.details__upload-by,
.details__upload-date {
  line-height: toRem(18);
}
.details,
.details__download {
  flex-direction: column;
}
.details__upload-date,
.details__download-name,
.details__download-dimension {
  color: var(--color-grey);
}
.details {
  padding: toRem(70) 0 toRem(116) 0;
  align-items: center;
  &__button-wrapper {
    width: toRem(140);
    &--add {
      width: toRem(160);
      margin-right: toRem(16);
    }
  }
  &__image-wrapper {
    margin-top: toRem(30);
  }
  &__upload {
    &-by {
      font-family: var(--font-ldb);
      text-transform: uppercase;
    }
    &-author {
      letter-spacing: toRem(0.64);
      margin: toRem(4) 0;
      font-size: var(--heading-2);
      line-height: toRem(40);
    }
  }
  &__download {
    line-height: toRem(20);
    &:hover {
      .details__download-name,
      .details__download-dimension {
        color: var(--color-black);
      }
    }
    &-name {
      text-transform: uppercase;
      font-family: var(--font-ldeb);
      font-size: var(--heading-7);
    }
  }
}
</style>
