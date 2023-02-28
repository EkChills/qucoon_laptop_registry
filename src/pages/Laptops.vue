<template>
  <Navbar />
  <div  v-if="isLoading" class="flex min-h-[100vh] w-full items-center justify-center">
    <img class="w-28" src="../assets/spinner.svg" >
  </div>
  <div v-else class="  min-h-[100vh] w-full py-[5rem] ml-[15.93rem] main-cont px-[2.5rem] bg-[#F8F8F8]">
    <div class="flex items-center justify-between mb-[2.5rem] mt-[1.25rem]">
      <span class="text-[#13161D] font-semibold text-[1.5rem] capitalize">laptops</span>
      <router-link to="/register-laptop"><RegisterButton :buttonText="'register'" /></router-link>
    </div>
    <FilterList />
    <LaptopTable :laptopList="laptops"/>
  </div>
</template>

<script>
import LaptopTable from '../components/LaptopTable.vue'
import RegisterButton from '../ui/RegisterButton.vue';
import Navbar from '../components/Navbar.vue';
import FilterList from '../components/FilterList.vue';

export default {
  components:{
    RegisterButton,
    FilterList,
    Navbar,
    LaptopTable
},
  created() {
    this.$store.dispatch('getLaptopList')
  },
  methods:{
    loginUser() {
      
    }
  },
  computed:{
    isLoading() {
      console.log(this.$store.getters.isLoading);
      return this.$store.getters.isLoading
    },
    laptops() {
      return this.$store.getters.getMainLaptopList
    },
  },

}
</script>

<style scoped>
  .main-cont {
    width: calc(100% - 15.93rem);
  }
</style>