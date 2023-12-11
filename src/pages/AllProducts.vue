<script setup>
import { onBeforeMount, ref } from "vue";
import { useApiStore } from "src/stores";
import cards from "src/components/cards.vue";
const store = useApiStore();
onBeforeMount(() => {
  store.getData("api/products");
});
</script>

<template>
  <q-page>
    <div class="title">Barcha mahsulotlar</div>
    <Suspense>
      <cards :products="store.allProducts" />
    </Suspense>
  </q-page>
</template>
