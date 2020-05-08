import Vue from "vue";

export const state = () => ({
  customer: { "id": "0591bd9f-c6ad-4b7f-85de-2b018a1e7f1a", "name": "Rosemary Bode", "email": "nelda.altenwerth@example.com", "avatar": null, "__typename": "Customer" },
})

export const mutations = {
  CUSTOMER(state, customer) {
    Vue.set(state, 'customer', customer)
  },

}
export const actions = {
  setCustomer({ commit }, customer) {
    commit('CUSTOMER', customer)
  }
}


