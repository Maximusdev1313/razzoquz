<script setup>
import { ref } from "vue";
import { useApiStore } from "src/stores";
import axios from "axios";
const store = useApiStore();
const userId = sessionStorage.getItem("clientId");
const getClientInfo = async () => {
  console.log(userId);
  try {
    const response = await axios.get(`${store.hostName}/api/orders/${userId}`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
getClientInfo();
</script>

<template>
  <q-page> waitpage </q-page>
</template>
