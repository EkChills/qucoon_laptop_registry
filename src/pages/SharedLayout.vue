<template>
  <Sidebar />
  <router-view />
</template>

<script>
import Sidebar from '../components/Sidebar.vue';

export default {
  components:{
    Sidebar,
  }
}
</script>

<style>

</style>