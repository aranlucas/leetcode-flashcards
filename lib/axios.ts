import Axios from "axios";

import { showNotification } from "@mantine/notifications";

export const axios = Axios.create();

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const message = error.response?.data?.message || error.message;
    showNotification({
      title: "Error",
      message,
    });

    return await Promise.reject(error);
  }
);
