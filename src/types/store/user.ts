export interface User {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    role: string;
    phoneNumber: string;
  }
  
  export interface UserState {
    users: User[];
    isFullNameVisible: boolean;
  }

  export type UserList = User[]

  export type DeleteUserFunction = (userId: number) => void;

  export type ToggleFullNameVisibility = () => void;