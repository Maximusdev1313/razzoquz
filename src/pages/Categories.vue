<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useApiStore } from "src/stores";
import cards from "src/components/cards.vue";
const store = useApiStore();
const route = useRoute();
const category = ref([]);
await store.getData("api/products");

onBeforeMount(async () => {
  category.value = await store
    .filterItems("category", route.params.id)
    .then((app) => app);
});
</script>
<template>
  <div>
    <Suspense>
      <cards :products="category" />
    </Suspense>
  </div>
</template>
