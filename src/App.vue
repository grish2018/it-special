<template>
  <div id="app">
    <h1>
      Task1
    </h1>
    <user-list />

    <h1>
      Task2
    </h1>
    <v-textarea
    id="signinName"
    label="Cool label"
    v-model:value="appCode"/>    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import UserList from '@/components/user/UserList.vue';
import VTextarea from '@/components/general/ui/VTextarea.vue';
import { useUserComposable } from "@/store/user/useUserComposable";


export default defineComponent({
  name: 'App',
  components: {
    UserList,
    VTextarea
  },
  setup() {
      useUserComposable();
      const appCode = ref('')
     
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
