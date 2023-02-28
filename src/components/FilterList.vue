<template>
  <div class="flex space-x-[2.5rem] mb-[2rem]" >
    <span @click="setFilterOption(filter.option)" v-for="filter in filters" :key="filter.id" :class="`text-[1rem] capitalize hover:text-[#5C85FF] filter-option ${filter.option === filterOption ? 'filter-selected' : null }  text-[#13161D]  font-[400]`">
      {{ filter.option }}
    </span>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default { 

  computed:{
    ...mapGetters(['filters', 'filterOption'])
  },
  methods:{
    setFilterOption(payload) {
      this.$store.commit('setFilterOption', payload)
      this.$store.commit('filterLaptops', payload)
    }
  }
}
</script>
<style scoped>
  .filter-option {
    position: relative;
    transition: all .4s ease-in-out;
  }

  .filter-option:hover {
    cursor: pointer;
    transition: all .5s ease-in-out;
  }

  .filter-option::after {
    position: absolute;
    transition: all .4s ease-in-out;
    content: "";
    bottom: -5px;
    left: 0;
    height: 2px;
    width: 100%;
    opacity: 0;
  }

  .filter-selected {
    color: #5C85FF;
  }
  .filter-selected::after {
    position: absolute;
    transition: all .4s ease-in-out;
    content: "";
    bottom: -5px;
    left: 0;
    height: 2px;
    width: 100%;
    background: blue;
    opacity: 1;
  }

  .filter-option:hover::after {
    background-color: blue;
    opacity: 1;
  }
</style>