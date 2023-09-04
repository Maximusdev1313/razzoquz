<script setup>
import { ref } from "vue";
import { useApiStore } from "src/stores";

const store = useApiStore();
</script>

<template>
  <div class="wrapper shadow-8">
    <div class="content header">
      <div class="product-name">Mahsulot nomi</div>
      <div class="price">Narxi (so'm)</div>
      <div class="quantity">Soni</div>
      <div class="total-price">Summasi (so'm)</div>
    </div>
    <q-scroll-area class="scroll" style="height: 200px; width: 100%">
      <div
        class="content"
        v-for="product in store.purchasedProducts"
        :key="product"
      >
        <div class="product-name">{{ product.name }}</div>
        <div class="price">{{ product.price }}</div>
        <div class="quantity">{{ product.quantity }}</div>
        <div class="total-price">{{ product.quantity * product.price }}</div>
      </div>
      <div class="total">
        <div class="flex justify-around">
          <div>Umumiy summa:</div>
          <div>
            {{ store.amount }}
          </div>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>
<style scoped>
.wrapper {
  width: 100%;
  height: 150px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: rgb(255, 255, 255);
  border-radius: 15px;
}
.content {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px dotted #000;
}
.content > div {
  width: 200px;
}
.header {
  font-size: 18px;
  font-weight: bolder;
}
.total {
  width: 100%;
  margin-bottom: 300px;
}
</style>
