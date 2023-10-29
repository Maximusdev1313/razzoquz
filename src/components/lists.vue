<script setup>
import { ref, toRefs } from "vue";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});
const { products } = toRefs(props);
</script>
<template>
  <div class="q-mt-md wrapper">
    <div class="title q-my-md">Buyurtmalaringiz</div>
    <q-list dense style="width: 100%">
      <q-item v-for="product in products" :key="product" dense>
        <q-item-section>
          <q-item-label lines="2">{{ product.name }}</q-item-label>
          <div class="flex justify-between items-center text-grey">
            <q-item-label
              >Mahsulot soni:{{ product.quantity }}
              {{ product.size }}</q-item-label
            >
            <q-item-label>Narxi: {{ product.price }}</q-item-label>
            <q-item-label
              >summasi: {{ product.price * product.quantity }}</q-item-label
            >
          </div>
        </q-item-section>

        <!-- <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section> -->
      </q-item>
    </q-list>
  </div>
</template>
<style scoped>
.wrapper {
  width: 100%;
  background-color: #fff;
}
</style>
