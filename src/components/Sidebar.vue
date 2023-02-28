<template>
  <aside
    class="fixed bg-white top-0 w-[15.93rem] border border-r-2 border-r-[hsl(0,0%,90%)] pt-[6.375rem] px-[24px] bottom-0 left-0"
  >
    <div class="flex flex-col space-y-[25px]">
      <router-link
        :to="link.path"
        v-for="(link, index) in linkData"
        :key="index"
        class="flex items-center px-[1.6rem] links transition duration-300 ease-in-out py-[0.938rem] cursor-pointer space-x-[1.079rem] rounded-lg"
      >
        <img :src="link.icon" class="w-[21.47px]" :alt="link.title" />
        <span class="text-[1rem] capitalize ">{{
          link.title
        }}</span>
      </router-link>
      <div
        class="flex items-center space-x-[1.079rem] rounded-lg cursor-pointer px-[1.6rem] links py-[0.938rem]"
        @click="logoutUser"
      >
        <img src="assets/logout.svg" class="w-[21.47px] fill-[#3366FF]" />
        <span class="text-[1rem] capitalize ">log out</span>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapActions } from "vuex";
import { links } from "../utils/links";

export default {
  computed: {
    linkData() {
      return links;
    },
    logoutUser() {
      this.$store.dispatch("logoutUser");
      setTimeout(() => {
        this.$router.push("/register");
      }, 2000);
    },
  },
};
</script>

<style>
.links {
  color:#7D7D7D;
}
.links:hover {
  color: #3366ff;
  background: rgba(51, 102, 255, 0.1);
}

.router-link-active {
  color: #3366ff;
  background: rgba(51, 102, 255, 0.1);
}
</style>
