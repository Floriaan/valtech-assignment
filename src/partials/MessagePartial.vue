<script setup lang="ts">
import { ref, watch, defineProps } from "vue";
import { useStore } from "../store";
interface MessagePopupInterface {
  message?: string;
  state: boolean;
}
const props = defineProps<MessagePopupInterface>();

const store = useStore();

const isDisplaying = ref<boolean>(false);

watch(
  () => props.state,
  (newValue) => {
    if (newValue && !isDisplaying.value) {
      setTimeout(() => {
        store.commit("setMessagePopup", {
          message: "",
          type: "default",
          state: false,
        });
        isDisplaying.value = false;
      }, 3000);
    }
  }
);
</script>
<template>
  <div
    class="message-popup"
    :class="{ 'message-popup--show': state }"
    role="dialog"
  >
    <h1 class="message-popup__message">{{ message }}</h1>
  </div>
</template>
<style scoped lang="scss">
.message-popup {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: var(--popup-message-bg);
  padding: toRem(70) 0;
  transform: translateY(100%);
  transition: all 0.3s ease;
  &--show {
    transform: translateY(0);
  }
  &__message {
    font-size: var(--heading-2);
    color: var(--color-white);
    line-height: toRem(40);
    letter-spacing: toRem(0.64);
    font-family: var(--font-ldb);
    text-align: center;
  }
}
</style>
