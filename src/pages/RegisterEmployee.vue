<template>
  <main class="reg-w px-[2.25rem] pt-[4.625rem] pb-10 bg-[#F8F8F8]">
    <form @submit.prevent="submitHandler">
      <h1 class="font-[600] text-[#13161D] text-[1.5rem] capitalize">
        register new employee
      </h1>
      <section class="flex flex-col space-y-3 pt-[2rem] items-start">
        <div class="flex flex-col space-y-2 w-[35rem]">
          <label class="text-[1rem] capitalize text-[#333F53]" for="serNo">
            <span :class="`flex items-center  justify-between`">
              <span>email</span>
              <span v-show="errors.emailError" class="text-[#cc0000]">can't be empty</span>
            </span>
          </label>
          <input
            id="serNo"
            v-model="email"
            type="text"
            :class="`rounded-md bg-transparent ${errors.emailError ? 'error' : null} w-[35rem] indent-2 py-2 border border-[#333F53]`"
          />
        </div>
        <div class="flex flex-col space-y-2 w-[35rem]">
          <label class="text-[1rem] capitalize text-[#333F53]" for="brandName">
            <span :class="`flex items-center  justify-between`">
              <span>first name</span>
              <span v-show="errors.firstNameError" class="text-[#cc0000]">can't be empty</span>
            </span>
          </label>
          <input
            id="firstName"
            v-model="firstName"
            type="text"
            :class="`rounded-md bg-transparent ${errors.firstNameError ? 'error' : null} w-[35rem] indent-2 py-2 border border-[#333F53]`"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label class="text-[1rem] capitalize text-[#333F53]" for="brandName">
            <span :class="`flex items-center  justify-between`">
              <span>last name</span>
              <span v-show="errors.lastNameError" class="text-[#cc0000]">can't be empty</span>
            </span>
          </label>
          <input
            id="lastName"
            v-model="lastName"
            type="text"
            :class="`rounded-md bg-transparent ${errors.lastNameError ? 'error' : null} w-[35rem] indent-2 py-2 border border-[#333F53]`"
          />
        </div>

        <div class="flex flex-col space-y-2 w-[35rem]">
          <label class="text-[1rem] capitalize text-[#333F53]" for="brandName">
            <span :class="`flex items-center  justify-between`">
              <span>phone number</span>
              <span v-show="errors.phoneNoError" class="text-[#cc0000]">can't be empty</span>
            </span>
          </label>
          <input
            id="phoneNo"
            type="phone"
            :class="`rounded-md bg-transparent indent-2 w-full py-2 border border-[#333F53] ${errors.phoneNoError ? 'error' : null}`"
            v-model="phoneNo"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label class="text-[1rem] capitalize text-[#333F53]" for="brandName">
            <span :class="`flex items-center  justify-between`">
              <span>job title</span>
              <span v-show="errors.jobTitleError" class="text-[#cc0000]">can't be empty</span>
            </span>
          </label>
          <input
            id="jobTitle"
            v-model="jobTitle"
            type="text"
            :class="`rounded-md bg-transparent ${errors.jobTitleError ? 'error' : null} w-[35rem] indent-2 py-2 border border-[#333F53]`"
          />
        </div>
        <div class="flex flex-col space-y-2 w-[35rem]">
          <label class="text-[1rem] capitalize text-[#333F53]" for="serNo">
            
            <span :class="`flex items-center justify-between`">
              <span>gender</span>
              <span v-show="errors.genderError" class="text-[#cc0000]">can't be empty</span>
            </span>
          </label>
          <select
            v-model="gender"
            id="gender"
            class="select select-bordered bg-transparent border-[#333F53] w-[35rem]"
          >
            <option selected value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <button
          class="w-[10.813rem] flex items-center justify-center rounded-md bg-[#3366FF] h-[3rem] hover:opacity-40 transition-all ease-in-out text-white text-[1rem] font-[600]"
        >
          <span v-show="!employeeLoading">register employee</span>
          <img v-show="employeeLoading" class="w-[2rem]" src="../assets/sign-spin.svg">
        </button>
      </section>
    </form>
  </main>
</template>

<script>
import InputRow from "../components/InputRow.vue";
import RegisterButton from "../ui/RegisterButton.vue";
import 'vue3-toastify/dist/index.css';
import { mapGetters } from "vuex";
import {toast} from 'vue3-toastify'

export default {
  components: {
    InputRow,
    RegisterButton,
  },
  data() {
    return {
      email: "",
      firstName: "",
      lastName: "",
      phoneNo:'',
      jobTitle: "",
      company: "qucoon",
      middleName: "",
      birthDate:'',
      address:'',
      gender:'male',
      status:'not assigned',
      errors: {
        emailError: false,
        firstNameError: false,
        lastNameError: false,
        phoneNoError: false,
        jobTitleError: false,
        genderError:false
      },
    };
  },
  methods: {
    validateGuard() {
      if(this.email === '') {
        this.errors.emailError = true
       
      }  if(this.email) {
        this.errors.emailError = false
      }
      if(this.firstName === '') {
        this.errors.firstNameError = true
       
      }  if(this.firstName) {
        this.errors.firstNameError = false
      }

       if(this.lastName === '') {
        this.errors.lastNameError = true
         
      } if(this.lastName) {
        this.errors.lastNameError = false
      }

      if(this.phoneNo === '') {
        this.errors.phoneNoError = true
        
      } if(this.phoneNo) {
        this.errors.phoneNoError = false
      }

      if(this.jobTitle === '') {
        this.errors.jobTitleError = true
        
      } if(this.jobTitle) {
        this.errors.jobTitleError = false
      }
    },
    submitHandler() {
      console.log('clicked');
      this.validateGuard()
      if(!this.email || !this.firstName || !this.lastName || !this.phoneNo || !this.jobTitle) {
        console.log(this.email, this.firstName, this.lastName, this.jobTitle, this.phoneNo);
        return
      }
      this.$store.dispatch('registerEmployee',{
        email:this.email,
        firstname:this.firstName,
        lastname:this.lastName,
        phoneno:this.phoneNo,
        jobtitle:this.jobTitle,
        company:this.company,
        middlename:this.middleName,
        birthdate:this.birthDate,
        address:this.address,
        gender:this.gender,
        status:this.status,
      })
      console.log('made it');
    },
  },
  computed:{
    employeeLoading() {
      return this.$store.getters.employeeLoading
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
