<script setup lang="ts">
import { ref, defineProps } from "vue";

const showDropdown = ref<boolean>(false);

interface DropdownProps {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
}
defineProps<DropdownProps>();

const toggleDropdown = (): void => {
  showDropdown.value = !showDropdown.value;
};
const hideDropdown = (): void => {
  showDropdown.value = false;
};
</script>
<template>
  <div class="dropdown-wrapper" v-click-away="hideDropdown">
    <button
      type="button"
      @click="toggleDropdown"
      @keydown.space.exact.prevent="toggleDropdown"
      @keydown.esc.exact="hideDropdown"
      @keydown.shift.tab="hideDropdown"
      class="button button--default--non-active"
    >
      {{ title }}
    </button>
    <Transition name="dropdown__fade">
      <ul class="dropdown" v-show="showDropdown">
        <li
          class="dropdown__item"
          v-for="(item, i) in items"
          :key="i"
          @keydown.esc.exact="hideDropdown"
        >
          <slot name="item" :item="item"></slot>
        </li>
        <li class="dropdown__message" v-if="!items.length">
          <p>No items.</p>
        </li>
      </ul>
    </Transition>
  </div>
</template>
<style scoped lang="scss">
.dropdown-wrapper,
.dropdown {
  width: 100%;
}
.dropdown-wrapper {
  position: relative;
  .dropdown {
    position: absolute;
    transform: translateY(toRem(20));
    top: 100%;
    z-index: 99;
    padding: toRem(25) toRem(20) 0 toRem(20);
    margin-bottom: toRem(25);
    background-color: var(--bg-white);
    border: toRem(2) solid var(--border-color-black);
    box-shadow: 0 toRem(3) toRem(6) var(--shadow-color-1);
    display: flex;
    flex-direction: column;
    align-items: center;
    &__item {
      padding: toRem(2) 0;
    }
    &__item,
    &__message {
      text-align: center;
      font-size: var(--paragraph-1);
      color: var(--color-grey);
      margin-bottom: toRem(23);
      display: inline-block;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__fade-enter-active,
    &__fade-leave-active {
      transition: all 0.2s ease;
    }
    &__fade-enter-from,
    &__fade-leave-to {
      opacity: 0;
      transform: translateY(toRem(10));
    }
    &__fade-enter-to {
      opacity: 1;
      transform: translateY(toRem(20));
    }
  }
}
</style>
