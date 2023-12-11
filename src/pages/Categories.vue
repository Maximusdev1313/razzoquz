<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";
import { useApiStore } from "src/stores";
import cards from "src/components/cards.vue";
const store = useApiStore();
const route = useRoute();
const category = ref([]);

console.log(route.params.id);
const getItems = async () => {
  await store.getData("api/products");
  category.value = await store
    .filterItems("category", route.params.id)
    .then((app) => app);
};
onBeforeMount(async () => {
  getItems();
});
watch(
  () => route.params.id,
  () => {
    getItems();
  }
);
</script>
<template>
  <q-page>
    <div class="title q-ma-md">{{ route.params.id }}</div>
    <Suspense>
      <cards :products="category" />
    </Suspense>
  </q-page>
</template>
