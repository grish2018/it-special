<template>
    <div
    class="v-input"
    :class="{'focused': isFocused || !!value}">
      <label
      :for="id"
      class="v-input__label">
          {{label}}
      </label>
      <textarea
      :id="id"
      :value="value"
      @input="inputHandler"
      @focus="focusHandler"
      @blur="blurHandler"
      ref="inputRef"
      />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'VTextarea',
    props:{
        type: {
            type: String,
            default: 'text'
        },
        value: {
            type: [String, Number],
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        id: {
          type: String,
          default: ''
        },
        name: {
          type: String,
          default: ''
        }
    },
    emits:['update:value', 'blur', 'input', 'focus'],
    setup(props, {emit}) {    
        const isFocused = ref(false)
        const focusHandler = () => {
            emit('focus')
            isFocused.value = true
        }
        const blurHandler = () => {
            emit('blur')
            if(!props.value) isFocused.value = false
        }
        const inputHandler = (event:Event) => {
            let target = event.target as HTMLInputElement;
            emit('input', target.value)
            emit('update:value', target.value)
        }
        return{
            isFocused,
            blurHandler,
            focusHandler,
            inputHandler,
        }
    },
})
</script>


<style lang="scss" scoped>

$transition-duration: .2s;
$transition-timing-function: ease-in-out;
@mixin transition($p) {
  transition-property: $p;
  transition-duration: $transition-duration;
  transition-timing-function: $transition-timing-function;
}

.v-input{
    background-color: #f6f6f6;
    margin-top: 20px;
    width: 500px;
    position: relative;
    height: 152px;
    border-radius: 5px;
    @include transition(background-color);
    &__label{
        font-size: 1.4rem;
        letter-spacing: .009375em;
        position: absolute;
        color: gray;
        top: 1rem;
        left: 1.1rem;
        z-index: 1;
        font-weight: 400;
        @include transition((font-size, line-height, top));
    }
    & textarea{
        background: transparent;
        padding: 1.8rem 1rem .8rem;
        width: 100%;
        height: 100%;
        color: black;
        font-weight: 400;
        font-size: 1.4rem;
        outline: none;
        border: none;
        border-radius: inherit;
        mask-image: linear-gradient(to bottom, transparent, transparent 25px, black 40px);
    }
}
.focused{
    background-color: #dbdbdb;
    .v-input__label{
        font-size: 1rem;
        top: .5rem;
    }
}
</style>

  