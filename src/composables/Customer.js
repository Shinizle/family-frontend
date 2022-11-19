import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

axios.defaults.baseURL = "http://localhost:8080/api/";
const headers = {
    'Content-Type': 'application/json'
}

export default function useCustomers(url, config) {
    const customers = ref([]);
    const customer = ref([]);
    const errors = ref({});
    const router = useRouter();

    const getCustomers = async () => {
        const response = await axios.get("/customer/get-all");
        customers.value = response.data;
    };

    const getCustomer = async (id) => {
        const response = await axios.get("/customer/show/" + id);
        customer.value = response.data.data;
    };

    const store = async (data) => {
        try {
            await axios.post("/customer/create", data, headers);
            await router.push({ name: "customer.index" });
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };

    const update = async (id) => {
        try {
            await axios.put("/customer/update/" + id, customer.value, headers);
            await router.push({ name: "customer.index" });
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };

    const destroy = async (id) => {
        if (!window.confirm("Are You Sure?")) {
            return;
        }
        await axios.delete("/customer/delete/" + id, headers);
        await getCustomers();
    };

    return {
        customer,
        customers,
        getCustomer,
        getCustomers,
        store,
        update,
        destroy,
        errors,
    };
}