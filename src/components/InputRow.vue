<template>
  <div class="flex flex-col space-y-2 w-[25rem]">
    <span class="flex items-center justify-between">
      <label class="text-[1rem] capitalize text-[#333F53]" :for="labelId">{{
        labelText
      }}</label>
      <span v-show="error" class="text-[#cc0000]">can't be empty</span>
    </span>
    <input
      @input="handleInputChange"
      :name="inputName"
      :value="inputValue"
      :type="inpType ? inpType : 'text'"
      :class="`rounded-md bg-transparent indent-2 py-2 border ${error ? 'error' : null} border-[#333F53] `"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: [
    "labelText",
    "labelId",
    "modelValue",
    "inputName",
    "inputValue",
    "onChange",
    "error",
    'inpType'
  ],
  methods: {
    ...mapMutations(["handleChange"]),
    handleInputChange(e) {
      this.handleChange(e.target);
    },
  },
};
</script>

<style scoped>
 .error{
      animation: shake 0.2s ease-in-out 0s 2;
      border-color: #cc0000;
    }


@keyframes shake {
  0% { margin-left: 0rem; }
  25% { margin-left: 0.5rem; }
  75% { margin-left: -0.5rem; }
  100% { margin-left: 0rem; }
}

</style>
