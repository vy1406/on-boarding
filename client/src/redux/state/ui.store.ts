export interface uiInterface {
  loginInput: any;
  path: string;
  currentSelectedMenuBtn: string;
  isModalOpen: boolean;
  modalInfo: any;
  theme: any;
  loggedUser: any;
  isAuthenticated: boolean;
  selectedTheme: any;
}

export const uiInitialState: uiInterface = {
  loginInput: {
    password: "",
    username: "",
    isShowPassword: false,
  },

  selectedTheme: "dark",
  path: "",
  currentSelectedMenuBtn: "HOME",
  isModalOpen: false,
  modalInfo: {},
  theme: "dark",
  isAuthenticated: false,
  loggedUser: {user_id: 1, username: "testing"}
}
