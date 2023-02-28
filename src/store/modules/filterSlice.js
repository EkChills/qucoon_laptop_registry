import { filters } from "../../utils/filters"

export default {
  state:{
    filters,
    filterOption:'total'
  },

  mutations:{
    setFilterOption(state, payload) {
      state.filterOption = payload
    },
    searchDashBoard(state, filterOption) {
      // let tempLaptops = [...state.backupMainLaptops]
      // tempLaptops = tempLaptops.filter((laptop) => )
      
    }
  },
  getters:{
    filterOption:(state) => {
      return state.filterOption
    },
    filters(state) {
      return state.filters
    }
  }
}