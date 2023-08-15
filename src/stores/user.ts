import { defineStore } from "pinia";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  phoneNumber: string;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [
      {
        id: 1,
        firstName: "Grigori",
        lastName: "Sargsyan",
        avatar: "",
        role: "начальник",
        phoneNumber: ""
      },
    ],
    isFullNameVisible: true
  }),
  getters: {
    getIsFullNameVisible: (state) => state.isFullNameVisible,
  },
  actions: {
    toggleFullNameVisibility() {
      this.isFullNameVisible = !this.isFullNameVisible;
    },
    deleteUser(userId: number) {
      this.users = this.users.filter((user) => user.id !== userId);
    }
  }
});
