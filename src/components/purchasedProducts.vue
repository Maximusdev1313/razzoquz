<script setup>
import { ref } from "vue";
import { useApiStore } from "src/stores";

const store = useApiStore();
</script>

<template>
  <div class="wrapper">
    <q-scroll-area style="width: 100%; height: 61vh; margin-bottom: 10px">
      <div class="content q-mb-md">
        <div
          class="card shadow-2 q-mt-md"
          v-for="(product, index) in store.purchasedProducts"
          :key="product"
        >
          <div class="product flex row items-center">
            <img
              :src="`${store.hostName}/${product.image}`"
              alt=""
              width="50"
              height="50"
              v-if="product.image"
            />
            <div class="nonImg" v-else>
              <q-icon name="image" size="lg" class="nonImg"></q-icon>
            </div>
            <div class="product-info flex column wrap">
              <q-list class="list">
                <q-item style="display: block; padding: 10px 0">
                  <q-item-section>
                    <q-item-label caption lines="1"
                      >{{ product.name }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <div class="product-content text-subtitle2">
                <span
                  ><span class="gt-sm">Mahsulot narxi:</span>
                  {{ product.price }} so'm</span
                >
                &bull;
                <span>
                  <span class="gt-sm">Soni:</span> {{ product.quantity }}
                  {{ product.size }}</span
                >
                &bull;
                <span>
                  <span class="gt-sm">Summasi:</span>
                  {{ product.quantity * product.price }} so'm</span
                >
              </div>
            </div>
          </div>
          <div class="button-group">
            <div class="buttons-for-quantity">
              <q-btn
                class="button"
                size="sm"
                @click="store.incrementAmount(product)"
                >+</q-btn
              >
              <q-btn
                class="button"
                size="sm"
                @click="store.decrementAmount(product)"
                >-</q-btn
              >
            </div>
            <div class="delete-button">
              <q-btn
                size="10px"
                rounded
                class=""
                padding="lg sm"
                color="negative"
                icon="delete"
                label=""
                @click="store.deleteProduct(product, index)"
              />
            </div>
          </div>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 60vh;
}
.content {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.card {
  width: 90%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  border-radius: 15px;
}
.product {
  border-radius: 15px;
  width: 100%;
}
.nonImg {
  width: 50px;
  height: 50px;
  background-color: transparent;
}
.button-group {
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buttons-for-quantity {
  width: 100px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* .button {
  width: 90px;
  height: 30px;
  border-radius: 15px;
  background-color: brown;
  border: none;
} */
.button {
  width: 90%;
  height: 40px;
  border-radius: 15px;
  border: none;
  margin: 3px 0 3px 4px;
  color: #fff;
  background: #19d276;
  cursor: pointer;
}
.delete-button {
  width: 100%;
  height: 70px;
  margin-left: 5px;
  display: flex;
  align-items: center;
}
.product-info {
  width: 80%;
}
.product-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list {
  width: 500px;
  height: 30px;
}
@media (max-width: 600px) {
  .product-content {
    font-size: 12px;
  }
  .list {
    width: 150px;
    height: 30px;
  }
}
</style>
