<template>
  <div class="flex flex-col space-y-1">
    <label
      for="main-sel"
      class="text-[1rem] capitalize font-[400] text-[#333F53]"
    >
      quality
    </label>
    <select
      id="main-sel"
      class="select select-bordered border-[#333F53] w-[25rem]"
    >
      <option disabled selected>Quality</option>
      <option>Han Solo</option>
      <option>Greedo</option>
    </select>
  </div>
</template>

<script>
export default {
  props:['labelText']
};
</script>

<style></style>
