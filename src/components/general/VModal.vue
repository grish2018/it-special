<template>
    <div class="modal" v-if="isVisible">
      <div class="modal__content">
        <h2>{{title}}</h2>
        <slot></slot>
        <button @click="$emit('close')" class="modal__close-button">Закрыть</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'VModal',
    props: {
      isVisible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      }
    },
  });
  </script>
  
  <style scoped lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    &__content {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }
    &__close-button {
      margin-top: 10px;
      padding: 5px 10px;
      border: none;
      background-color: #ccc;
      border-radius: 3px;
      cursor: pointer;
    }
  }
  </style>
  