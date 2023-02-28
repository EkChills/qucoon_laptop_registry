<template>
  <div class="overflow-x-auto w-full table-info">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            LaptopId
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">date</th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            <div class="theaders">
              <span>status</span>
              <img src="../assets/chevron-updown.svg" class="w-[.9rem]" alt="" />
            </div>
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            <div class="theaders">
              <span>type</span>
              <img src="../assets/chevron-updown.svg" class="w-[.9rem]" alt="" />
            </div>
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            <div class="theaders">
              <span>department</span>
              <img src="../assets/chevron-updown.svg" class="w-[.9rem]" alt="" />
            </div>
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            employees
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="laptop in laptopList" :key="laptop.id">
          <td>
            <div class="flex items-center space-x-[.75rem]">
              <span class="text-[#101828] text-[0.875rem] font-[500]"
                >#0{{ laptop.laptopid }}</span
              >
            </div>
          </td>
          <td class="text-[14px] text-[#667085]">
            {{ formatDate(laptop.dateassigned) }}
          </td>
          <td>
            <LaptopStatus
              :isAssigned="laptop.datereturned"
              :brand="'windows'"
            />
          </td>
          <td>
            <button class="text-[#667085] font-[400] text-[14px]">
              {{
                foundLaptop(laptop.laptopid).brandname.at(0) === "M"
                  ? "MacOs"
                  : "Windows"
              }}
            </button>
          </td>
          <td class="text-[#667085] font-[400] text-[14px]">
            {{ foundEmployee(laptop.employeeid).jobtitle }}
          </td>
          <td>
            <div class="flex item-center space-x-[1.3rem] justify-between">
              <div class="flex space-x-[.75rem] items-center">
                <span
                  class="uppercase text-[#DB657B] text-[.875rem] flex items-center justify-center bg-[#F8E0E5] w-[2rem] h-[2rem] rounded-full"
                  ><span>{{
                    foundEmployee(laptop.employeeid).firstname.slice(0, 2)
                  }}</span></span
                >
                <div class="flex flex-col space-y-[.1rem]">
                  <h6 class="text-[14px] font-[400] text-[#101828] capitalize">
                    {{
                      foundEmployee(laptop.employeeid).firstname +
                      " " +
                      foundEmployee(laptop.employeeid).lastname
                    }}
                  </h6>
                  <p class="text-[14px] text-[#667085] font-[400] capitalize">
                    {{ foundEmployee(laptop.employeeid).jobtitle }}
                  </p>
                </div>
              </div>
              <button
                @click="returnLaptop(laptop.laptopid)"
                class="text-[#344054] ml-2 font-[600] text-[14px] border border-[hsl(216,16%,84%)] py-[0.625rem] px-[1rem] rounded-lg capitalize"
              >
                <span v-if="returnLoading && laptop.laptopid === laptop.laptopid">returning...</span>
                <span v-else>return</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import dayjs from "dayjs";
import RegisterButton from "../ui/RegisterButton.vue";
import LaptopStatus from "../ui/LaptopStatus.vue";
import { mapGetters } from "vuex";
import ReturnButton from "../ui/ReturnButton.vue";

export default {
  props: ["laptopList"],
  components: {
    RegisterButton,
    LaptopStatus,
    ReturnButton,
  },
  created() {
    console.log(this.laptopList);
  },

  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format(" MMM D, YYYY");
    },
    foundLaptop(id) {
      return this.allGottenLaptops.find((item) => item.laptopid == id);
    },
    foundEmployee(id) {
      return this.allEmployees.find((item) => item.employeeid == id);
    },
    returnLaptop(laptopId) {
      this.$store.dispatch('returnLaptop', {
        laptopid:laptopId,
      })
    }
  },
  // computed:{
  //   jobRole(laptopid) {
  //     const filteredEmployee = this.employeeList.find((employee) => employee.employeeid === laptopid)
  //     return filteredEmployee.firstname + '' + filteredEmployee.lastname
  //   }
  // },
  computed: {
    ...mapGetters(["allEmployees", "allGottenLaptops"]),
    returnLoading() {
      return this.$store.getters.returnLoading
    }

    // foundEmployee() {
    //   const foundItem = this.allEmployees.find((item) => item.)
    // }
  },
};
</script>

<style scoped>
.table-info {
}
</style>
