<script setup>
import { toRefs } from "vue";
import { useApiStore } from "src/stores";
import buttonGroup from "./buttonGroup.vue";
const store = useApiStore();
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const { product } = toRefs(props);
</script>

<template>
  <div class="card q-ma-md column justify-between items-center" v-if="product">
    <div class="discount">
      <div
        v-if="product.discount"
        class="row justify-between items-center q-mt-sm text-red text-weight-bold"
      >
        <div class="discount__title">Chegirma</div>
        <div class="discount__percent">{{ product.discount }} %</div>
      </div>
    </div>
    <div class="card__img">
      <!-- <p v-if="product.images[0]?.image">rasm</p> -->
      <q-img
        :src="`${store.hostName}/${product.image}`"
        :alt="product.name"
        class="img"
        :ratio="16 / 9"
        v-if="product.image && product.image !== 'undefined'"
      />
      <div class="img" v-else></div>
    </div>
    <div class="title q-pa-sm text-weight-thin text-uppercase">
      {{ product.name }}
    </div>
    <div class="card__price row justify-between text-weight-bold">
      <div class="card__price_old text-grey">
        <del v-if="product.old_price">{{ product.old_price }} so'm</del>
      </div>
      <div class="card__price_new text-red">{{ product.price }} so'm</div>
    </div>
    <div class="counter row items-center" v-if="product.quantity > 0">
      <button-group :product="product" />
    </div>
    <div class="counter text-center text-grey" v-else>
      Buyurtma berilmagan... Buyurtma berish uchun <br />"Sotib olish tugmasini
      bosing"
    </div>

    <div class="card__button">
      <q-btn
        class="card__button_add full-width q-mt-xl q-mb-sm"
        icon="shopping_cart"
        color="green"
        size="sm"
        @click="
          store.addPurchasedProducts(product, store.incrementAmount(product))
        "
      >
        Sotib olish
      </q-btn>
    </div>
  </div>
</template>
<style scoped>
.card {
  width: 250px;
  border-radius: 10px;
  background-color: #ffff;
  font-size: small;
}
.discount {
  width: 90%;
  height: 25px;
  margin-bottom: 10px;
}

.img,
.card__img.img {
  width: 200px;
  height: 200px;
  border-radius: 15px;
}

.card__price {
  width: 90%;
}
.card__button {
  width: 90%;
  margin-top: 20px;
}
.counter {
  width: 90%;
  height: 26px;
  margin-top: 10px;
  font-size: small;
}
@media (max-width: 600px) {
  .card {
    width: 47%;
    margin: 0;
  }
  .img {
    width: 150px;
  }
  .card__button {
    margin-top: 20px;
  }
  .card__price {
    display: flex;
    flex-direction: row;
  }
  .title {
    font-size: small;
  }
}
</style>
