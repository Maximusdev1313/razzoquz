<script setup>
import { useApiStore } from "src/stores";
import { onBeforeMount, ref } from "vue";
import cards from "src/components/cards.vue";
import carusel from "src/components/carusel.vue";
const store = useApiStore();
const status = ref([]);

const category = ref([]);
const tea = ref([]);
const makaron = ref([]);
const parfum = ref([]);
onBeforeMount(async () => {
  await store.getData("api/products");
  status.value = await store
    .filterItems("status", "special")
    .then((app) => app.splice(0, 8));
  category.value = await store
    .filterItems("category", "Yog'lar")
    .then((app) => app.slice(0, 6));
  tea.value = await store
    .filterItems("category", "Choylar")
    .then((app) => app.slice(0, 6));
  makaron.value = await store
    .filterItems("category", "Makaron mahsulotlari")
    .then((app) => app.slice(0, 6));
  parfum.value = await store
    .filterItems("category", "Parfumeriya mahsulotlari")
    .then((app) => app.splice(0, 8));
});
</script>

<template>
  <q-page>
    <div>
      <carusel />
      <div class="title q-ma-md text-black q-ma-md flex justify-between">
        <span> Sizga kerakli </span>

        <router-link to="/all-products" class="router"
          >Barchasi <q-icon name="navigate_next" size="md" />
        </router-link>
      </div>

      <Suspense>
        <cards class="" :products="status" />
      </Suspense>
      <div class="title text-black q-ma-md flex justify-between">
        <span> Yog'lar </span>
        <router-link to="/category/Yog'lar" class="router">
          Ko'rish
          <q-icon name="navigate_next" size="md" />
        </router-link>
      </div>

      <Suspense>
        <cards class="" :products="category" />
      </Suspense>

      <div class="title text-black q-ma-md flex justify-between">
        <span> Choylar </span>
        <router-link to="/category/Choylar" class="router">
          Ko'rish
          <q-icon name="navigate_next" size="md" />
        </router-link>
      </div>

      <Suspense>
        <cards class="" :products="tea" />
      </Suspense>

      <div class="title text-black q-ma-md flex justify-between">
        <span> Makaron mahsulotlari </span>
        <router-link to="/category/Makaron%20mahsulotlari" class="router">
          Ko'rish
          <q-icon name="navigate_next" size="md" />
        </router-link>
      </div>
      <Suspense>
        <cards class="" :products="makaron" />
      </Suspense>
      <div class="title q-ma-md">Parfumeriya mahsulotlari</div>
      <Suspense>
        <cards class="" :products="parfum" />
      </Suspense>
    </div>
  </q-page>
</template>

<style scoped>
.router {
  font-weight: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
