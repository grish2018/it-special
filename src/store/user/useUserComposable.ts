import { useUserStore } from "./user";
import { computed, ref, provide, Ref } from "vue";

export function useUserComposable() {
  const userStore = useUserStore();

  const users = computed(() => userStore.users);
  provide('users', users)

  const isFullNameVisible: Ref<boolean> = ref(true);
  provide('isFullNameVisible', isFullNameVisible)

  function toggleFullNameVisibility() {
    isFullNameVisible.value = !isFullNameVisible.value
  }
  provide('toggleFullNameVisibility', toggleFullNameVisibility)

  function deleteUser(userId: number) {
    userStore.deleteUser(userId);
  }
  provide('deleteUser', deleteUser)
}
