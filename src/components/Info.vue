<template>
   <div class="info-wrapper">
      <MainInfo :wordData="wordData"/>
  
      <section class="meanings-info">
         <MeaningsInfo 
            :wordData="wordData"
            :meanings="meanings"
            :fetchSynonym="fetchSynonym"
            :fetchAntonym="fetchAntonym"
         />
         <SourceLinks v-if="wordData.sourceUrls && wordData.sourceUrls.length > 0" :wordData="wordData"/>
      </section>
   </div>
</template>

<script>
   import SourceLinks from "./SourceLinks.vue";
   import MainInfo from "./MainInfo.vue";
   import MeaningsInfo from "./MeaningsInfo.vue";
   
   export default {
      props: {
         wordData: {
            type: Object,
            required: true,
         },
         meanings: {
            type: Array,
            required: true,
         },
         fetchSynonym: {
            type: Function,
            required: true,
         },
         fetchAntonym: {
            type: Function,
            required: true,
         },
      },
      components: { MainInfo, MeaningsInfo, SourceLinks },
   };
</script>

<style lang="scss">
   .info-wrapper {
      @include width-height(100%, 100%);
   }
</style>