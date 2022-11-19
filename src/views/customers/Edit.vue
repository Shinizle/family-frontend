<script setup>
import { onMounted } from "vue";
import useCustomers from "@/composables/Customer";

const { customer, getCustomer, update, errors } = useCustomers();

const props = defineProps({
  id: {
    required: true,
    type: String,
  },
});

console.log(props)

onMounted(() => getCustomer(props.id));
</script>
<template>
  <div class="mt-12">
    <form
        class="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
        @submit.prevent="update($route.params.id)"
    >
      <div class="space-y-6">
        <div class="mb-6">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
          <input type="text" id="name" v-model="customer.Name"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div v-if="errors.name">
            <span class="text-sm text-red-400">{{ errors.name[0] }}</span>
          </div>
        </div>
        <div class="mb-6">
          <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone</label>
          <input type="text" id="birthday" v-model="customer.phone"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div v-if="errors.phone">
            <span class="text-sm text-red-400">{{ errors.phone[0] }}</span>
          </div>
        </div>
        <div class="mb-6">
          <label for="birthday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Birthday</label
          >
          <datepicker type="text" id="birthday" v-model="customer.birthday"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <div v-if="errors.birthday">
            <span class="text-sm text-red-400">{{ errors.birthday[0] }}</span>
          </div>
        </div>
        <div class="mb-6">
          <label for="birthday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Birthday</label
          >
          <select v-model="customer.NationalityID"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option v-for="nationality in nationalities" :value="nationality.Id">
              {{ nationality.Name }}
            </option>
          </select>
          <div v-if="errors.NationalyId">
            <span class="text-sm text-red-400">{{ errors.NationalyId[0] }}</span>
          </div>
        </div>
        <div class="mt-4">
          <button type="submit" class="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded">Store</button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import Datepicker from "vue3-datepicker";
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      isFocused: false,
      birthday: new Date(),
      nationalities: [],
      selected:{
        nationality:''
      }
    };
  },
  mounted() {
    this.getNationality();
  },
  components: {
    Datepicker,
  },
  methods: {
    handleOnFocus() {
      console.log("Focused");
      this.isFocused = true;
    },
    handlOnBlur() {
      this.isFocused = false;
    },
    getNationality(){
      axios.get('/nationality/get-all')
          .then((response) => {
            console.log( response.data );
            this.nationalities = response.data;
          })
          .catch( resonse => {
            console.log('error');
          })
    },
  },
};
</script>