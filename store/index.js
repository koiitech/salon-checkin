import Vue from "vue";

export const state = () => ({
  customer: {},
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


