export const state = () => ({
  customer: {}
})

export const mutations = {
  CUSTOMER(state, customer) {
    state.customer = Object.assign({}, customer)
  }
}
export const actions = {
  setCustomer({ commit }, customer) {
    commit('CUSTOMER', customer)
  }
}


