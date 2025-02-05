<script setup lang="ts">
import { watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useWordStore } from "../stores/wordStore";
import Header from "../components/Header.vue";
import Search from "../components/Search.vue";
import Info from "../components/Info.vue";
import Error from "../components/Error.vue";

const route = useRoute();
const wordStore = useWordStore();

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

</script>

<template>
  <main class="main-container">
    <Header />
    <Search
      :word="wordStore.word"
      @update-word="wordStore.updateWord"
      @fetchDefinition="wordStore.fetchDefinition"
    />
    <Info
      :wordData="wordStore.wordData"
    />
    <Error v-if="wordStore.error" />
  </main>
</template>

