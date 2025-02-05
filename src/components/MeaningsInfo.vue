<script setup lang="ts">
   import { computed } from "vue";
   import { useWordStore } from "../stores/wordStore";
   import { storeToRefs } from "pinia";

   const wordStore = useWordStore();
   const { wordData } = storeToRefs(wordStore);

   const meanings = computed(() => wordData.value?.meanings || []);
</script>


<template>
   <article v-for="(meaning, index) in meanings" :key="index">
      
      <header class='speech-container'>
         <h2>{{meaning.partOfSpeech}}</h2>
         <div class='speech-line'></div>
      </header>
      
      <h3 class='meaning-title title'>Meaning</h3>
   
      <ul>
         <li class="meaning-item" v-for="(definition, defIndex) in meaning.definitions" :key="defIndex">
            <div>
               <p class="word-definition">
                  {{ definition.definition }}
               </p>
               <p v-if="definition.example" class="word-example">
                  "{{ definition.example }}"
               </p>
            </div>  
         </li>
      </ul>
   
      <aside v-if="meaning.synonyms && meaning.synonyms.length > 0" class="synonyms-container">
         <h3 class="title">Synonyms</h3>
         <ul class="synonym-wrapper">
            <li v-for="(synonym, synIndex) in meaning.synonyms" :key="synIndex">
               <button class="synonym-item" @click="wordStore.fetchSynonym(synonym)">
                  {{ synonym }}
               </button> 
            </li>
         </ul>
      </aside>

      <aside v-if="meaning.antonyms && meaning.antonyms.length > 0" class="synonyms-container">
         <h3 class="title">Antonyms</h3>
         <ul class="synonym-wrapper">
            <li v-for="(antonym, antIndex) in meaning.antonyms" :key="antIndex">
               <button class="synonym-item" @click="wordStore.fetchAntonym(antonym)">
                  {{ antonym }}
               </button> 
            </li>
         </ul>
      </aside>

   </article>
</template>

<style lang="scss">
   .speech-container {
      padding-block: 2.5rem;
      @include flexbox(row, flex-start, center, 1.25rem);

      @include mq (small) {
         padding-block: 1.85rem;
         gap: 1rem;
      }
   }

   .speech-line {
      content: '';
      width: 100%;
      height: 1px;
      background-color: var(--clr-neutral-3);
   }

   .title {
      color: var(--clr-neutral-2);
   }

   .meaning-title {
      margin-bottom: 1.56rem;

      @include mq (small) {
         margin-bottom: 1rem;
      }
   }

   .meaning-item:not(:last-child) {
      margin-bottom: 0.81rem;
   }

   .meaning-item {
      list-style-type: none;
      @include flexbox(row, flex-start, flex-start, 1.25rem);
      margin-left: 1.25rem;

      @include mq (small) {
         margin-left: 0;
      }
   }

   .meaning-item::before {
      content: '\2022'; 
      color: var(--clr-neutral-1);
   }

   .word-example {
      margin-top: 0.81rem;
      color: var(--clr-neutral-2);
   }

   .synonyms-container {
      margin-top: 4rem;
      @include flexbox(row, flex-start, flex-start, 1.38rem);

      @include mq (small) {
         margin-top: 1.5rem;
      }
   }

   .synonym-wrapper {
      @include flexbox(row, flex-start, flex-start, 1.38rem);
      flex-wrap: wrap;
   }

   .synonym-wrapper li {
      list-style-type: none; 
   }

   .synonym-item {
      color: var(--clr-neutral-1);
      font-weight: 700;
      background-color: transparent;

      &:hover,
      &:focus-visible {
         text-decoration: underline;
      }
   }
</style>