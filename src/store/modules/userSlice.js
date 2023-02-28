import axios from "axios";
import { customFetch } from "../../utils/axios";
import { getUserFromLocalStorage, setUserToLocalStorage } from "../../utils/localStorage";
import { toast } from "vue3-toastify"
import 'vue3-toastify/dist/index.css';
import Router from '../../router/Router'


const registeringValues = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  isRegistering: false,
  phoneNo: "not set",
  password: "",
  confirmPassword: "",
  status: "active",
  gender: "not set",
};

const signInVal = {
  signInEmail: "",
  signInPassword: "",
};

export default {
  state: {
    user: getUserFromLocalStorage(),
    isMember: true,
    ...registeringValues,
    ...signInVal,
    loginError:{
      error:false,
      msg:''
    }
  },
  mutations: {
    toggleMember: (state) => {
      state.isMember = !state.isMember;
    },
    handleChange: (state, payload) => {
      const { name, value } = payload;
      state[name] = value;
    },
    startRegistering: (state) => {
      state.isRegistering = true;
    },

    changeUser(state,payload) {
      state.user = payload
    },
    stopRegistering: (state) => {
      state.isRegistering = false;
    },
    logout(state) {
      state.user = null
      localStorage.removeItem('laptopUser')
    },
    setLoginError:(state, errorMsg) => {
      state.loginError = {
        error: true,
        msg:errorMsg
      }
    },
    resetLoginError:(state) => {
      state.loginError = {
        error: false,
        msg:''
      }
    }
  },
  getters: {
    isUser(state) {
      return state.user;
    },
    isMember: (state) => {
      return state.isMember;
    },
    signInEmail(state) {
      return state.signInEmail
    },
    signInPassword(state) {
      return state.signInPassword
    },
    emailAddress(state) {
      return state.emailAddress
    },
    password(state) {
      return state.password
    },
    firstName(state) {
      return state.firstName
    },
    lastName(state) {
      return state.lastName
    },
    phoneNo(state) {
      return state.phoneNo
    },
    gender(state) {
      return state.gender
    },
    status(state) {
      return state.status
    },
    confirmPassword(state) {
      return state.confirmPassword
    },
    isRegistering(state) {
      return state.isRegistering
    },
    loginError(state) {
      return state.loginError
    }      
  },
  actions: {
    async login(context,payload) {
      context.commit('resetLoginError')
      context.commit("startRegistering");
      try {
        const resp = await axios.post(
          "https://418kwprqjk.execute-api.us-east-1.amazonaws.com/dev/auth/login",
          payload
        );
        const data = await resp.data;
        console.log(data);
        context.commit('changeUser', data.user)
        toast.success(`Hello there ${data.user.firstname}`, {position:toast.POSITION.TOP_CENTER})
        context.commit("stopRegistering");
        setUserToLocalStorage(data.user)
      } catch (error) {
        console.log(error);
        context.commit('setLoginError', 'Invalid credentials')
        context.commit("stopRegistering");
        toast.error('Invalid Credentials', {position:'top-center'})
      }
    },
    async registerUser(context, payload) {
      context.commit("startRegistering");
      context.commit('resetLoginError')
      try {
        const resp = await customFetch.post("user/create", payload);
        const data = await resp.data;
        console.log(data);
        if(data.responsecode == '00') {

          toast.success(`User Created Successfully`, {position:toast.POSITION.TOP_CENTER})
          Router.push('/dashboard')
          context.commit('toggleMember')
        }
        context.commit('stopRegistering')
        // setUserToLocalStorage(data.user)
      } catch (error) {
        console.log(error);
        context.dispatch('setLoginError', 'there was an error')
        context.commit('stopRegistering')
        toast.error('was an err', {position:'top-center'})
      }
    },
    async logoutUser(context) {
      setTimeout(() => {
        context.commit('logout')
        toast.success('Logging out',  {position:toast.POSITION.TOP_CENTER})
      }, 2000)
    }
  },
};
