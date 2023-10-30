<script setup>
import { useApiStore } from "src/stores";
import { onBeforeMount, ref } from "vue";
// import animation from "src/components/animation.vue";
import cards from "src/components/cards.vue";
import animation from "src/components/animation.vue";
const store = useApiStore();
const status = ref([]);

const category = ref([]);
const tea = ref([]);

onBeforeMount(async () => {
  await store.getData("api/products");
  status.value = await store
    .filterItems("status", "special")
    .then((app) => app);
  category.value = await store
    .filterItems("category", "Yog'lar")
    .then((app) => app.slice(-4));
  tea.value = await store
    .filterItems("category", "Choylar")
    .then((app) => app.slice(-4));
});
</script>

<template>
  <q-page>
    <div>
      <animation />
      <div class="title q-ma-md">Sizga kerakli</div>

      <Suspense>
        <cards class="" :products="status" />
      </Suspense>
      <div class="title q-ma-md">Yog'lar</div>

      <Suspense>
        <cards class="" :products="category" />
      </Suspense>

      <div class="title q-ma-md">Choylar</div>
      <Suspense>
        <cards class="" :products="tea" />
      </Suspense>
    </div>
  </q-page>
</template>
