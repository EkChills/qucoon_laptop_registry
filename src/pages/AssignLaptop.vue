<template>
  <main class="reg-w px-[2.25rem] pt-[4.625rem] pb-10 bg-[#F8F8F8]">
    <form @submit.prevent="submitHandler">
      <h1 class="font-[600] text-[#13161D] text-[1.5rem] capitalize">
        assign laptop
      </h1>
      <section class="flex flex-col space-y-3 pt-[2rem] items-start">
        <div class="flex flex-col space-y-2 w-[35rem]">
          <label class="text-[1rem] capitalize text-[#333F53]" for="serNo">
            <span :class="`flex items-center  justify-between`">
              <span>laptop id</span>
              <span v-show="errors.laptopIdError" class="text-[#cc0000]">can't be empty</span>
            </span>
          </label>
          <input
            id="laptopId"
            v-model="laptopId"
            type="text"
            :class="`rounded-md bg-transparent ${errors.laptopIdError ? 'error' : null} w-[35rem] indent-2 py-2 border border-[#333F53]`"
          />
        </div>
        <div class="flex flex-col space-y-2 w-[35rem]">
          <label class="text-[1rem] capitalize text-[#333F53]" for="brandName">
            <span :class="`flex items-center  justify-between`">
              <span>employee id</span>
              <span v-show="errors.employeeIdError" class="text-[#cc0000]">can't be empty</span>
            </span>
          </label>
          <input
            id="employeeId"
            v-model="employeeId"
            type="text"
            :class="`rounded-md bg-transparent ${errors.employeeIdError ? 'error' : null} w-[35rem] indent-2 py-2 border border-[#333F53]`"
          />
        </div>
      </section>
      <button
          class="w-[10.813rem] mt-10 flex items-center justify-center rounded-md bg-[#3366FF] h-[3rem] text-white text-[1rem] font-[600]"
        >
          <span v-show="!assignLoading">assign laptop</span>
          <img v-show="assignLoading" class="w-[2rem]" src="../assets/sign-spin.svg">
        </button>
    </form>
  </main>
</template>

<script>
import InputRow from "../components/InputRow.vue";
import RegisterButton from "../ui/RegisterButton.vue";
import 'vue3-toastify/dist/index.css';
import {toast} from 'vue3-toastify'

export default {
  components: {
    InputRow,
    RegisterButton,
  },
  data() {
    return {
      laptopId:'',
      employeeId:'',
      errors:{
        laptopIdError:false,
        employeeIdError:false
      }
    };
  },
  methods: {
    validateGuard() {
      if(this.laptopId === '') {
        this.errors.laptopIdError = true
       
      }  if(this.laptopId) {
        this.errors.laptopIdError = false
      } 
      if(this.employeeId === '') {
        this.errors.employeeIdError = true
       
      }  if(this.employeeId) {
        this.errors.employeeIdError = false
      }

    },
    submitHandler() {
      console.log('clicked');
      this.validateGuard()
      if(!this.laptopId || !this.employeeId) {
        return
      }
      this.$store.dispatch('assignLaptop',{
        laptopid:this.laptopId,
        employeeid:this.employeeId
      })
      this.laptopId = '',
      this.employeeId = ''
    },
  },
  computed:{
    assignLoading() {
      return this.$store.getters.assignLoading
    },
  }
};
</script>

<style scoped>
.reg-w {
  width: calc(100% - 15.93rem);
  margin-left: 15.93rem;
}


    .error{
      animation: shake 0.2s ease-in-out 0s 2;
      border-color: #cc0000;
    }


@keyframes shake {
  0% { margin-left: 0rem; }
  25% { margin-left: 0.5rem; }
  75% { margin-left: -0.5rem; }
  100% { margin-left: 0rem; }
}
</style>
