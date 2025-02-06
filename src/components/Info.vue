<script setup lang="ts">

   import { useWordStore } from "../stores/wordStore";
   import { storeToRefs } from "pinia";
   import MainInfo from "./MainInfo.vue";
   import MeaningsInfo from "./MeaningsInfo.vue";
   import SourceLinks from "./SourceLinks.vue";

   const wordStore = useWordStore();
   const { wordData } = storeToRefs(wordStore);

</script>


<template>
   <div class="info-wrapper" v-if="wordData">
      <MainInfo />
      <MeaningsInfo />
      <SourceLinks />
   </div>
</template>



<style scoped lang="scss">
   .info-wrapper {
      @include width-height(100%, 100%);
   }
</style>