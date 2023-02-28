<template>
  <button class="w-[12.9375rem] flex items-center hover:bg-opacity-40 transition-all duration-500 justify-center capitalize h-[3rem] space-x-[10px] rounded-lg bg-[#3366FF] text-white text-[1rem] font-semibold">
    <img src="../assets/add.svg" alt="plus">
    <span>{{ buttonText }}</span>
  </button>
</template>

<script>

export default {
  props:['buttonText']
}
</script>

<style>

</style>