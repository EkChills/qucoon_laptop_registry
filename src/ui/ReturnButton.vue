<template lang="">
  <button @click="returnLaptop" class="text-[#344054] ml-2 font-[600] text-[14px] border border-[hsl(216,16%,84%)] py-[0.625rem] px-[1rem] rounded-lg capitalize">
    <span v-if="returnLoading">returning...</span>
    <span v-else>return</span>
  </button>
</template>
<script>
export default {
  props:['laptopId'],
  computed:{
    returnLoading() {
      return this.$store.getters.returnLoading
    }
  },
  methods:{
    returnLaptop() {
      this.$store.dispatch('returnLaptop', {
        laptopid:'53',
      })
    }
  }
}
</script>
<style lang="">
  
</style>