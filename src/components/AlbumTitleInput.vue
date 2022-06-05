<script setup lang="ts">
import { PropType, defineProps, defineEmits } from "vue";

interface AlbumTitleEmit {
  (e: "submit"): void;
  (e: "update:modelValue", value: string): void;
}
defineProps({
  modelValue: {
    required: true,
    type: String as PropType<string>,
  },
  showSubmitButton: {
    required: true,
    type: Boolean as PropType<boolean>,
  },
  hasError: {
    required: true,
    type: Boolean as PropType<boolean>,
  },
  submitButtonPos: {
    required: false,
    type: String as PropType<string>,
    default: "bottom",
  },
});

const emit = defineEmits<AlbumTitleEmit>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateModelValue = (target: any): void => {
  emit("update:modelValue", target.value);
};
</script>
<template>
  <form
    class="album-title__input-wrapper"
    @submit.prevent="showSubmitButton && !hasError ? $emit('submit') : null"
  >
    <input
      type="text"
      class="album-title__input"
      placeholder="Enter title here"
      :value="modelValue"
      @input="updateModelValue($event.target)"
    />
    <div
      class="album-title__add-wrapper"
      :class="`album-title__add-wrapper--${submitButtonPos}`"
    >
      <button
        type="submit"
        class="album-title__add"
        v-if="showSubmitButton"
      ></button>
      <p class="album-title__exists-msg" v-if="hasError">
        Album already exists
      </p>
    </div>
  </form>
</template>
<style scoped lang="scss">
.album-title {
  &__input-wrapper {
    position: relative;
  }
  &__input {
    font-size: var(--heading-2);
    letter-spacing: toRem(0.64);
    border: 0;
    text-align: center;
    width: 100%;
    &::placeholder {
      color: var(--color-black);
    }
  }
  &__add-wrapper {
    position: absolute;
    bottom: toRem(-27);
    width: 100%;
    display: flex;
    justify-content: center;
    &--top {
      bottom: initial;
      top: toRem(-27);
    }
  }
  &__add {
    height: toRem(20);
    width: toRem(20);
    background: url("../assets/icons/Icon\ \(Save\).svg") no-repeat center;
  }
  &__exists-msg {
    font-size: var(--paragraph-2);
  }
}
</style>
