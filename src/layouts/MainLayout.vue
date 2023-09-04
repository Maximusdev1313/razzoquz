<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-accent">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          color="white"
        />
        <div class="fit row justify-between items-center content-center">
          <router-link to="/" class="link q-ma-md">
            <q-toolbar-title class="text-white text-weight-bold">
              <span>VALUE</span>
              <span class="logo">CART</span>
            </q-toolbar-title>
            <!-- <img src="icons/logo-white.png" alt="Logo" class="logo" /> -->
          </router-link>

          <router-link to="/search" class="search-input gt-sm">
            <q-input
              v-model="searchTermByName"
              filled
              type="search"
              class="input_header"
              bg-color="purple-3"
              dark
              color="white"
              label="Mahsulot qidirish"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </router-link>
          {{ searchTermByName }}
          <div class="flex items-center justify-around">
            <div class="q-mr-sm dialog" v-if="store.amount < 10000">
              Minimal 10 000 so'm
            </div>
            <q-btn
              icon="shopping_cart"
              to="/order"
              class="text-white text-weight-bold"
            >
              <q-badge color="red" floating>{{
                store.purchasedProducts.length
              }}</q-badge>
              {{ store.amount }}
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <!-- <drawerContent /> -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      bordered
      reveal
      class="footer bg-white text-white lt-md"
      v-if="path !== '/order'"
    >
      <router-link to="/search" class="search-input">
        <q-input
          v-model="searchTermByName"
          rounded
          outlined
          label="Mahsulot qidirish"
          type="search"
          class="input_header"
          bg-color="white"
          color="purple"
        >
          <template v-slot:append>
            <q-icon name="search" color="grey" />
          </template>
        </q-input>
      </router-link>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { defineComponent, ref, watch, computed } from "vue";
import { useApiStore } from "src/stores";
import { useRoute } from "vue-router";
// import drawerContent from "src/components/drawerContent.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();

const searchTermByName = ref("");
async function getFilteredData() {
  const filteredData = await store.filterData(searchTermByName.value);
  console.log(filteredData);
  // Cut the last 10 objects
  store.filteredData = filteredData.slice(-10);
}

const path = computed(() => route.path);
const leftDrawerOpen = ref(false);
const store = useApiStore();
// store.getCategory();

watch(
  () => searchTermByName.value,
  function () {
    getFilteredData();
  }
);
// watch(
//   () => path.value,
//   function () {}
// );
const getRouteHistory = () => {
  const routeHistory = router.options.history.state.back;

  if (routeHistory) {
    let firstWord = routeHistory.split("/")[1];
    if (firstWord === "user") {
      store.clearStorage();
    }
  }
};
watch(
  () => path.value,
  function () {
    getRouteHistory();
  }
);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
.footer {
  height: 80px;
}
.link {
  text-decoration: none;
}
.input_header {
  margin: 10px;
}
.search-input {
  width: 60%;
}
.logo {
  border: 2px solid #fff;
  padding: 0px 3px;
  margin-left: 4px;
}
.dialog {
  background-color: rgb(194, 63, 226);
  padding: 2px 10px;
  border-radius: 2px;
  transition: 3s;
}
</style>
