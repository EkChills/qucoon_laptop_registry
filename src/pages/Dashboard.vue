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
      <DetailsCard v-for="card in cardList" :topic="card.title" :color="card.color" :numbers="card.numbers" />
    </div>
    <TableInfo :laptopList="laptops" />
  </div>
</template>

<script>
import TableInfo from "../components/TableInfo.vue";
import RegisterButton from "../ui/RegisterButton.vue";
import Navbar from "../components/Navbar.vue";
import DetailsCard from "../ui/DetailsCard.vue";

export default {
  components: {
    TableInfo,
    RegisterButton,
    Navbar,
    DetailsCard,
  },
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
    }
  },
};
</script>

<style scoped>
.main-cont {
  width: calc(100% - 15.93rem);
}
</style>
