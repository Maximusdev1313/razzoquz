<script setup>
import { useApiStore } from "src/stores";
import { ref, toRefs } from "vue";
import card from "src/components/card.vue";
const store = useApiStore();
const props = defineProps({
  products: Array,
});
const { products } = toRefs(props);
</script>

<template>
  <div class="container">
    <div class="wrapper flex justify-between" v-if="products.length">
      <card
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </div>
    <div class="flex justify-center items-center" v-else>
      <q-circular-progress
        indeterminate
        rounded
        size="50px"
        color="green"
        class="q-ma-md"
      />
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
  /* .card {
    width: 47%;
  } */
}
</style>
