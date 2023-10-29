<script setup>
import { ref } from "vue";
import { useApiStore } from "src/stores";
import axios from "axios";
import { useRouter } from "vue-router";
const store = useApiStore();

const userName = ref("");
const phoneNumber = ref();
const address = ref("");
const comment = ref("");

const postClientInfo = async () => {
  store.setId();

  try {
    const response = await axios.post(`${store.hostName}/api/orders`, {
      clientId: store.clientId,
      name: userName.value,
      phone_number: phoneNumber.value,
      address: address.value,
      total_order_price: store.amount,
      comment: comment.value,
      location: userLocation.value,
      created: Date.now(),
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};
const postOrders = async () => {
  console.log(store.purchasedProducts);
  for (let product of store.purchasedProducts) {
    try {
      const response = await axios.post(
        `${store.hostName}/api/orders/post-orders`,
        {
          _id: product._id,
          parent_id: store.clientId,
          name: product.name,
          price: product.price,
          quantity_in_store: product.quantity_in_store,
          entry_price: product.entry_price,
          discount_price: product.discount_price,
          size: product.size,
          quantity: product.quantity,
        }
      );
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  }
};

const userLocation = ref();
const options = {
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: 0,
};
const getUserLocation = () => {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          userLocation.value = `https://maps.google.com/maps/dir/40.318214,71.833028/${position.coords.latitude},${position.coords.longitude}/@40.318231,71.833045.17z`;
          resolve(userLocation.value);
        },
        undefined,
        options
      );
    }
  });
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function callLocation() {
  try {
    const result = await Promise.race([
      getUserLocation(),
      delay(10000).then(() => {
        throw new Error("Timeout");
      }),
    ]);
    console.log(userLocation.value);
    console.log(result);
    // handle result
  } catch (error) {
    // handle error
    console.log(error);
  }
}
const router = useRouter();

const changePath = () => {
  router.push("/wait-room");
};

const sendOrder = async () => {
  await callLocation();
  await postClientInfo();
  await postOrders();
  changePath();
  localStorage.setItem("allow", true);
};
const alert = ref(localStorage.getItem("allow") ? false : true);
</script>

<template>
  <div class="user-info q-my-xl q-pa-md">
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section class="flex column items-center justify-center">
          <div class="title text-center">Iltimos</div>
          <img src="src/assets/alert.png" alt="" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          Barcha ma'lumotlaringizni kiritganingizdan so'ng ushbu rasmda ko'rinib
          turgan oyna ochiladi va siz (rus-> <b>Разрешить</b>, Eng->
          <b>Allow</b>, Uzb-> <b>Ruxsat berish </b>) tugmasini bosishngiz kerak!
          <br />
          Bu orqali biz sizning ayni vaqtda turgan nuqtangizni bilib olamiz va
          buyurtma yetkazish vaqtini qisqartira olamiz.
          <span class="text-negative"
            >Ushbu ma'lumot qayta so'ralmaydi va boshqa maqsadlarga
            ishlatilmaydi</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
        <q-btn @click="sendOrder()" color="accent"> Buyurtma Berish </q-btn>
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
