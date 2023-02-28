<template>
  <div class="overflow-x-auto w-full table-info">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            employeeId
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            <div class="theaders">
              <span>job title</span>
              <img src="assets/chevron-updown.svg" class="w-[.9rem]" alt="" />
            </div>
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            <div class="theaders">
              <span>first name</span>
              <img src="assets/chevron-updown.svg" class="w-[.9rem]" alt="" />
            </div>
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            <div class="theaders">
              <span>last name</span>
              <img src="assets/chevron-updown.svg" class="w-[.9rem]" alt="" />
            </div>
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            status
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            email
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="employee in employeeList" :key="employee.employeeid">
          <td>
            <div class="flex items-center space-x-[.75rem]">
              <span class="text-[#101828] text-[0.875rem] font-[500]"
                >#0{{ employee.employeeid }}</span
              >
            </div>
          </td>
          
         
          <td class="text-[14px] text-[#667085]">
            {{ employee.jobtitle }}
          </td>

          <td class="text-[14px] text-[#667085]">
            {{ employee.firstname }}
          </td>

          <td class="text-[14px] text-[#667085]">
            {{ employee.lastname }}
          </td>

          
          <td>
            <MainLaptopStatus
              :isAssigned="employee.status"
              :brand="'windows'"
            />
          </td>
          <td class="text-[14px] text-[#667085]">
            <span>{{ employee.email }}</span>
            <AssignButton v-if="employee.status === 'not assigned'" class="ml-3" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import dayjs from "dayjs";
import RegisterButton from "../ui/RegisterButton.vue";
import MainLaptopStatus from "../ui/MainLaptopStatus.vue";
import { mapGetters } from "vuex";
import AssignButton from "../ui/AssignButton.vue";


export default {
  props: ["employeeList"],
  components: {
    RegisterButton,
    MainLaptopStatus,
    AssignButton
},
  created() {
    console.log(this.laptopList);
  },

};
</script>

<style scoped>
.table-info {
}
</style>
