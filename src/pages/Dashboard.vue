<template>
  <Navbar />
  <div
    v-if="isLoading"
    class="flex min-h-[100vh] w-full items-center justify-center"
  >
    <img class="w-28" src="../assets/spinner.svg" />
  </div>
  <div
    v-else
    class="min-h-[100vh] w-full py-[5rem] ml-[15.93rem] main-cont px-[2.5rem] bg-[#F8F8F8]"
  >
    <div class="flex items-center justify-between mb-[2.5rem] mt-[1.25rem]">
      <span class="text-[#13161D] font-semibold text-[1.5rem] capitalize"
        >summary</span
      >
      <router-link to="/register-laptop"
        ><RegisterButton :buttonText="'register'"
      /></router-link>
    </div>
    <div class="flex items-center space-x-[1.5rem]">
      <DetailsCard
        v-for="card in cardList"
        :topic="card.title"
        :color="card.color"
        :numbers="card.numbers"
      />
    </div>
    <div class="flex  flex-col bg-white p-[1.5rem]">
      <h3 class="text-[1rem] font-[600]">Utilization rate</h3>
      <div class="mx-auto">
        <apexchart
      width="500"
      type="donut"
      :options="chartOptions"
      :series="assignedLaptops"
    ></apexchart>
      </div>
    
    </div>
    
    <TableInfo :laptopList="laptops" />
  </div>
</template>

<script>
import TableInfo from "../components/TableInfo.vue";
import RegisterButton from "../ui/RegisterButton.vue";
import Navbar from "../components/Navbar.vue";
import DetailsCard from "../ui/DetailsCard.vue";
import VueApexCharts from 'vue3-apexcharts'

export default {
  components: {
    TableInfo,
    RegisterButton,
    Navbar,
    DetailsCard,
  },
  data() {
    return {
      series: [44, 55,],
      chartOptions: {
    labels: ['Active', 'Inactive',],
    colors: ['#5C85FF', 'hsla(207, 87%, 67%, 0.24)',],
  },


  
  }},
  created() {
    console.log(this.$store.dispatch("getAllLaptops"));
    this.$store.dispatch("getAllLaptops");
    const hair = 20
  },
  methods: {
    loginUser() {},
  },
  computed: {
    isLoading() {
      console.log(this.$store.getters.isLoading);
      return this.$store.getters.isLoading;
    },
    laptops() {
      return this.$store.getters.allLaptops;
    },
    assignedLaptops() {
      let laptops = this.$store.getters.getMainLaptopList
      laptops = laptops.filter((laptop) => laptop.status === 'assigned')
      return laptops.length
    },
    cardList() {
      return this.$store.getters.cardList
    },
    assignedLaptops() {
      return [this.$store.getters.getAssigned.assigned, this.$store.getters.getAssigned.unassigned]
    }
  },
};
</script>

<style scoped>
.main-cont {
  width: calc(100% - 15.93rem);
}
</style>
