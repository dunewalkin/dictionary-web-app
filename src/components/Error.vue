<template>
   <section class='error-container'>
      <div class='error-wrapper'>
         <h1 class='emoji-error'>😕</h1>
         <h3 class='error-title'>No Definitions Found</h3>
         <p>Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at a later time or head to the web instead.</p>
      </div>
    </section>
</template>

<style scoped lang="scss">
   .error-container,
   .error-wrapper {
      @include width-height(100%, 100%);
      @include flexbox(column, center, center, 0);
   }

   .error-container p {  
         text-align: center;
   }

   .error-title {
      margin-top: 2.75rem;
      margin-bottom: 1.5rem;
      font-weight: 700;

      @include mq (small) {
         margin-block: 1rem;
      }
   }
</style>