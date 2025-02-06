<script setup lang="ts">
   import { ref, watch } from "vue";

   const props = defineProps<{
      word: string;
   }>();

   const localWord = ref(props.word);

   watch(() => props.word, (newVal) => {
      localWord.value = newVal;
   });

   const emit = defineEmits<{
      (event: "update-word", value: string): void;
      (event: "fetch-definition"): void;
   }>();

   const onSubmit = () => {
      emit("update-word", localWord.value);
      emit("fetch-definition");
   };
</script>

<template>
   <div class="search-container">
      <form class="search-form" @submit.prevent="onSubmit">
         <input 
            class="search-input" 
            v-model="localWord" 
            placeholder="Search for any word…" 
         />
         <button class="search-btn" type="submit"></button>
      </form>   
   </div>
</template>

<style scoped lang="scss">

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
   background: url(./icons/icon-search.svg);
   background-repeat: no-repeat;
   background-position: center center;
   transform: translateY(-50%);
}

.empty-error {
   margin-top: 0.5rem;
   color: var(--clr-error);
}
</style>
 

