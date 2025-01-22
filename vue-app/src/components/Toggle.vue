<template>
   <div class="toggle-container">
     <button
       :class="['toggle-btn', { 'toggle-active': isDarkMode }]"
       @click="toggleMode"
       aria-label="Toggle"
     ></button>
     <svg
       :class="['moon-icon', { 'moon-icon-active': isDarkMode }]"
       xmlns="http://www.w3.org/2000/svg"
       width="22"
       height="22"
       viewBox="0 0 22 22"
     >
       <path
         fill="none"
         d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
       />
     </svg>
   </div>
 </template>
 
 <script>
 import { ref, onMounted, onUnmounted } from 'vue';
 
 export default {
   name: 'Toggle',
   setup() {
     const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
     const isDarkMode = ref(prefersDarkMode);
 
     const setIsDarkMode = (value) => {
       isDarkMode.value = value;
       localStorage.setItem('isDarkMode', value);
       document.body.setAttribute('data-theme', value ? 'dark' : 'light'); 
     };
 
     const toggleMode = () => {
       const newMode = !isDarkMode.value;
       setIsDarkMode(newMode);
     };
 
     const handleChange = (e) => {
       setIsDarkMode(e.matches);
     };
 
     onMounted(() => {
       const savedMode = localStorage.getItem('isDarkMode');
       if (savedMode !== null) {
         isDarkMode.value = JSON.parse(savedMode);
         document.body.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light');
       } else {
         document.body.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light');
       }
 
       const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
       mediaQuery.addEventListener('change', handleChange);
     });
 
     onUnmounted(() => {
       const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
       mediaQuery.removeEventListener('change', handleChange);
     });
 
     return {
       isDarkMode,
       toggleMode,
     };
   },
 };
 </script>

<style lang="scss">

.toggle-container {
   @include flexbox(row, center, center, 1.2rem);

   @include mq (small) {
      gap: 0.7rem;
   }
}

.toggle-btn {
   position: relative;
   @include width-height(2.5rem, 1.25rem);
   background-color: var(--clr-neutral-2);
   border-radius: 1rem;
   transition: 0.3s ease;

   &::after {
      content: '';
      @include position(absolute, 50%, 50%, auto, auto);
      @include width-height(0.875rem, 0.875rem);
      background-color: var(--clr-background-1);
      border-radius: 50%;
      transform: translate(-15%, -50%);
      transition: 0.3s ease;
   }
}

.moon-icon {
   stroke: var(--clr-neutral-2);
}

.moon-icon-active {
   stroke: var(--clr-neutral-1);
}

.toggle-active {
   background-color: var(--clr-neutral-1);

   &::after {
      transform: translate(115%, -50%);
   }
}

</style>
 