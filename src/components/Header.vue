<script setup lang="ts">
   import Toggle from './Toggle.vue';
   import Dropdown from './Dropdown.vue';
</script>

<template>
   <header className='header-wrapper'>
      <div className='header-logo'>
         <img src="./icons/logo.svg" alt="Logo">
      </div>

      <div className="buttons-container">
            <Dropdown />
            <div className='line'></div>
            <Toggle />
      </div>    
    </header>
</template>

<style scoped lang="scss">
   .header-wrapper {
      @include flexbox(row, space-between, center, 0);
      @include width-height(100%, 2.28125rem);

      @include mq (small) {
         height: 2rem;
      }
   }

   .header-logo img {
      height: 100%;

      @include mq (small) {
         height: 2rem;
      }
   }

   .buttons-container {
      @include flexbox(row, center, center, 0);
      height: 2rem;
   }

   .line {
      width: 1px;
      height: 100%;
      background-color: var(--clr-neutral-3);
      margin-inline: 1.62rem;
      content: "";

      @include mq (small) {
         margin-inline: 1rem;
      }
   }
</style>
 