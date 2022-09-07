let authProvider = {
  login: (): void => localStorage.setItem("isLoggedIn", "true"),
  isAuthenticated: (): boolean => localStorage.getItem('isLoggedIn') === 'true',
  logout: () => localStorage.clear(),
  setUserInfo: (userName: string): void => localStorage.setItem('userName', userName),
  getUserName: (): string => localStorage.getItem('userName') || '',
};

export default authProvider;