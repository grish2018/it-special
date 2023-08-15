<template>
  <div id="app">
    <h1>
      Task1
    </h1>
    <UserList />

    <h1>
      Task2
    </h1>
    <VTextarea
    id="signinName"
    label="test"
    readonly
    v-model:value="appCode"/>    
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide, ref } from 'vue';
import UserList from '@/components/user/UserList.vue';
import VTextarea from '@/components/general/ui/VTextarea.vue';
import { useUserStore } from '@/stores/user';

export default defineComponent({
  name: 'App',
  components: {
    UserList,
    VTextarea
  },
  setup() {
      const userStore = useUserStore();
      const users = computed(() => userStore.users); 
      const appCode = ref('')
      provide('users', users)

      return {
        appCode
      }
    },
});
</script>

<style lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
}
</style>
