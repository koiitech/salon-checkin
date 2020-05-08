import Vue from "vue";

export const state = () => ({
  // services: [],
  services: ["71578b2e-0cf4-402c-b385-c4dea1a9fba0", "93968e52-4544-4eb9-9e97-96c29d35c6d7", "1e2fdb3a-7bb5-4e7b-ad4e-8d0c047f619d", "06e9330a-e22e-48d5-b884-d4cf756d8950", "8fe31b31-255b-4afb-9f60-47dc71807a3f", "9dcd93b0-2457-4e40-8996-c4fe27629023"],
  // extras: {},
  extras: { "71578b2e-0cf4-402c-b385-c4dea1a9fba0": ["d8b7a768-bedc-4a54-9902-f461ec12075f", "cc91b52e-da2b-473f-90d7-5a6d6683aaae", "d8b7a768-bedc-4a54-9902-f461ec12075f"], "93968e52-4544-4eb9-9e97-96c29d35c6d7": ["062597c5-3469-41b2-aaea-d01a6e94025f", "8dd30479-8a71-4151-9e96-b712265ba00b", "062597c5-3469-41b2-aaea-d01a6e94025f"], "1e2fdb3a-7bb5-4e7b-ad4e-8d0c047f619d": ["096b4964-90a9-41fd-be0b-e6bcc8648e8c", "1ab51b87-5117-4b9a-be82-e3e4c7fc8554"], "06e9330a-e22e-48d5-b884-d4cf756d8950": ["1c500ce9-ab56-4b33-9a3f-ce521299789f", "2a37c910-c3c8-4623-9d32-9feca601c0af"], "8fe31b31-255b-4afb-9f60-47dc71807a3f": ["e5bc30cc-f88f-4d0e-960e-b18124905132", "b162c7c4-cf52-4871-8474-1a20ce982e41"], "9dcd93b0-2457-4e40-8996-c4fe27629023": ["26f8af4d-e75a-4b8d-b2a5-c015b807a4c9"] },
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
  }
}



