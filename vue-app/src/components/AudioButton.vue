<template>
   <button class="audio-btn" @click="playAudio" :disabled="!audioUrl">
      <svg class="audio-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75">
         <g>
         <circle cx="37.5" cy="37.5" r="37.5" />
         <path d="M29 27v21l21-10.5z" />
         </g>
      </svg>
   </button>
</template>
 
<script>
   import { ref, watch } from 'vue';

   export default {
   props: {
      wordData: {
         type: Object,
         required: true,
      },
   },
   setup(props) {
      const audioUrl = ref(null);

      watch(
         () => props.wordData,
         (newData) => {
         if (newData && newData.phonetics) {
            const audioData = newData.phonetics.find((pho) => pho.audio !== '') || null;
            audioUrl.value = audioData ? audioData.audio : null;
         }
         },
         { immediate: true }
      );

      const playAudio = () => {
         if (audioUrl.value) {
         const audio = new Audio(audioUrl.value);
         audio.play().catch((err) => console.error('Ошибка воспроизведения аудио:', err));
         }
      };

      return {
         audioUrl,
         playAudio,
      };
   },
   };
</script>


<style lang="scss">
   .audio-btn {
      @include width-height(4.6875rem, 4.6875rem);
         border-radius: 50%;

      @include mq (small) {
         @include width-height(3rem, 3rem);
      }

      &:hover .audio-icon path,
      &:focus-visible .audio-icon path {
         fill: var(--clr-background-1);
         stroke: var(--clr-background-1);
         transition: .2s ease;
      }

      &:hover .audio-icon circle,
      &:focus-visible .audio-icon circle {
         fill: var(--clr-neutral-1);
         opacity: 1;
         transition: .2s ease;
      }
   }

   .audio-icon circle{
      fill: var(--clr-neutral-1);
      opacity: 0.2;
   }

   .audio-icon path {
      fill: var(--clr-neutral-1);
      stroke: var(--clr-neutral-1);
   }
</style>