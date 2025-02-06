import { defineStore } from "pinia";
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";

export const useWordStore = defineStore("wordStore", () => {
   const wordData = ref<Record<string, any> | null>(null);
   const word = ref<string>("");
   const error = ref<boolean>(false);
   const isLoaded = ref<boolean>(false);
   const router = useRouter();

   const fetchDefinition = async (newWord?: string): Promise<void> => {
      isLoaded.value = false;

      const searchWord = newWord ?? word.value;
      if (!searchWord) {
         console.log("Word is empty");
         error.value = true;
         return;
      }

      try {
         const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
         );
         if (!response.ok) {
            throw new Error("Word not found");
         }
         const data = await response.json();
         wordData.value = data[0];
         word.value = searchWord;
         error.value = false;

         await nextTick();
         isLoaded.value = true;

      } catch (err) {
         error.value = true;
         wordData.value = null;
      } finally {
         router.push({ name: "WordDetails", params: { word: searchWord } });
      }
   };

   const updateWord = (newWord: string) => {
      word.value = newWord;
   };

   const fetchSynonym = (synonym: string) => {
      fetchDefinition(synonym);
   };

   const fetchAntonym = (antonym: string) => {
      fetchDefinition(antonym);
   };

   return { 
      wordData,
      word,
      error, 
      isLoaded,
      fetchDefinition, 
      updateWord,
      fetchSynonym,
      fetchAntonym,
   };
});

