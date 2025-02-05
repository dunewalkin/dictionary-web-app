<script setup lang="ts">
import { watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useWordStore } from "../stores/wordStore";
import Header from "../components/Header.vue";
import Search from "../components/Search.vue";
import Info from "../components/Info.vue";
import Error from "../components/Error.vue";

const route = useRoute();
const wordStore = useWordStore();

onMounted(() => {
  if (route.params.word) {
    wordStore.word = route.params.word as string;
    wordStore.fetchDefinition();
  }
});

watch(() => route.params.word, (newWord) => {
  if (newWord) {
    wordStore.word = newWord as string;
    wordStore.fetchDefinition();
  }
});

</script>

<template>
  <main class="main-container">
    <Header />
    <Search
      :word="wordStore.word"
      @update-word="wordStore.updateWord"
      @fetchDefinition="wordStore.fetchDefinition"
    />
    <Info
      :wordData="wordStore.wordData"
    />
    <Error v-if="wordStore.error" />
  </main>
</template>





<!-- <script lang="ts" setup>
   import { computed, ref, watch } from "vue";
   import { useRoute, useRouter, RouteLocationNormalized } from "vue-router";
   import Header from '../components/Header.vue';
   import Search from '../components/Search.vue';
   import Info from "../components/Info.vue";
   import Error from "../components/Error.vue";

   const route = useRoute();
   const router = useRouter();

   const wordData = ref<Record<string, any>>({});
   const word = ref<string>(route.params.word as string || ""); 
   const error = ref<boolean>(false); 

   const updateWord = (newWord: string) => {
      word.value = newWord;
   };

   const fetchDefinition = async (): Promise<void> => {
      if (!word.value) {
         console.log('Word is empty');
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
         error.value = false;

         router.push({ name: "WordDetails", params: { word: word.value } });
      } catch (err) {
         error.value = true;
         wordData.value = {};
      }
   };

   const fetchSynonym = (synonym: string): void => {
      word.value = synonym;
      fetchDefinition();
      scrollToTop();
   };

   const fetchAntonym = (antonym: string): void => {
      word.value = antonym;
      fetchDefinition();
      scrollToTop();
   };

   const scrollToTop = (): void => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth', 
      });
   };

   watch(
      () => route.params.word as string | undefined, 
      (newWord: string | undefined) => { 
         if (newWord) { 
            word.value = newWord;
            fetchDefinition();
         }
      },
      { immediate: true }
   );

 </script>

<template>
   <main class="main-container">
       <Header />
       <Search
          :word="word"
          @update-word="updateWord"
          @fetchDefinition="fetchDefinition"  
       />
       <Info 
          :wordData="wordData"
          :fetchSynonym="fetchSynonym"
          :fetchAntonym="fetchAntonym"
       />
       <Error v-if="error" />
   </main>
 </template>
  -->


<!-- <template>
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

 
<script lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter, RouteLocationNormalized } from "vue-router";
import Header from '../components/Header.vue';
import Search from '../components/Search.vue';
import Info from "../components/Info.vue";
import Error from "../components/Error.vue";

interface Meaning {
   partOfSpeech: string;
   definitions: Array<{ definition: string }>;
}

interface WordData {
   word: string;
   // meanings: Meaning[];
}

export default {
   components: { Header, Search, Info, Error },
   setup() {
   const route = useRoute();
   const router = useRouter();

   const wordData = ref<WordData | null>(null); 
   const word = ref<string>(route.params.word as string || ""); 
   const meanings = ref<Meaning[]>([]); 
   const error = ref<boolean>(false); 

   const updateWord = (newWord: string) => {
      word.value = newWord;
   };

   const fetchDefinition = async (): Promise<void> => {
      if (!word.value) {
         console.log('Word is empty');
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

   const fetchSynonym = (synonym: string): void => {
      word.value = synonym;
      fetchDefinition();
      scrollToTop();
   };

   const fetchAntonym = (antonym: string): void => {
      word.value = antonym;
      fetchDefinition();
      scrollToTop();
   };

   const scrollToTop = (): void => {
      window.scrollTo({
         top: 0,
         behavior: 'smooth', 
      });
   };

   watch(
      () => route.params.word as string | undefined, 
      (newWord: string | undefined) => { 
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
   };
   }
};
</script>
  -->


<!-- <script>
   import { ref, watch } from "vue";
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

         const updateWord = (newWord) => {
            word.value = newWord;
         };
      
         const fetchDefinition = async () => {
            if (!word.value) {
               console.log('Word is empty');
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
</script> -->