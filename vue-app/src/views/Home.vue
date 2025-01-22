<template>
  <main class="main-container">
      <Header />
      <Search
         :word="word"
         @update-word="updateWord"
         @fetchDefinition="fetchDefinition"  
      />
      <Info 
         v-if="!error && meanings.length"
         :wordData="wordData"
         :meanings="meanings"
         :fetchSynonym="fetchSynonym"
         :fetchAntonym="fetchAntonym"
      />
      <Error v-if="error" />
  </main>
</template>

<script>
   import { useStore } from "vuex";
   import { computed ,ref, watch } from "vue";
   import { useRoute, useRouter } from "vue-router";
   import Header from '../components/Header.vue';
   import Search from '../components/Search.vue';
   import Info from "../components/Info.vue";
   import Error from "../components/Error.vue";

   export default {
      components: { Header, Search, Info, Error },
      setup() {
         const store = useStore(); 
         const route = useRoute();
         const router = useRouter();
      
         const word = computed(() => route.params.word || ''); 
         const wordData = computed(() => store.getters.wordData); 
         const meanings = computed(() => store.getters.meanings); 
         const error = computed(() => store.getters.error); 

         const fetchDefinition = () => {
            store.dispatch('fetchDefinition', { word: word.value, router });
         };

         const updateWord = (newWord) => {
            store.dispatch('fetchDefinition', { word: newWord, router });
         };

         const fetchSynonym = (synonym) => {
            store.dispatch('fetchDefinition', { word: synonym, router });
         };

         const fetchAntonym = (antonym) => {
            store.dispatch('fetchDefinition', { word: antonym, router });
         };

         watch(
         () => route.params.word,
         (newWord) => {
            if (newWord) {
               fetchDefinition(newWord);
            }
         },
         { immediate: true }
      );


         return {
            word,
            wordData,
            meanings,
            error,
            fetchDefinition,
            updateWord,
            fetchSynonym,
            fetchAntonym,
         };
      }
   }
</script>

