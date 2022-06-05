<script setup lang="ts">
import { useStore } from "@/store";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { LoginData } from "../types";

const loginData = reactive<LoginData>({ username: "", password: "" });
const usernameHasError = ref<boolean>(false);
const passwordHasError = ref<boolean>(false);
const usernameErrorPlaceholder = ref<string>("");
const passwordErrorPlaceholder = ref<string>("");
const router = useRouter();
const store = useStore();

watch(
  loginData,
  ({ username: newValueUsername, password: newValuePassword }: LoginData) => {
    if (newValueUsername) {
      usernameHasError.value = false;
      usernameErrorPlaceholder.value = "";
    }
    if (newValuePassword) {
      passwordHasError.value = false;
      passwordErrorPlaceholder.value = "";
    }
  },
  { deep: true }
);

const login = () => {
  const { username, password } = loginData;
  if (!username) {
    usernameHasError.value = true;
    usernameErrorPlaceholder.value = "Username must not be empty.";
  } else {
    usernameHasError.value = false;
    usernameErrorPlaceholder.value = "";
  }
  if (!password) {
    passwordHasError.value = true;
    passwordErrorPlaceholder.value = "Password must not be empty.";
  } else {
    passwordHasError.value = false;
    passwordErrorPlaceholder.value = "";
  }

  if (!usernameHasError.value && !passwordHasError.value) {
    localStorage.setItem("token", "token");
    router.push({ name: "Dashboard" });
    store.commit("setIsLogged", true);
  }
};
</script>
<template>
  <div class="login">
    <form
      @submit.prevent="!usernameHasError && !passwordHasError ? login() : null"
      class="login__panel"
    >
      <div class="login__titles">
        <h1 class="login__title">Join our stock community!</h1>
        <h2 class="login__sub-title">
          Download free photos and videos powered by the best photographers.
        </h2>
      </div>
      <div class="login__input-wrapper">
        <label class="login__label" for="username" title="username"
          >username</label
        >
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username here . . ."
          v-model="loginData.username"
          class="login__input"
          :class="{ 'login__input--error': usernameHasError }"
        />
        <div class="login__error-msg" v-if="usernameHasError">
          {{ usernameErrorPlaceholder }}
        </div>
      </div>
      <div class="login__input-wrapper">
        <label class="login__label" for="password" title="password"
          >password</label
        >
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password here . . ."
          v-model="loginData.password"
          class="login__input"
          :class="{ 'login__input--error': passwordHasError }"
        />
        <div class="login__error-msg" v-if="passwordHasError">
          {{ passwordErrorPlaceholder }}
        </div>
      </div>
      <div class="login__submit">
        <button
          type="submit"
          class="button button--default"
          :disabled="usernameHasError || passwordHasError"
        >
          log in
        </button>
      </div>
    </form>
    <footer class="login__footer">
      <div class="login__vector">
        <img
          src="../assets/icons/Vector.svg"
          alt="Digital Camera"
          class="login__vector-img"
        />
      </div>
    </footer>
  </div>
</template>
<style scoped lang="scss">
.login,
.login__footer,
.login__input-wrapper {
  display: flex;
}
.login,
.login__input-wrapper {
  flex-direction: column;
}
.login__title,
.login__label {
  font-family: var(--font-ldeb);
}
.login,
.login__input-wrapper {
  position: relative;
}
.login__input,
.login__footer {
  width: 100%;
}
.login__titles,
.login__error-msg {
  text-align: center;
}
.login__label,
.login__input {
  font-size: var(--heading-6);
}
.login {
  justify-content: space-between;
  &__panel {
    margin: toRem(100) auto toRem(291) auto;
  }
  &__titles {
    line-height: toRem(40);
    margin-bottom: toRem(40);
  }
  &__title {
    font-size: var(--heading-1);
    letter-spacing: toRem(-2.2);
  }
  &__sub-title {
    font-size: var(--heading-3);
    letter-spacing: toRem(0.44);
  }
  &__input-wrapper {
    align-items: center;
    margin-bottom: toRem(40);
  }
  &__label {
    margin-bottom: toRem(7);
    text-transform: uppercase;
    line-height: toRem(18);
  }
  &__input {
    max-width: toRem(327);
    padding: toRem(14) toRem(16);
    border: 2px solid var(--border-color-black);
    letter-spacing: toRem(0.32);
    line-height: toRem(20);
    &::placeholder {
      color: var(--color-grey);
    }
    &--error {
      border-color: var(--border-color-red);
    }
  }
  &__error-msg {
    position: absolute;
    bottom: toRem(-24);
    font-size: var(--paragraph-2);
  }
  &__submit {
    width: 140px;
    margin: auto;
  }
  &__footer {
    height: toRem(250);
    background-color: var(--bg-black);
    align-items: flex-end;
    justify-content: center;
    padding-bottom: toRem(17.25);
  }
}
.login__input--error,
.login__input--error::placeholder,
.login__error-msg {
  color: var(--color-red);
}
</style>
