<script setup lang="ts">
   import { watch, onMounted, nextTick } from "vue";
   import { useRoute } from "vue-router";
   import { useWordStore } from "../stores/wordStore";
   import Header from "../components/Header.vue";
   import Search from "../components/Search.vue";
   import Info from "../components/Info.vue";
   import Error from "../components/Error.vue";

   const route = useRoute();
   const wordStore = useWordStore();

   const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

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

   watch(() => wordStore.wordData, async (newData) => {
      if (newData) {
         await nextTick(); 
         scrollToTop();
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
      <Transition name="fade" mode="out-in">
         <Info v-if="wordStore.isLoaded" :wordData="wordStore.wordData"/>
      </Transition>
      <Transition name="fade" mode="out-in">
         <Error v-if="wordStore.error" />
      </Transition>    
   </main>
</template>

<style scoped>
   .fade-enter-active, .fade-leave-active {
      transition: opacity 0.5s ease;
   }
   .fade-enter-from, .fade-leave-to {
      opacity: 0;
   }
</style>

