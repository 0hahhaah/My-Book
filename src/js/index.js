import store from "./store/index.js";
import callBookAPI from "./callBookAPI.js";

const $ = (selector) => document.querySelector(selector);

function App() {
  this.bookList = {
    title: "",
    authors: [],
    publisher: "",
    datetime: "",
  };

  // this.init = () => {
  //   if (store.getLocalStorage()) {
  //     this.bookList = store.getLocalStorage();
  //   }
  //   renderMyBook();
  //   initEventListeners();
  // };
  let bookSearchKeyword = "";

  const renderMyBook = () => {};

  // 책 제목 입력한거 받아오기
  const getSearchKeyword = async () => {
    if ($(".book-search-input").value == "") {
      alert("값을 입력해주세요");
      return;
    }

    bookSearchKeyword = $(".book-search-input").value;
    await callBookAPI(bookSearchKeyword);
  };

  // 아!! 알았다
  // 검색 함수 만들어서 -> 그 안에 위에거 넣고 -> ~~~이렇게 하는거임. ok~~

  // 검색 누름 -> input 값 가져와서 api 호츌 -> 로컬스토리지에 값 저장 -> 리스트 렌더링

  // 엔터키로 검색
  $(".book-search-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      getSearchKeyword();
    }
  });

  // 책 검색 버튼
  $(".book-search-btn").addEventListener("click", () => {
    getSearchKeyword();
  });
}

// App();
const app = new App();
// app.init();

// TODO
// 검색 함수 정리
// 검색 결과 값 저장
// 저장 한 결과 렌더링
// 아! 렌더 위치가 필요하군ㅋㅋㅋ

// 화살표(next page)가 같이 render 되는게 아니라 원래 있는데 안보이게 해놨다가
// 목록 길이가 > 0 되면 visible 되는걸로.
