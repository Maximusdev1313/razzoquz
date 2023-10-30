<template>
  <div class="loader">
    <img
      src="http://insofuzlast.pythonanywhere.com/media/Cloner_Cube_Simple_-_Copy1-1366x657.png"
      alt="cube img"
      class="img"
      v-show="isloading == true"
    />
    <!-- <canvas
      id="canvas3d"
      class="canvas"
      style="height: 400px !important"
      v-show="isloading == false"
    >
    </canvas> -->
    <video-background
      :src="'https://insofuzlast.pythonanywhere.com/media/entry.mp4'"
      style="max-height: 400px; height: 80vh"
    >
    </video-background>

    <div class="wrapper">
      <div class="content text-white">
        <div class="header">Arzon, sifatli va tezkor yetkazib berish</div>
        <p class="q-mt-md paraph">
          Sizga kerakli mahsulotlarni bizdan sotib oling. Biz sizga arzon
          narxlarda, yuqori sifatli, tezkor va muhimi
          <span class="text-accent">tekinga</span> yetkazib beramiz.
        </p>
        <q-btn
          class="q-mt-md desktop-only"
          color="accent"
          size="md"
          to="/search"
          >Buyurtma berish</q-btn
        >
        <q-btn class="q-mt-md mobile-only" color="accent" size="sm" to="/search"
          >Buyurtma berish</q-btn
        >
      </div>
    </div>
  </div>
</template>

<script setup>
// import { Application } from "@splinetool/runtime";
import { onMounted, onUnmounted, ref } from "vue";
import VideoBackground from "vue-responsive-video-background-player";
const video = ref(null);

const playVideo = async () => {
  try {
    await video.value.play();
    // Autoplay started!
  } catch (error) {
    // Autoplay was prevented.
    // Show a "Play" button so that user can start playback.
  }
};
let isloading = ref(null);
// const image = ref("");
// const getImage = async () => {
//   try {
//     const res = await axios.get("http://razzoquz.pythonanywhere.com/files/2/");
//     console.log(res.data);
//     image.value = res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// let canvas;
// const getCanvas = () => {
//   try {
//     isloading.value = false;
//     canvas = document.getElementById("canvas3d");
//     const app = new Application(canvas);
//     app
//       .load("https://prod.spline.design/2VEFgp-3ql8k9JPc/scene.splinecode")
//       .catch((error) => {
//         console.log(error);
//         isloading.value = true;
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };
// onMounted(() => {
//   // isloading.value = true;
//   getCanvas();
// });
// onUnmounted(() => {
//   isloading.value = false;
//   console.log(isloading.value);
// });
</script>
<style scoped>
.loader {
  width: 100%;
  height: 400px;
  background-color: #f07efa;
}
.img {
  width: 120%;
  /* height: 400px; */
  aspect-ratio: 4/3;
}
.wrapper {
  width: 100%;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-items: center;
  align-items: center;
}
.content {
  margin-left: 20px;
  position: relative;
  width: 40%;
}
.header {
  font-size: 3rem;
}
@media only screen and (max-width: 768px) {
  .header {
    font-size: 1.2rem;
  }
  p,
  .paraph {
    font-weight: thin;
    font-size: 0.7rem !important;
  }
}
</style>
