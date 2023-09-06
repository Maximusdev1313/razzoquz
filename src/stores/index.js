
import { store } from 'quasar/wrappers'
// import { createPinia } from 'pinia'
// import { store } from 'quasar/wrappers'
import { createPinia, defineStore } from 'pinia'
import axios from 'axios'
export const useApiStore = defineStore('store', {
  state: () => ({
    hostName: 'http://localhost:5000',
    allProducts: [],
    purchasedProducts: [],
    dialog: false,
    amount: 0,
    prevGram: 0,
    prevGramAmount: 0,
    priceNonDiscount: 0,
    priceWithDiscount: 0,
    filteredData: [],
    clientId: null
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
    },
    async filterData(query) {
      try {
        const response = await axios.post(`${this.hostName}/api/products/filter-data?q=${query}`)
        console.log(response.data);
        const minimizedProducts = response.data
        return minimizedProducts
      } catch (error) {
        console.log(error);

      }
    },
    addPurchasedProducts(el, increment) {

      this.purchasedProducts.push(el)
      increment
      this.purchasedProducts = [...new Set(this.purchasedProducts)]
      this.dialog = true
    },
    deleteProduct(item, index) {
      const price = JSON.parse(item.price);
      const total = price * item.quantity;

      if (this.amount > 0) {
        this.amount -= total;
        this.purchasedProducts.splice(index, 1);
        item.quantity = 0;
      }
    },
    incrementAmount(item, gram) {
      if (gram && item === item) {
        // Subtract previous gram amount from total
        // this.amount -= this.prevGramAmount;
        let decimalPart = item.quantity - Math.floor(item.quantity);

        item.quantity = Math.floor(item.quantity)
        this.amount -= decimalPart * item.price
        // Calculate new gram amount and update total
        const priceWithGram = item.price * gram;
        this.amount += priceWithGram;
        this.prevGram = gram
        console.log(gram, priceWithGram, 'pr');
        // Update previous gram amount

        this.prevGramAmount = priceWithGram;
        item.quantity += gram
        // Update other values
        this.priceNonDiscount = item.quantity * item.old_price;
        this.priceWithDiscount = item.quantity * item.price;
      }
      else if (gram === 0) {
        // Subtract previous gram amount from total
        let decimalPart = item.quantity - Math.floor(item.quantity);
        console.log(decimalPart, 'dec');
        item.quantity = item.quantity - decimalPart

        this.amount -= decimalPart * item.price
      }
      else {
        this.prevGramAmount = 0
        this.amount += Number(item.price);
        item.quantity = item.quantity === '' ? 1 : JSON.parse(item.quantity) + 1;
        this.priceNonDiscount = item.quantity * item.old_price;
        this.priceWithDiscount = item.quantity * item.price;
      }
    },
    decrementAmount(item) {
      const price = JSON.parse(item.price);
      if (item.quantity > 1) {
        this.amount -= price;
        item.quantity--;
        this.priceNonDiscount = item.quantity * item.old_price;
        this.priceWithDiscount = item.quantity * item.price;

      }
    },


    setId() {
      this.clientId = Date.now() + Math.floor(Math.random() * 10000).toString();
    },

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
