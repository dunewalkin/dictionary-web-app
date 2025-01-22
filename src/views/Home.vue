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
         const route = useRoute();
         const router = useRouter();
      
         const wordData = ref(null);
         const word = ref(route.params.word || ""); 
         const meanings = ref([]); 
         const error = ref(false);
      
         const fetchDefinition = async () => {
            if (!word.value) {
               error.value = true;
               return;
            }
      
            try {
               const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`);
               if (!response.ok) {
                  throw new Error("Word not found");
               }
               const data = await response.json();
               wordData.value = data[0]; 
               meanings.value = data[0].meanings; 
               error.value = false;
      
               router.push({ name: "WordDetails", params: { word: word.value } });
            } catch (err) {
               error.value = true;
               wordData.value = null;
               meanings.value = [];
            }
         };

         const updateWord = (newWord) => {
            word.value = newWord;
         };

         const fetchSynonym = (synonym) => {
            word.value = synonym;
            fetchDefinition();
            scrollToTop();
         };

         const fetchAntonym = (antonym) => {
            word.value = antonym;
            fetchDefinition();
            scrollToTop();
         };

         const scrollToTop = () => {
            window.scrollTo({
               top: 0,
               behavior: 'smooth', 
            });
         };
      
         watch(
            () => route.params.word,
            (newWord) => {
            if (newWord) {
               word.value = newWord;
               fetchDefinition();
            }
            },
            { immediate: true }
         );

         return {
            wordData,
            word,
            meanings,
            error,
            fetchDefinition,
            fetchSynonym,
            fetchAntonym,
            updateWord,
         }
      }
   }
</script>

