import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useWordStore = defineStore("wordStore", () => {
   const wordData = ref<Record<string, any> | null>(null);
   const word = ref<string>("");
   const error = ref<boolean>(false);
   const router = useRouter();

   const fetchDefinition = async (newWord?: string): Promise<void> => {
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

         router.push({ name: "WordDetails", params: { word: searchWord } });
      } catch (err) {
         error.value = true;
         wordData.value = null;
      }
   };

   const updateWord = (newWord: string) => {
      word.value = newWord;
   };

   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   const fetchSynonym = (synonym: string) => {
      fetchDefinition(synonym);
      scrollToTop();
   };

   const fetchAntonym = (antonym: string) => {
      fetchDefinition(antonym);
      scrollToTop();
   };

   return { 
      wordData,
      word,
      error, 
      fetchDefinition, 
      updateWord,
      fetchSynonym,
      fetchAntonym,
   };
});


// import { defineStore } from "pinia";
// import { ref } from "vue";
// import { useRouter } from "vue-router";

// export const useWordStore = defineStore("wordStore", () => {
//    const wordData = ref<Record<string, any> | null>(null);
//    const word = ref<string>("");
//    const error = ref<boolean>(false);
//    const router = useRouter();

//    const fetchDefinition = async (): Promise<void> => {
//       if (!word.value) {
//          console.log("Word is empty");
//          error.value = true;
//          return;
//       }

//       try {
//          const response = await fetch(
//          `https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`
//          );
//          if (!response.ok) {
//          throw new Error("Word not found");
//          }
//          const data = await response.json();
//          wordData.value = data[0];
//          error.value = false;

//          router.push({ name: "WordDetails", params: { word: word.value } });
//       } catch (err) {
//          error.value = true;
//          wordData.value = null;
//       }
//    };

//    const updateWord = (newWord: string) => {
//       word.value = newWord;
//    };

//    const scrollToTop = () => {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//    };

//    return { 
//       wordData,
//       word,
//       error, 
//       fetchDefinition, 
//       updateWord,
//    };
// });


