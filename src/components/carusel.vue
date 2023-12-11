<script setup>
import { ref } from "vue";

const slide = ref(1);
const autoplay = ref(true);
</script>
<template>
  <div class="q-pa-md">
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      class="carusel"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide
        :name="1"
        img-src="https://insofuzlast.pythonanywhere.com/media/variant_2.png"
        class="img"
      />
      <q-carousel-slide
        :name="2"
        img-src="https://insofuzlast.pythonanywhere.com/media/shakar.png"
      />
      <q-carousel-slide
        :name="3"
        img-src="https://insofuzlast.pythonanywhere.com/media/fargona_un.png"
      />
      <q-carousel-slide
        :name="4"
        img-src="https://insofuzlast.pythonanywhere.com/media/guruh.png"
      />
      <q-carousel-slide
        :name="5"
        img-src="https://insofuzlast.pythonanywhere.com/media/PAXTA.png"
      />
      <q-carousel-slide
        :name="6"
        img-src="https://insofuzlast.pythonanywhere.com/media/nonna.png"
      />
    </q-carousel>
  </div>
</template>
<style scoped>
@media (max-width: 600px) {
  .carusel {
    height: 180px;
    border-radius: 5%;
  }
}
</style>
