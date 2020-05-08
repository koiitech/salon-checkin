import Vue from "vue";

export const state = () => ({
  services: [],
  extras: {},
})

export const mutations = {
  SERVICES(state, services) {
    Vue.set(state, 'services', services)
  },
  EXTRAS(state, { service_id, extraIds }) {
    Vue.set(state.extras, service_id, extraIds)
  },
}
export const actions = {
  addExtra({ state, commit }, { service_id, extra_id }) {
    // Lấy danh sách extras hiện có của service_id
    let extraIds = state.extras[service_id]

    if (!extraIds) {
      commit('EXTRAS', { service_id, extraIds: [] })
      extraIds = []
    }

    // Gộp extraIds và commit
    commit('EXTRAS', { service_id, extraIds: [...extraIds, extra_id] })
  },
  removeExtra({ state, commit }, { service_id, extra_id }) {
    // Lọc bỏ phần tử đã bỏ chọn
    let extraIds = state.extras[service_id].filter((id) => id !== extra_id)
    // Cập nhật danh sách 
    commit('EXTRAS', { service_id, extraIds })

  },
}

export const getters = {
  services: (state, getters, rootGetters, rootState) => {
    return rootState['menus/services'].reduce((items, item) => {

      // Kiểm tra services có được chọn không
      if (state.services.includes(item.id)) {
        let service = Object.assign({}, item)
        let extraIds = state.extras[item.id]
        if (extraIds) {
          let extras = item.extras.filter(extra => extraIds.includes(extra.id))
          Vue.set(service, 'extras', extras)
        }
        items.push(service)
      }
      return items
    }, [])
  },
  amount: (state, getters, rootGetters, rootState) => {

    return getters['services'].reduce((items, item) => {
      items += item.price

      if (item.extras) {
        items += item.extras.reduce((extraAmount, extra) => extraAmount + extra.price, 0)
      }
      return items
    }, 0)
  }
}



