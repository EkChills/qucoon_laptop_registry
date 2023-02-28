import { toast } from "vue3-toastify"
import 'vue3-toastify/dist/index.css';
import { customFetch } from "../../utils/axios"


export default {
  state: {
    laptops:[],
    mainLaptops:[],
    backupMainLaptops:[],
    employees:[],
    gottenLaptops:[],
    isLoading:true,
    registerError:{
      error:false,
      msg:''
    },
    registerLoading:false
  },
  mutations:{
    setLaptops(state, payload) {
      let filteredAssigned = payload.filter((item) => item.datereturned == null)
      state.laptops = filteredAssigned
    },
    setEmployees(state, payload) {
      state.employees = payload
    },
    setLoading(state) {
      state.isLoading = true
    },
    stopLoading(state) {
      state.isLoading = false
    },
    setGottenLaptops:(state, payload) => {
      state.gottenLaptops = payload
      state.mainLaptops = payload
    },
    setRegisterLoading(state) {
      state.registerLoading = true
    },
    stopRegisterLoading(state) {
      state.registerLoading = false
    },
    resetRegisterError:(state) => {
      state.registerError = {
        error:false,
        msg:''
      }
    },
    setBackupLaptops(state, payload) {
      state.backupMainLaptops = payload
    },
    setRegisterError:(state, errormsg) => {
      state.registerError = {
        error:true,
        msg:errormsg
      }
    },
    filterLaptops(state,filterOption) {
      let tempLaptops = [...state.backupMainLaptops]
      if(filterOption === 'assigned') {
        tempLaptops =  tempLaptops.filter((laptop) => laptop.status === 'assigned')
        state.mainLaptops = tempLaptops
        return
      }
      if(filterOption === 'total') {
        state.mainLaptops = tempLaptops
        return
      }
      tempLaptops = tempLaptops.filter((laptop) => laptop.quality.toLowerCase() === filterOption)
      state.mainLaptops = tempLaptops
    },
    searchLaptops:(state, payload) => {
      let tempLaptops = [...state.backupMainLaptops]
      tempLaptops = tempLaptops.filter((laptop) => laptop.brandname.trim().toLowerCase().includes(payload))
      state.mainLaptops = tempLaptops
    },
    setMainLaptops(state,payload) {
      state.mainLaptops = payload
    }
  },
  getters:{
    isLoading:(state) => {
      return state.isLoading
    },
    allLaptops:(state) => {
      return state.laptops
    },
    allEmployees:(state) => {
      return state.employees
    },
    allGottenLaptops:(state) => {
      return state.gottenLaptops
    },
    registerLoading:(state) => {
      return state.registerLoading
    },
    getMainLaptopList:(state) => {
      return state.mainLaptops
    },
    cardList:(state) => {
      let filteredAssigned = state.mainLaptops.filter(item => item.status === 'assigned').length
      let filteredGood = state.mainLaptops.filter(item => item.quality === 'Good').length
      let filteredFaulty = state.mainLaptops.filter(item => item.quality === 'Poor').length
      return [
        { id: 1, title: "total laptops", numbers:state.mainLaptops.length, color:'blue' },
        { id: 2, title: "assigned laptops", numbers:filteredAssigned , color:'light-blue'},
        { id: 3, title: "good laptops", numbers:filteredGood, color:'green'},
        { id: 4, title: "faulty laptops", numbers:filteredFaulty, color:'red'},
      ]
    } 
  },

  actions: {
    async getAllLaptops(context, payload) {
      context.commit('setLoading')
      try {
      await Promise.allSettled([customFetch.get('employee/findallrecords'), customFetch.get('employee/getall'),
      customFetch.get('laptop/getall')
    ]).then((results) => {
      const [records, employees, laptops] = results
      const status = 'fulfilled'
      if(records.status === status) {
        context.commit('setLaptops', records.value.data.data)
        context.commit('stopLoading')
      }
      if(employees.status === status) {
        context.commit('setEmployees', employees.value.data.data)
        context.commit('stopLoading')
      }
      if(laptops.status === status) {
        context.commit('setGottenLaptops', laptops.value.data.data)
        context.commit('stopLoading')
      }


    })
        context.commit('stopLoading')
      } catch (error) {
        context.commit('stopLoading')
        console.log(error.message);
      }
    },

    async getLaptopList(context) {
      context.commit('setLoading')
      try {
        const resp = await customFetch.get('laptop/getall')
        const data = await resp.data
        console.log(data);
        context.commit('setMainLaptops', data.data)
        context.commit('setBackupLaptops', data.data)
        context.commit('stopLoading')
      } catch (error) {
        context.commit('stopLoading')
        console.log(error.message);
      }
    },

    async registerLaptop({commit, dispatch}, payload) {
      console.log('ran');
      commit('setRegisterLoading')
      commit('resetRegisterError')
      try {
        const resp = await customFetch.post('laptop/create', payload)
        const data = await resp.json
        console.log(data);
        toast.success('registered successfully',{position:toast.POSITION.TOP_CENTER})
        commit('stopRegisterLoading')
      } catch (error) {
        commit('setRegisterError')
        commit('stopRegisterLoading')
        toast.error('there was an error',{position:toast.POSITION.TOP_CENTER})
      }
    }
  }
}