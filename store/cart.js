import Vue from "vue";

export const state = () => ({
  services: [],
  extras: {},
})

export const mutations = {
  SERVICES(state, services) {
    Vue.set(state, 'services', services)
  },
  EXTRAS(state, { service_id, extra_id }) {
    let index = state.services.findIndex(service => service.id === service_id)

    if (!state.services[index].extraIds) {
      Vue.set(state.services[index], 'extraIds', [])
    }

    Vue.set(state.services[index], 'extraIds', [...state.services[index].extraIds, extra_id])
  },
}
export const actions = {
  addExtra({ state, commit }, { service_id, extra_id }) {

    commit('EXTRAS', { service_id, extra_id })
  },
  removeExtra({ state, commit }, { service_id, extra_id }) {
    // Lọc bỏ phần tử đã bỏ chọn
    let extraIds = state.extras[service_id].filter((id) => id !== extra_id)
    // Cập nhật danh sách 
    commit('EXTRAS', { service_id, extraIds })

  },
}


