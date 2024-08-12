import authApi from "./authAxios";

export const imgUpload = async (formData: FormData) => {
  return await authApi.post("images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
