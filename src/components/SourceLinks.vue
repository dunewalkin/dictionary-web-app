<script setup lang="ts">
   import { useWordStore } from "../stores/wordStore";
   import { storeToRefs } from "pinia";

   const wordStore = useWordStore();
   const { wordData } = storeToRefs(wordStore);
</script>

<template>
   <footer class="source-container">
      <h4 class='body-s source-title'>Source</h4>
      <div class="source-links" v-if="wordData">
         <a v-for="(sourceUrl, index) in wordData.sourceUrls"
            :href="sourceUrl || '#'"
            class="body-s source-item"
            target="_blank"
            rel="noopener noreferrer">
            {{ sourceUrl }}

            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="none" stroke="#838383" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"/></svg>
         </a>
      </div>
   </footer> 
</template>

<style lang="scss">
   .source-container {
      border-top: 1px solid var(--clr-neutral-2);
      margin-top: 2.5rem;
      padding-block: 1.19rem;
      @include flexbox(row, flex-start, flex-start, 0);

      @include mq (small) {
         margin-top: 2rem;
         padding-block: 1.5rem;
         @include flexbox(column, flex-start, flex-start, 0);
      }
   }

   .source-item {
      @include flexbox(row, flex-start, center, 0.5rem);
   }

   .source-title {
      margin-right: 1.25rem;
      color: var(--clr-neutral-2);
   }
</style>