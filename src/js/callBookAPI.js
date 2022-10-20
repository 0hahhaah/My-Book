import store from "./store/index.js";
import { REST_API_KEY } from "./store/APIs.js";

const $ = (selector) => document.querySelector(selector);

let searchedBookList = [];
let pageNum = 1;

const render = () => {
  const bookListTemplate = searchedBookList
    ? searchedBookList
        .map((item, index) => {
          return `
        <div data-book-id="${index}" class="searched-book-content">
          <img class="pre-book-cover" src=${item.thumbnail}></img>
          <div>
          <p class="fw-bold">${item.title}</p>
          <p><span class="fw-bold">작가</span> ${item.authors}</p>
          <p><span class="fw-bold">출판사</span> ${item.publisher}</p>
          <p><span class="fw-bold">발매일</span> ${item.datetime}</p>
          </div>
        </div>
        `;
        })
        .join("")
    : `<p>검색 결과가 없습니다.</p>`;
  // const bookListTemplate = searchedBookList
  //   .map((item, index) => {
  //     return `
  //   <div data-book-id="${index}" class="searched-book-content">
  //     <img class="pre-book-cover" src=${item.thumbnail}></img>
  //     <div>
  //     <p class="fw-bold">${item.title}</p>
  //     <p><span class="fw-bold">작가</span> ${item.authors}</p>
  //     <p><span class="fw-bold">출판사</span> ${item.publisher}</p>
  //     <p><span class="fw-bold">발매일</span> ${item.datetime}</p>
  //     </div>
  //   </div>
  //   `;
  //   })
  //   .join("");

  $(".searched-book-list").innerHTML = bookListTemplate;

  const pageArrow = `
  <span class="material-symbols-outlined page-down">
  arrow_back_ios
  </span>
  <span class="material-symbols-outlined page-up">
    arrow_forward_ios
  </span>
  `;

  $(".page-btn").innerHTML = pageArrow;
};

// const pageHandler = () => {
//   $(".page-down").addEventListener("click", () => {
//     pageNum--;
//     callBookAPI(bookSearchKeyword);
//   });
//   $(".page-up").addEventListener("click", () => {
//     pageNum++;
//     callBookAPI(bookSearchKeyword);
//   });
// };

const callBookAPI = async (bookSearchKeyword) => {
  await axios({
    method: "GET",
    url: `https://dapi.kakao.com/v3/search/book?page=${pageNum}&query=${bookSearchKeyword}`,
    headers: { Authorization: `KakaoAK ${REST_API_KEY}` },
  })
    .then((res) => {
      searchedBookList = [...res.data.documents];
      render();
    })
    .catch((err) => {
      console.log(err);
    });
};

export default callBookAPI;

//TODO:
// 1. 페이지 핸들러 해결
// 2. 검색 결과 없을 때!
// 3. 선택(클릭)했을때 배경 색깔 변함
// 4. 엄.. 뭐더랑ㅎ 뭐 확인하는 거였는데 기억 안남.. 하다보면 생각나겠지. 아! async await 잘쓴건지 테스트해보기
// 5. 시작 전에 어제 한 일 회고
