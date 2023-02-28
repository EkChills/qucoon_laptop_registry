<template>
  <button :class="`w-[85px] flex space-x-[6px] justify-center ${assigned === 'assigned' ? 'bg-[hsl(155,96%,97%)]' : 'bg-[#FEF3F2]'} items-center h-[22px] rounded-lg`">
    <img v-if="assigned === 'assigned'" src="assets/assigned.svg" alt="check">
    <img v-else src="assets/unassigned.svg" alt="check">
    <span :class="`text-[.75rem] font-[500] capitalize ${assigned === 'assigned' ? 'text-[#027A48]' : 'text-[#B42318]'}`">
      {{ assigned === 'assigned' ? 'assigned' : 'unassigned' }}
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