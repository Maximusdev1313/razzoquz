<script setup>
import { ref, onBeforeMount } from "vue";
import { useApiStore } from "src/stores";
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
  <div class="list">
    <q-list bordered separator>
      <q-item>
        <q-item-section>
          <q-item-label class="title text-white q-py-md"
            >Kategoriyalar</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        v-for="category in categories"
        :key="category"
        :to="'/category/' + category"
      >
        <q-item-section>
          <q-item-label class="text-subtitle1">{{ category }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<style scoped>
/* .list {
  background-color: aquamarine;
} */
</style>
