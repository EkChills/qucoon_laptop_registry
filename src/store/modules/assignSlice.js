import { customFetch } from "../../utils/axios"
import { toast } from "vue3-toastify"

export default {
  state:{
    assignLoading:false,
    returnLoading:false,
    assignError:{
      error:false,
      msg:''
    }
  },
  mutations:{
    startAssignLoading(state) {
      state.assignLoading = true
    },
    stopAssignLoading(state) {
      state.assignLoading = false
    },
    startReturnLoading(state) {
      state.returnLoading = true
    },
    stopReturnLoading(state) {
      state.returnLoading = false
    },
    setAssignError(state) {
      state.assignError = {
        error:true,
        message:'cant be assigned'
      }
    },
    resetAssignError:(state) => {
      state.assignError = {
        error:false,
        msg:''
      }
    }
  },
  getters:{
    assignLoading(state) {
      return state.assignLoading
    },
    returnLoading(state) {
      return state.returnLoading
    }
  },
  actions:{
    async assignLaptop({commit, dispatch}, payload) {
      commit('startAssignLoading')
      commit('resetAssignError')
      try {
        const resp = await customFetch.post('employee/assignlaptop', payload)
        const data = await resp.data
        if(data.responsecode == 95) {
          toast.error(data.responsemessage, {position:'top-center'})
        } else {
          toast.success(data.responsemessage, {position:'top-center'})
        }
        commit('stopAssignLoading')
      } catch (error) {
        console.log(error);
        toast.error('there was an error', {position:'top-center'})
        commit('resetAssignError')
        commit('stopAssignLoading')
      }
    },
    async returnLaptop({commit, dispatch}, payload) {
      commit('startReturnLoading')
      try {
        const resp = await customFetch.post('employee/returnlaptop', payload)
        const data = await resp.data
        console.log(data);
        if(data.responsecode == 95) {
          toast.error('there was an error try again', {position:'top-center'})
        } else {
          toast.success(data.responsemessage, {position:'top-center'})
        }
        dispatch('getAllLaptops')
        commit('stopReturnLoading')
      } catch (error) {
        console.log(error);
        toast.error('there was an error', {position:'top-center'})
        commit('stopReturnLoading')
      }
    }
  }
}