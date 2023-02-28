import { createStore } from "vuex";
import laptopSlice from "./modules/laptopSlice";
import userSlice from "./modules/userSlice";
import filterSlice from "./modules/filterSlice";
import employeesSlice from "./modules/employeesSlice";
import assignSlice from "./modules/assignSlice";

export const store = createStore({
  modules:{
    userSlice,
    laptopSlice,
    filterSlice,
    employeesSlice,
    assignSlice
  }
})