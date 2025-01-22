<template>
   <header class="main-info">
         <div class="word-info">
            <h1>{{ wordData.word}}</h1>
            <h2 class="word-phonetic">{{ wordData.phonetic }}</h2>
         </div>
         <div class="audio">
            <AudioButton :wordData="wordData"  />
         </div>
      </header>
</template>

<script>
   import AudioButton from './AudioButton.vue';

   export default {
      props: {
         wordData: {
            type: Object,
            required: true,
         },
      },
      components: {
         AudioButton,
      },
   };
</script>

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