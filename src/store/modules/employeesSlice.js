import { customFetch } from "../../utils/axios"

export default {
  state:{
    mainEmployees:[],
    backupEmployees:[],
    employeeLoading:true
  },
  mutations:{
    setMainEmployees:(state,payload) => {
      state.mainEmployees = payload
    },
    setBackupEmployees:(state,payload) => {
      state.backupEmployees = payload
    },
    setEmployeeLoading(state){
      state.employeeLoading = true
    },
    stopEmployeeLoading(state){
      state.employeeLoading = false
    },
    searchEmployees:(state, payload) => {
      let tempEmployees = [...state.backupEmployees]
      tempEmployees = tempEmployees.filter((employee) => employee.firstname.trim().toLowerCase().includes(payload))
      state.mainEmployees = tempEmployees
    },
  },
  getters:{
    getMainEmployees:(state) => {
      return state.mainEmployees
    },
    getEmployeeLoading:(state) => {
      return state.employeeLoading
    }
  },
  actions: {
    async getEmployeeList(context) {
      context.commit('setEmployeeLoading')
      try {
        const resp = await customFetch.get('employee/getall')
        const data = await resp.data
        console.log(data);
        context.commit('setMainEmployees', data.data)
        context.commit('setBackupEmployees', data.data)
        context.commit('stopEmployeeLoading')
      } catch (error) {
        context.commit('stopEmployeeLoading')
        console.log(error.message);
      }
    },
  }
}