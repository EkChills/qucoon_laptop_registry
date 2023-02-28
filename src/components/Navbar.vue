<template>
  <nav
    class="fixed z-30 bg-white left-[15.93rem] px-[2.5rem] border border-b-[hsl(0,0%,90%)] pt-[15px] main-nav pb-[20px] flex items-center justify-between"
  >
    <div v-if="routePath !== '/dashboard'" class="relative">
      <form @submit="onSubmitHandler">
      <input
        type="text"
        class="rounded-md indent-[3.125rem] py-2 border  w-[22rem] placeholder:text-[1rem] placeholder:text-[#7D7D7D] placeholder:capitalize border-[#CFCFCF]"
        placeholder="search"
        v-model="searchWOrd"
      />
      <button  class="absolute inset-0 left-4">
        <img src="../assets/search.svg" alt="search icon">
      </button>
      </form>
    </div>

    <h1 v-if="routePath === '/dashboard'" class="text-xl font-bold text-black capitalize">laptop registry</h1>

    <div class="flex items-center space-x-[1rem]">
      <img src="../assets/messageIcon.svg" alt="message">
      <img src="../assets/Avatar.png" alt="avatar">
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      searchWOrd:''
    }
  },
  methods:{
    onSubmitHandler(e) {
      e.preventDefault();
      if(this.routePath === '/employees') {
        console.log(this.$route.path);
        this.$store.commit('searchEmployees', this.searchWOrd)
        this.searchWOrd = ''
      } else {
        console.log(this.$route.path);
        this.$store.commit('searchLaptops', this.searchWOrd)
        this.searchWOrd = ''
      }
    }
  },
  computed:{
    routePath() {
      return this.$route.path
    }
  }
};
</script>

<style scoped>
  .main-nav {
    width: calc(100% - 15.93rem);
  }
</style>
