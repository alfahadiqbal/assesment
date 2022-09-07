const authProvider = {
  // authentication
  login: (params: any) => Promise.resolve(/* ... */),
  isAuthenticated: (): boolean => {
    console.log( localStorage.getItem('isLoggedIn') === 'true', "isLoggedIn");
    return localStorage.getItem('isLoggedIn') === 'true';
  },
  logout: () => localStorage.clear(),
};

export default authProvider;