export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role || "guest"; // "admin" | "restaurant" | "guest"
};
