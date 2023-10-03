<script setup>
import { ref } from "vue";
import { useApiStore } from "src/stores";
import axios from "axios";
import ordersList from "src/components/ordersList.vue";
const store = useApiStore();
const userId = sessionStorage.getItem("clientId");
const userInfo = ref([]);
const getClientInfo = async () => {
  try {
    const response = await axios.get(`${store.hostName}/api/orders/${userId}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const statusMessages = {
  packing: "Buyurtma qadoqlanmoqda",
  packed: "Buyurtma qadoqlandi",
  delivering: "Buyurtma yetkazib berilmoqda",
  delivered: "Buyurtma yetkazib berildi",
  waiting: "Kutish rejimi",
};

const message = ref("");

setInterval(async () => {
  userInfo.value = await getClientInfo();
  message.value = statusMessages[userInfo.value.status];
  console.log(message.value);
}, 6000);
</script>

<template>
  <q-page>
    <div class="wrapper">
      <div class="card shadow-1">
        <div class="card__title title text-center q-mt-md">
          {{ message }}
        </div>
        <img
          :src="
            'http://nodirboy.pythonanywhere.com/media/' +
            userInfo.status +
            '.gif'
          "
          v-if="userInfo.status"
          alt="wait"
          class=""
          width="150"
          height="200"
        />

        <!-- <div class="informations text-subtitle1 text-bold text-grey">
          <div v-if="userInfo.packer">Qadoqlovchi: {{ userInfo.packer }}</div>
          <div v-if="userInfo.deliver">
            Yetkazib beruvchi {{ userInfo.deliver }}
            <span>&bull; {{ userInfo.deliver_number }}</span>
          </div>
        </div> -->
      </div>
    </div>
  </q-page>
</template>
<style scoped>
.wrapper {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.card {
  width: 80%;
  height: 300px;
  border-radius: 15px;
  background: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.img {
  width: 200px;
  height: 300px;
  background: #000;
}
.informations {
  text-align: left;
  width: 90%;

  margin-top: 30px;
}
</style>
