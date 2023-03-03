<template>
  <form @submit="onSubmitValidation">
    <SignIn v-if="isMember" :toggleMember="toggleMember" :signInMail="errors.signEmailError" :signInPass="errors.signPasswordError"/>
    <div v-else class="min-h-[100vh] flex flex-col">
      <h3 class="text-[2rem] font-semibold pl-[120px] pt-[2rem]">
        register as a new user
      </h3>
      <div class="flex items-center mt-[2rem]">
        <div class="flex w-1/2 items-center justify-center">
          <img src="../assets/register_user.png" alt="register" />
        </div>
        <div class="flex flex-col w-1/2">
          <div class="max-w-[30rem] mx-auto flex flex-col">
            <div class="flex flex-col space-y-3">
              <InputRow
                :labelText="'enter first name'"
                :labelId="'firstName'"
                :inputName="'firstName'"
                :inputValue="firstName"
                :error="errors.createFirstNameError"
              />
              <InputRow
                labelText="enter last name"
                :labelId="'lastName'"
                :inputName="'lastName'"
                :inputValue="lastName"
                :error="errors.createLastNameError"
              />
              <InputRow
                labelText="enter email address"
                :labelId="'email'"
                :inputName="'emailAddress'"
                :inputValue="emailAddress"
                :error="errors.createLastNameError"
              />
              <InputRow
                labelText="choose password"
                :labelId="'choosePass'"
                :inputName="'password'"
                :inputValue="password"
                :inpType="'password'"
                :error="errors.createPasswordError"
              />
              <InputRow
                labelText="confirm password"
                :labelId="'confirmPass'"
                :inputName="'confirmPassword'"
                :inputValue="confirmPassword"
                :error="errors.createConfirmError"
                :inpType="'password'"
              />
            </div>

            <button
              type="submit"
              class="py-2 rounded-md text-white text-center bg-[#3366FF] flex items-center justify-center font-semibold capitalize mt-[50px] text-[20px]"
            >
              <span v-show="!isRegistering">register</span>
              <img v-show="isRegistering" src="../assets/sign-spin.svg" class="w-[2rem]" alt="">
            </button>
            <p class="text-[1rem] mt-[24px] text-center text-[#111827]">
              if you already have an account?
              <button
                @click="toggleMember"
                type="button"
                to="/register"
                class="text-[1rem] text-[#3366FF]"
              >
                sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import InputRow from "../components/InputRow.vue";
import SignIn from "./Signin.vue";
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      errors: {
        signEmailError: false,
        signPasswordError: false,
        createFirstNameError: false,
        createLastNameError: false,
        createEmailError: false,
        createPasswordError: false,
        createConfirmError: false,
      },
    };
  },

  components: {
    InputRow,
    SignIn,
  },
  computed: {
    isMember() {
      return this.$store.getters.isMember;
    },
    ...mapGetters([
      "firstName",
      "lastName",
      "emailAddress",
      "isRegistering",
      "phoneNo",
      "password",
      "confirmPassword",
      "status",
      "isUser", 
      "loginError",
      'isRegistering',
      "gender",
    ]),
    signInMail() {
      return this.$store.getters.signInEmail;
    },
    signInPass() {
      return this.$store.getters.signInPassword;
    },
  },
  methods: {
    ...mapMutations(["toggleMember", "changeUser"]),
    clearInputs() {
      this.$store.commit('clearInputs')
    },
    async onSubmitValidation(e, payload) {
      e.preventDefault();
      this.validateGuard();
      console.log('submitted', this.errors);
      try {
        if (this.isMember) {
          if(this.errors.signEmailError || this.errors.signPasswordError) {
            console.log(this.errors.signEmailError,this.errors.signPasswordError);
            return
          }
          this.$store.commit("startRegistering", payload);
          await this.$store.dispatch("login", {
            password: this.signInPass,
            username: this.signInMail,
          });
          if(this.loginError) {
            return
          } else {
            this.$store.dispatch('changeUser', this.isUser)
          }
          
        }
        if (!this.isMember) {
          if(this.errors.createConfirmError || this.errors.createEmailError || this.errors.createFirstNameError || this.errors.createLastNameError || this.errors.createPasswordError) {
            return
          }
          this.$store.commit("startRegistering", payload);
          await this.$store.dispatch("registerUser", {
            email: this.emailAddress,
            firstname: this.firstName,
            lastname: this.lastName,
            phoneno: this.phoneNo,
            password: this.password,
            gender: this.gender,
            status: this.status,
          });
          this.clearInputs()
          if(this.loginError) {
            return
          } else {
            this.$store.dispatch('changeUser', this.isUser)
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    checkUserNavigate() {
      if (this.isUser) {
        this.$router.push("/dashboard");
      }
    },
    validateGuard() {
      if (!this.signInMail) {
        this.errors.signEmailError = true;
      }
      if (this.signInMail) {
        this.errors.signEmailError = false;
      }
      if (!this.signInPass) {
        this.errors.signPasswordError = true;
      }
      if (this.signInPass) {
        this.errors.signPasswordError = false;
      }
      if (!this.firstName) {
        this.errors.createFirstNameError = true;
      }
      if (this.firstName) {
        this.errors.createFirstNameError = false;
      }
      if (!this.lastName) {
        this.errors.createLastNameError = true;
      }
      if (this.lastName) {
        this.errors.createLastNameError = false;
      }
      if (!this.emailAddress) {
        this.errors.createEmailError = true;
      }
      if (this.emailAddress) {
        this.errors.createEmailError = false;
      }
      if (!this.password) {
        this.errors.createPasswordError = true;
      }
      if (this.password) {
        this.errors.createPasswordError = false;
      }
      if (!this.confirmPassword) {
        this.errors.createConfirmError = true;
      }
      if (this.confirmPassword) {
        this.errors.createConfirmError = false;
        return;
      }
    },
  },
  mounted() {
    this.checkUserNavigate();
  },
  watch: {
    "$store.getters.isUser"() {
      if (this.isUser) {
        this.$router.push("/dashboard");
      }
    },
  },
};
</script>

<style></style>
