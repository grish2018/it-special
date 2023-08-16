import { defineStore } from "pinia";
import { UserState } from "@/types/store/user"; 

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    users: [
      {
        id: 1,
        firstName: "Grigori",
        lastName: "Sargsyan",
        avatar: "",
        role: "начальник",
        phoneNumber: "",
      },
    ],
    isFullNameVisible: true,
  }),
  actions: {
    deleteUser(userId: number) {
      this.users = this.users.filter((user) => user.id !== userId);
    },
  },
});
