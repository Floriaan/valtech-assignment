<script setup lang="ts">
import { computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store";
import { ImageDetails } from "../../types";
import { baseUrl } from "@/config";

const route = useRoute();
const router = useRouter();
const store = useStore();

const goBack = (): void => {
  router.back();
};

await store.dispatch("getImageDetails", route.params.id);

const imageDetails = computed<ImageDetails>(() => store.getters.imageDetails);
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
        <button type="button" class="button button--default--non-active">
          download
        </button>
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
.details__buttons {
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
.details {
  padding: toRem(70) 0 toRem(116) 0;
  flex-direction: column;
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
    &-date {
      color: var(--color-grey);
    }
  }
}
</style>
