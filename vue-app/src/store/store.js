// store.js
import { createStore } from 'vuex';

const store = createStore({
   state: {
      wordData: null, 
      meanings: [],
      error: false,
   },
   mutations: {
      setWordData(state, payload) {
         state.wordData = payload; 
      },
      setMeanings(state, meanings) {
         state.meanings = meanings;
       },
      setError(state, isError) {
         state.error = isError;
      }
   },
   actions: {
      async fetchDefinition({ commit }, {word, router}) {
         try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
         if (!response.ok) {
            throw new Error('Word not found');
         }
         const data = await response.json();
         commit('setWordData', data[0]); 
         commit('setMeanings', data[0].meanings);
         commit('setError', false);

         router.push({ name: 'WordDetails', params: { word } });
         } catch (error) {
         console.error(error);
         commit('setWordData', null); 
         commit('setMeanings', []);
         commit('setError', true)
         }
      },
   },
   getters: {
      wordData: (state) => state.wordData, 
      meanings: (state) => state.meanings,
      error: (state) => state.error,
   },
});


export default store; 