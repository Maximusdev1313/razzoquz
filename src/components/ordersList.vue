<script setup>
import { ref } from "vue";
import { useApiStore } from "src/stores";

const store = useApiStore();
</script>

<template>
  <div class="wrapper shadow-8">
    <div class="title">Buyurtma</div>
    <div class="flex column">
      <div class="info">
        <span> Buyurtma soni:</span>
        <span>{{ store.purchasedProducts.length }}</span>
      </div>
      <div class="info">
        <span> Yetkazib berish narxi:</span>
        <span>0 so'm</span>
      </div>
      <div class="info">
        <span> Umumiy:</span>
        <span>{{ store.amount }}</span>
      </div>
    </div>
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
.info {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dotted #000;
  padding: 10px 5px;
  font-weight: bolder;
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
