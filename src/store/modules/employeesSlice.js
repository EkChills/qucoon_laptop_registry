import { customFetch } from "../../utils/axios"
import { toast } from "vue3-toastify"

export default {
  state:{
    mainEmployees:[],
    backupEmployees:[],
    registerEmployeeLoading:false,
    registerEmployeeError:false,
    employeeLoading:false
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
    setRegisterEmployeeError:(state) => {
      state.registerEmployeeError = true
    },
    resetRegisterEmployeeError:(state) => {
      state.registerEmployeeError = false
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
    employeeLoading:(state) => {
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
    async registerEmployee({commit, dispatch}, payload) {
      console.log('ran');
      commit('setEmployeeLoading')
      commit('resetRegisterEmployeeError')
      try {
        const resp = await customFetch.post('employee/create', payload)
        const data = await resp.json
        console.log(data);
        toast.success('registered successfully',{position:toast.POSITION.TOP_CENTER})
        commit('stopEmployeeLoading')
      } catch (error) {
        commit('setRegisterEmployeeError')
        commit('stopEmployeeLoading')
        toast.error('there was an error',{position:toast.POSITION.TOP_CENTER})
      }
    }
  }
}