<template>
  <div class="min-h-[100vh] flex flex-col">
    <h3 class="text-[2rem] font-semibold pl-[120px] pt-[36px]">
      sign in to your account
    </h3>
    <div class="flex items-center mt-[4rem]">
      <div class="flex w-1/2 items-center justify-center">
        <img src="assets/Login_Page.png" alt="" />
      </div>
      <div class="flex flex-col w-1/2">
        <div class="max-w-[30rem] mx-auto flex flex-col">
          <div class="flex flex-col space-y-3">
            <InputRow :labelText="'enter email address'" :inputName="'signInEmail'" :inputValue="signInEmail" :labelId="'email'" :error="signInMail" />
            <InputRow labelText="enter password" :inputName="'signInPassword'" :inputValue="signInPassword" :labelId="'password'" :error="signInPass" />
            <router-link to="/forgot-password" class="ml-auto"
              >forgot password?</router-link
            >
          </div>

          <button
            type="submit"
            class="py-2 rounded-md flex items-center justify-center text-white text-center bg-[#3366FF] font-semibold capitalize mt-[50px] text-[20px]"
          >
            <span v-show="!isRegistering">sign in</span>
            <img v-show="isRegistering" src="assets/sign-spin.svg" class="w-[2rem]" alt="">
          </button>
          <p class="text-[1rem] mt-[24px] text-center text-[#111827]">
            are you a new user?
            <button
              @click="toggleMember"
              type="button"
              to="/register"
              class="text-[1rem] text-[#3366FF]"
            >
              register here
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapGetters } from "vuex";
import InputRow from "../components/InputRow.vue";

export default {
  props: ["toggleMember", 'signInMail', 'signInPass'],
  components: {
    InputRow,
  },
  methods: {
    loginUser() {
      this.$store.dispatch("login");
    },
  },
  computed: {
    ...mapState(["signInEmail", "signInPassword"]),
    ...mapGetters(['isRegistering'])
  },
};
</script>

<style></style>
