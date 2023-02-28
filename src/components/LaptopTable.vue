<template>
  <div class="overflow-x-auto w-full table-info">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            LaptopId
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            <div class="theaders">
              <span>purchase date</span>
              <img src="assets/chevron-updown.svg" class="w-[.9rem]" alt="" />
            </div>
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            <div class="theaders">
              <span>quality</span>
              <img src="assets/chevron-updown.svg" class="w-[.9rem]" alt="" />
            </div>
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            <div class="theaders">
              <span>brand name</span>
              <img src="assets/chevron-updown.svg" class="w-[.9rem]" alt="" />
            </div>
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            status
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            size
          </th>
          <th class="text-[12px] font-[500] capitalize text-[#667085]">
            serial number
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="laptop in laptopList" :key="laptop.laptopid">
          <td>
            <div class="flex items-center space-x-[.75rem]">
              <span class="text-[#101828] text-[0.875rem] font-[500]"
                >#0{{ laptop.laptopid }}</span
              >
            </div>
          </td>
          
         
          <td class="text-[14px] text-[#667085]">
            {{ laptop.purchasedate }}
          </td>

          <td class="text-[14px] text-[#667085]">
            {{ laptop.quality }}
          </td>

          <td class="text-[14px] text-[#667085]">
            {{ laptop.brandname }}
          </td>

          
          <td>
            <MainLaptopStatus
              :isAssigned="laptop.status"
              :brand="'windows'"
            />
          </td>
          <td class="text-[14px] text-[#667085]">
            {{ laptop.size }}
          </td>
          <td class="text-[14px] text-[#667085]">
            {{ laptop.serialnumber }}
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

export default {
  props: ["laptopList"],
  components: {
    RegisterButton,
    MainLaptopStatus,
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
