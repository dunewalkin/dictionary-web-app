<script setup lang="ts">
   import { useWordStore } from "../stores/wordStore";
   import { storeToRefs } from "pinia";
   import AudioButton from './AudioButton.vue';

   const wordStore = useWordStore();
   const { wordData } = storeToRefs(wordStore);
</script>

<template>
   <header class="main-info">
         <div class="word-info" v-if="wordData">
            <h1>{{ wordData.word}}</h1>
            <h2 class="word-phonetic">{{ wordData.phonetic }}</h2>
         </div>
         <div class="audio">
            <AudioButton />
         </div>
      </header>
</template>

<style lang="scss">
   .main-info {
      @include flexbox(row, space-between, center, 0);
   }

   .word-info {
      @include flexbox(column, center, flex-start, 0.5rem);
   }

   .word-phonetic {
      color: var(--clr-neutral-1);
      font-weight: 400;
   }
</style>