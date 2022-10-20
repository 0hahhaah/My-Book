const store = {
  setLocalStorage(bookList) {
    localStorage.setItem("bookList", JSON.stringify(bookList));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("bookList"));
  },
};

export default store;
