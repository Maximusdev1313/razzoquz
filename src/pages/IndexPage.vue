<script setup>
import { useApiStore } from "src/stores";
import { onBeforeMount, onMounted, ref } from "vue";
import cards from "src/components/cards.vue";
// import animation from "src/components/animation.vue";

const store = useApiStore();

onMounted(() => {
  store.getData("api/products");
});
</script>

<template>
  <q-page>
    <div>
      <!-- <animation /> -->
      <div class="title q-ma-md">Sizga kerakli</div>

      <Suspense>
        <cards class="" :products="store.allProducts" />
      </Suspense>
    </div>
  </q-page>
</template>
