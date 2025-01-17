<template>
   <div class="search-container">
      <form class="search-form" @submit.prevent="fetchDefinition">
         <input 
            class="search-input" 
            v-model="word" 
            placeholder="Search for any word…" 
         />
         <button class="search-btn" type="submit"></button>
      </form>     
 
     <div v-if="meanings.length">
       <h2>{{ currentWord }}</h2>
       <ul>
         <li v-for="(meaning, index) in meanings" :key="index">
           <strong></strong> {{ meaning.partOfSpeech }}
           <ul>
             <li v-for="(definition, defIndex) in meaning.definitions" :key="defIndex">
               {{ definition.definition }}
             </li>
           </ul>
           <h2>Synonyms</h2>
           <ul>
            <li v-for="(synonym, synIndex) in meaning.synonyms" :key="synIndex">
               <button @click="fetchSynonym(synonym)">{{ synonym, synonym }}</button>
               
            </li>
           </ul>
         </li>
       </ul>
     </div>
 
     <div v-if="error">{{ error }}</div>
   </div>
 </template>
 
 <script>
 import { ref, onMounted, watch } from "vue";
 import { useRoute, useRouter } from "vue-router";
 
 export default {
   setup() {
     const route = useRoute();
     const router = useRouter();
 
     const word = ref(route.params.word || ""); // Получаем слово из параметра маршрута
     const currentWord = ref("");
     const meanings = ref([]); // Хранит массив значений
     const error = ref(null);
 
     const fetchDefinition = async () => {
       if (!word.value) {
         error.value = "Please enter a word!";
         return;
       }
 
       try {
         const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`);
         if (!response.ok) {
           throw new Error("Word not found");
         }
         const data = await response.json();
         console.log(data);
         meanings.value = data[0].meanings; // Сохраняем массив значений
         currentWord.value = data[0].word;
         error.value = null;
 
         // Обновляем URL с новым словом
         router.push({ name: "WordDetails", params: { word: word.value } });
       } catch (err) {
         error.value = err.message;
         meanings.value = [];
       }
     };

     const fetchSynonym = (synonym) => {
      word.value = synonym;
      fetchDefinition();
     }
 
     // Подгрузка данных при изменении маршрута
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
       word,
       currentWord,
       meanings,
       error,
       fetchDefinition,
       fetchSynonym,
     };
   },
 };
 </script>

 <style lang="scss">

.search-container {
   position: relative;
   @include width-height (100%, 4rem);

   @include mq (small) {
      height: 3rem;
   }
}

.search-input {
   @include width-height (100%, 4rem);
   @include flexbox (row,center, center, 0);
   background-color: var(--clr-background-2);
   border-radius: 1rem;
   padding-left: 1.5rem;
   font-weight: 700;
   caret-color: var(--clr-neutral-1);
   color: var(--clr-primary-1);

   &::placeholder {
      opacity: 0.5;
   }

   &:focus {
      border: 1px solid var(--clr-neutral-1);
   }

   @include mq (small) {
      height: 3rem;
   }
}

.error-border {
   border: 1px solid var(--clr-error);
}

.search-btn {
   @include width-height (1.1rem, 1.1rem);
   @include position (absolute, 50%, 1.5rem, auto, auto);
   background: url(../components/icons/icon-search.svg);
   background-repeat: no-repeat;
   background-position: center center;
   transform: translateY(-50%);
}

.empty-error {
   margin-top: 0.5rem;
   color: var(--clr-error);
}

</style>
 