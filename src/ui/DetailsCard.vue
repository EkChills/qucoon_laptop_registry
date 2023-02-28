<template lang="">
  <div :class="`flex items-center flex-col space-y-1 mb-[1.5rem] border border-b-[6px] ${color}  justify-center w-[16.125rem] h-[8.75rem] bg-white rounded-md `">
    <span class="text-[#7F8185] font-[400] text-[1rem]">{{topic}}</span>
    <h5 class="font-[600] text-[#242424] text-[2.1rem]">{{numbers}}</h5>
  </div>
</template>
<script>
export default {
  props:['topic', 'numbers', 'color']
}
</script>
<style scoped>
  .blue {
    border-bottom-color: #5C85FF;
  }

  .light-blue {
    border-bottom-color: #63B3F4;
  }

  .green {
    border-bottom-color: #429498;
  }

  .red {
    border-bottom-color: #EC797D;
  }
</style>