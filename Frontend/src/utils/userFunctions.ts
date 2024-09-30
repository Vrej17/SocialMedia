import { postedUserType } from "../dataTypes";

export const getUser = async (userId: string) => {
  const response = await fetch(`/user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return;
  }
  const data: postedUserType = await response.json();

  return data;
};
