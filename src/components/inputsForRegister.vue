<script setup>
import { ref } from "vue";
import { useApiStore } from "src/stores";
import axios from "axios";
const store = useApiStore();

const userName = ref("");
const phoneNumber = ref();
const address = ref("");
const comment = ref("");

const postClientInfo = async () => {
  try {
    const response = await axios.post(`${store.hostName}/api/orders`, {
      clientId: "51548",
      name: "alimashrab",
      phone_number: 5412131,
      address: "address.value",
      total_order_price: 829827,
      comment: "comment.value",
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};
const postOrders = () => {
  store.purchasedProducts.parent_id = "51548";
  for (let product of store.purchasedProducts) {
    try {
      const response = axios.post(`${store.hostName}/api/orders/post-orders`, {
        parent_id: "51548",
        name: product.name,
        price: product.price,
        quantity_in_store: product.quantity_in_store,
        entry_price: product.entry_price,
        discount_price: product.discount_price,
        size: product.size,
        quantity: product.quantity,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<template>
  <div class="user-info q-my-xl q-pa-md">
    <div class="title">Ma'lumotlaringiz</div>
    <q-form>
      <q-input
        v-model="userName"
        type="text"
        name="fname"
        id="fname"
        label="Ismingiz"
        :rules="[(val) => !!val || 'Majburiy maydon']"
      />
      <q-input
        v-model="phoneNumber"
        type="tel"
        id="tel"
        name="phone"
        mask="(##) ### - ## - ##"
        label="Raqamingiz"
        fill-mask
        :rules="[(val) => !!val || 'Majburiy maydon']"
      />
      <q-input
        v-model="address"
        type="text"
        name="address"
        id="address"
        label="Manzilingiz"
      />
      <q-input
        type="text"
        v-model="comment"
        name="comment"
        label="Kamentariy berish"
      />
      <div class="q-my-md">
        <!-- <q-btn
        @click="order()"
        :color="notChecked == true ? 'red' : 'primary'"
        icon="location_on"
        class="q-mr-md"
      >
        locatsiya
        <q-tooltip class="bg-accent"
          >Iltimos locatsiyani olish tugmasini bosing</q-tooltip
        >
      </q-btn> -->
        <q-btn @click="postOrders()" color="accent"> Buyurtma Berish </q-btn>
      </div>
    </q-form>
  </div>
</template>

<style scoped>
.user-info {
  width: 100%;
  position: fixed;
  top: 10px;
  left: 0;
  background: rgb(255, 255, 255);
  border-radius: 15px;
}
</style>
