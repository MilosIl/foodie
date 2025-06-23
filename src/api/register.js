import { axiosInstance } from "@/api/axiosInstance";

const register = async (userData) => {
  try {
    const response = await axiosInstance.post("users/add", {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      username: userData.username,
      password: userData.password,
      age: userData.age || 18,
      phone: userData.phone || "",
      image: userData.image || "https://dummyjson.com/icon/user/512",
      address: userData.address || {
        address: "",
        city: "",
        state: "",
        stateCode: "",
        postalCode: "",
        coordinates: {
          lat: 0,
          lng: 0,
        },
        country: "United States",
      },
      birthDate: userData.birthDate || "1990-01-01",
      gender: userData.gender || "other",
    });

    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export { register };
