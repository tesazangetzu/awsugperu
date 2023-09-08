const localStorageCustom = (key: string) => {
  return typeof window !== "undefined" ? localStorage.getItem(key) : false;
};

export default localStorageCustom;
