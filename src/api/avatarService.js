import api from "./axios";

export const getAvatars = async () => {
  const response = await api.get("/avatars");
  return response.data;
};

export const updateAvatar = async (avatarName) => {
  await api.patch("/users/me/avatar", {
    avatar: avatarName
  });
};