<script setup>
import { ref } from "vue";

import ordersList from "src/components/ordersList.vue";
import purchasedProducts from "src/components/purchasedProducts.vue";
import inputsForRegister from "src/components/inputsForRegister.vue";

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
        color="primary"
        icon-right="arrow_forward"
        @click="isDone = !isDone"
      >
        davom etish
      </q-btn>
    </div>
    <purchasedProducts v-if="!isDone" />
    <inputs-for-register v-else />

    <orders-list />
  </q-page>
</template>
