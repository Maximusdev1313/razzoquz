<script setup>
import { ref, onBeforeMount } from "vue";
import { useApiStore } from "src/stores";
import axios from "axios";
const store = useApiStore();
const categories = ref([]);
onBeforeMount(async () => {
  await store.getData("api/products");
  let allCategories = store.allProducts.map((item) => item.category);

  categories.value = allCategories.filter((category, index, self) => {
    return self.indexOf(category) === index;
  });
});
</script>

<template>
  <div class="">
    <Suspense>
      <q-list bordered separator>
        <q-item
          clickable
          v-ripple
          v-for="(category, index) in categories"
          :key="index"
          :to="'category/' + category"
        >
          <q-item-section>
            <q-item-label>{{ category }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </Suspense>
  </div>
</template>
