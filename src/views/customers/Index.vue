<script setup>
import { onMounted } from "vue";
import useCustomers from "@/composables/Customer";

const { customers, getCustomers, destroy } = useCustomers();

onMounted(() => getCustomers());
</script>
<template>
  <div class="mt-12">
    <div class="flex justify-end m-2 p-2">
      <RouterLink
          :to="{ name: 'customer.create' }"
          class="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded"
      >New Customer</RouterLink
      >
    </div>
    <div class="overflow-x-auto relative" bis_skin_checked="1">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
            class="
            text-xs text-gray-700
            uppercase
            bg-gray-50
            dark:bg-gray-700 dark:text-gray-400
          "
        >
        <tr>
          <th scope="col" class="py-3 px-6">Name</th>
          <th scope="col" class="py-3 px-6">Phone</th>
          <th scope="col" class="py-3 px-6"></th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="customer in customers"
            :key="customer.Id"
            class="bg-white border-b dark:bg-gray-100 dark:border-gray-700"
        >
          <td class="py-4 px-6">{{ customer.Name }}</td>
          <td class="py-4 px-6">{{ customer.Phone }}</td>
          <td class="py-4 px-6 space-x-2">
            <RouterLink
                :to="{ name: 'customer.edit', params: { id: customer.Id } }"
                class="
                  px-4
                  py-2
                  bg-green-500
                  hover:bg-green-700
                  text-white
                  rounded
                "
            >Edit</RouterLink
            >
            <button
                @click="destroy(customer.Id)"
                class="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
            >
              Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>