<template>
  <main class="reg-w px-[2.25rem] pt-[4.625rem] pb-10 bg-[#F8F8F8]">
    <form @submit.prevent="submitHandler">
      <h1 class="font-[600] text-[#13161D] text-[1.5rem] capitalize">
        register new laptop
      </h1>
      <section class="flex flex-col space-y-3 pt-[2rem] items-start">
        <div class="flex flex-col space-y-2 w-[35rem]">
          <label class="text-[1rem] capitalize text-[#333F53]" for="serNo">
            <span :class="`flex items-center  justify-between`">
              <span>serial number</span>
              <span v-show="errors.serialNumberError" class="text-[#cc0000]">can't be empty</span>
            </span>
          </label>
          <input
            id="serNo"
            v-model="serialNumber"
            type="text"
            :class="`rounded-md bg-transparent ${errors.serialNumberError ? 'error' : null} w-[35rem] indent-2 py-2 border border-[#333F53]`"
          />
        </div>
        <div class="flex flex-col space-y-2 w-[35rem]">
          <label class="text-[1rem] capitalize text-[#333F53]" for="brandName">
            <span :class="`flex items-center  justify-between`">
              <span>brand name</span>
              <span v-show="errors.brandNameError" class="text-[#cc0000]">can't be empty</span>
            </span>
          </label>
          <input
            id="brandName"
            v-model="brandName"
            type="text"
            :class="`rounded-md bg-transparent ${errors.brandNameError ? 'error' : null} w-[35rem] indent-2 py-2 border border-[#333F53]`"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label
            for="main-sel"
            class="text-[1rem] capitalize font-[400] text-[#333F53]"
          >
            quality
          </label>
          <select
            v-model="quality"
            id="main-sel"
            class="select bg-transparent select-bordered border-[#333F53] w-[35rem]"
          >
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <div class="flex flex-col space-y-2 w-[35rem]">
          <label class="text-[1rem] capitalize text-[#333F53]" for="date-lab">{{
            "purchase date"
          }}</label>
          <input
            id="date-lab"
            type="date"
            :class="`rounded-md bg-transparent indent-2 w-full py-2 border border-[#333F53] ${errors.purchaseDateError ? 'error' : null}`"
            v-model="purchaseDate"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label
            for="main-sel"
            class="text-[1rem] capitalize font-[400] text-[#333F53]"
          >
            size
          </label>
          <select
            v-model="size"
            id="main-sel"
            class="select select-bordered bg-transparent border-[#333F53] w-[35rem]"
          >
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div class="flex flex-col space-y-2 w-[35rem]">
          <label class="text-[1rem] capitalize text-[#333F53]" for="serNo">
            
            <span :class="`flex items-center justify-between`">
              <span>color</span>
              <span v-show="errors.colorError" class="text-[#cc0000]">can't be empty</span>
            </span>
          </label>
          <input
            id="serNo"
            v-model="color"
            type="text"
            :class="`rounded-md bg-transparent indent-2 py-2 border border-[#333F53] ${errors.colorError ? 'error' : null}`"
          />
        </div>
        <button
          class="w-[10.813rem] flex items-center justify-center rounded-md bg-[#3366FF] h-[3rem] text-white text-[1rem] font-[600]"
        >
          <span v-show="!registerLoading">register laptop</span>
          <img v-show="registerLoading" class="w-[2rem]" src="../assets/sign-spin.svg">
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
      serialNumber: "",
      brandName: "Windows",
      quality: "Good",
      purchaseDate: "",
      size: "Medium",
      color: "",
      errors: {
        serialNumberError: false,
        purchaseDateError: false,
        colorError: false,
      },
    };
  },
  methods: {
    validateGuard() {
      if(this.serialNumber === '') {
        this.errors.serialNumberError = true
       
      }  if(this.serialNumber) {
        this.errors.serialNumberError = false
      }

       if(this.purchaseDate === '') {
        this.errors.purchaseDateError = true
         
      } if(this.purchaseDate) {
        this.errors.purchaseDateError = false
      }

      if(this.color === '') {
        this.errors.colorError = true
        return
      } if(this.color) {
        this.errors.colorError = false
      }
    },
    submitHandler() {
      console.log('clicked');
      this.validateGuard()
      if(!this.serialNumber || !this.color || !this.purchaseDate) {
        return
      }
      this.$store.dispatch('registerLaptop',{
        serialnumber:this.serialNumber,
        brandname:this.brandName,
        quality:this.quality,
        purchasedate:this.purchaseDate,
        size:this.size,
        status:'not assigned',
        color:this.color
      })
      console.log('made it');
    },
  },
  computed:{
    registerLoading() {
      return this.$store.getters.registerLoading
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
