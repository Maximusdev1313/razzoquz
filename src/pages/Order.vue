<script setup>
import { ref } from "vue";
import { useApiStore } from "src/stores";
import ordersList from "src/components/ordersList.vue";
import purchasedProducts from "src/components/purchasedProducts.vue";
import inputsForRegister from "src/components/inputsForRegister.vue";
const store = useApiStore();
const isDone = ref(false);
</script>

<template>
  <q-page>
    <div class="flex justify-between">
      <q-btn size="sm" color="negative" icon="arrow_back" to="/">
        ortga qaytish
      </q-btn>
      <q-btn
        size="sm"
        color="green"
        icon-right="arrow_forward"
        @click="isDone = !isDone"
        :disable="store.purchasedProducts.length == 0"
      >
        davom etish
      </q-btn>
    </div>
    <div
      class="flex justify-center q-mt-md text-bold text-subtitle1 text-negative"
      v-if="!store.purchasedProducts.length"
    >
      Iltimos mahsulotlarni tanlang!!!
    </div>
    <purchasedProducts v-if="!isDone" />
    <inputs-for-register v-else />

    <orders-list v-if="!isDone" />
  </q-page>
</template>
