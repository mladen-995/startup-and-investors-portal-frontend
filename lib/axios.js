import axiosPackage from "axios";

const axiosInstance = axiosPackage.create({
  baseURL: "http://localhost:3001/api/",
});

const setToken = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export { axiosInstance, setToken };
