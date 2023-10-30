<script setup>
import { useApiStore } from "src/stores";
import { ref, toRefs } from "vue";
import card from "src/components/card.vue";
const store = useApiStore();
const props = defineProps({
  products: Array,
});
const { products } = toRefs(props);
// store.getCategory()
let slide = ref(1);
</script>

<template>
  <div class="container">
    <div class="wrapper flex justify-between">
      <card
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
      <div
        class="q-pa-md wrapper flex justify-between items-center"
        v-if="!products?.length"
      >
        <q-card
          flat
          style="width: 250px; height: 300px"
          class="card"
          v-for="card in 4"
          :key="card"
        >
          <q-skeleton height="150px" square />

          <q-card-section>
            <q-skeleton type="text" class="text-subtitle1" />
            <q-skeleton type="text" width="50%" class="text-subtitle1" />
            <q-skeleton type="text" class="text-caption" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
}
.wrapper {
  width: 100%;
  gap: 20px;
}
@media (max-width: 600px) {
  .container {
    width: 98%;
    margin: 10px auto;
  }
  .card {
    width: 47%;
  }
}
</style>
