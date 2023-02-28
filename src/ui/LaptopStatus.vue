<template>
  <button :class="`w-[85px] flex space-x-[6px] justify-center ${assigned === null ? 'bg-[hsl(155,96%,97%)]' : 'bg-[hsl(220,22%,96%)]'} items-center h-[22px] rounded-lg`">
    <img v-if="assigned === null" src="assets/assigned.svg" alt="check">
    <img v-else src="assets/returned.svg" alt="check">
    <span class="text-[.75rem] font-[500] capitalize text-[#344054]">
      {{ assigned === null ? 'assigned' : 'returned' }}
    </span>
  </button>
</template>

<script>
export default {
  props:['isAssigned', 'brand' ],
  computed:{
    assigned() {
      return this.isAssigned
    }
  },

}
</script>

<style>

</style>