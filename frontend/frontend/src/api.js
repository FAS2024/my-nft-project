import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",  // Replace with your backend URL
});

export const getWalletData = async () => {
    try {
        const response = await api.get("/wallet");
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
