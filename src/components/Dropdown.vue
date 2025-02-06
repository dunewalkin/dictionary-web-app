<script setup lang="ts">
   import { ref, onMounted, onUnmounted, watch } from "vue";

   interface fontOption {
      name: string;
      value: string;
      class: string;
   }

   const fontOptions: fontOption[] = [
      { name: "Sans Serif", value: "Inter, sans-serif", class: "sans-serif" },
      { name: "Serif", value: "Lora, serif", class: "serif" },
      { name: "Mono", value: "Inconsolata, monospace", class: "monospace" },
   ];

   const isFlipped = ref<boolean>(false);
   const isDropdownOpen = ref<boolean>(false);
   const selectedFont = ref<string>(
      localStorage.getItem("selectedFont") || fontOptions[0].value
   );

   const dropdownRef = ref<HTMLElement | null>(null);

   const currentFont = ref<fontOption>(
      fontOptions.find((font) => font.value === selectedFont.value) ||
         fontOptions[0]
   );

   const toggleDropdown = () => {
      isFlipped.value = !isFlipped.value;
      isDropdownOpen.value = !isDropdownOpen.value;
   };

   const selectFont = (font: fontOption) => {
      currentFont.value = font;
      selectedFont.value = font.value;
      applyFontFamily(font);
      toggleDropdown();
      localStorage.setItem("selectedFont", font.value);
   };

   const applyFontFamily = (font: fontOption) => {
      document.body.style.fontFamily = font.value;
   };

   const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (dropdownRef.value && target && !dropdownRef.value.contains(target)) {
         isFlipped.value = false;
         isDropdownOpen.value = false;
      }
   };

   onMounted(() => {
      document.addEventListener("mousedown", handleClickOutside);

      applyFontFamily(currentFont.value);
   });

   onUnmounted(() => {
      document.removeEventListener("mousedown", handleClickOutside);
   });

   watch(selectedFont, (newFont) => {
      const font = fontOptions.find((f) => f.value === newFont);
      if (font) applyFontFamily(font);
   });

</script>

<template>
   <div class="dropdown-container" ref="dropdownRef">
     <button
       class="drop-btn"
       :class="{ flipped: isFlipped }"
       @click="toggleDropdown"
     >
       {{ currentFont.name }}
     </button>
     <div v-if="isDropdownOpen" class="dropdown-content">
       <button
         v-for="font in fontOptions"
         :key="font.name"
         @click="selectFont(font)"
         :class="['font-btn', font.class]"
       >
         {{ font.name }}
       </button>
     </div>
   </div>
</template>

<style scoped lang="scss">
   .dropdown-container {
      position: relative;
   }

   .drop-btn {
      background: transparent;
      margin-right: 2rem;
      color: var(--clr-primary-1);

      &::after {
         content: '';
         @include position(absolute, 35%, 0, auto, auto);
         @include width-height(0.8rem, 0.5rem);
         background-image: url(./icons/icon-arrow-down.svg);
         background-repeat: no-repeat;
         background-position: center center;
         transform: rotate(0deg);
         transition: .2s ease;
      }

      &.flipped::after {
         transform: rotate(180deg); 
      }
   }

   .dropdown-content {
      margin-top: 1.13rem;
      border-radius: 1rem;
      background-color: var(--clr-background-1);
      box-shadow: 0px 5px 30px 0px var(--shadow);
      @include flexbox(column, center, flex-start, 1rem);
      @include position(absolute, auto, 0, auto, auto);
      padding: 1.5rem;
      width: 11.4375rem;
      z-index: 5;
   }

   .dropdown-content button {
      background: transparent;
      color: var(--clr-primary-1);

      &:hover,:focus-visible {
         color: var(--clr-neutral-1);
      }
   }

   .sans-serif {
      font-family: Inter, sans-serif;
   }

   .serif {
      font-family: Lora, serif;
   }

   .monospace {
      font-family: Inconsolata, monospace;
   }
</style>