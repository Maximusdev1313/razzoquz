<script setup>
import { ref } from "vue";
import { useApiStore } from "src/stores";

import cards from "src/components/cards.vue";

const store = useApiStore();
</script>

<template>
  <div>
    <cards :products="store.filteredData" />
  </div>
</template>
