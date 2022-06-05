<script setup lang="ts">
import { computed } from "vue";
import HeaderPartial from "./partials/HeaderPartial.vue";
import AlbumPopup from "./components/AlbumPopup.vue";
import { useStore } from "./store";
import MessagePartial from "./partials/MessagePartial.vue";
import { MessagePopup as PopupType } from "./types";

const store = useStore();

const showCreateAlbumPopup = computed<boolean>(
  () => store.getters.showCreateAlbumPopup
);
const messagePopup = computed<PopupType>(() => store.getters.messagePopup);
</script>

<template>
  <main class="wrapper">
    <HeaderPartial />
    <main class="pages">
      <router-view> </router-view>
    </main>
    <Transition name="slide">
      <AlbumPopup v-if="showCreateAlbumPopup" />
    </Transition>
    <MessagePartial
      :message="messagePopup.message"
      :state="messagePopup.state"
    />
  </main>
</template>

<style scoped lang="scss">
.wrapper {
  position: relative;
}
.pages {
  margin-top: var(--header-height);
}
.slide-enter-from,
.slide-leave-to,
.slide-enter-to {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
.slide-enter-to {
  transform: translateX(0);
}
</style>
