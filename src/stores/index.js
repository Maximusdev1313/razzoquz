
import { store } from 'quasar/wrappers'
// import { createPinia } from 'pinia'
// import { store } from 'quasar/wrappers'
import { createPinia, defineStore } from 'pinia'
import axios from 'axios'
export const useApiStore = defineStore('store', {
  state: () => ({
    hostName: 'http://localhost:5000',
    allProducts: []
  }),
  actions: {
    async getData(url) {
      try {
        let response = await axios.get(`${this.hostName}/${url}`)
        // console.log(response.data);
        this.allProducts = response.data
      } catch (error) {
        console.log(error);
      }
    }

  },
})
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia()

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  return pinia
})
