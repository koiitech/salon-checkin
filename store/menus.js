import Vue from "vue";

export const state = () => ({
  categories: [],
})

export const mutations = {
  CATEGORIES(state, categories) {
    Vue.set(state, 'categories', categories)
  }
}
export const actions = {

}

export const getters = {
  services: (state) => {
    return state.categories.reduce((items, item) => items.concat(item.services), [])
  }
}

