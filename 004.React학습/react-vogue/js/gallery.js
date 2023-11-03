// 보그PJ 갤러리 페이지 gallery.js

var swiper = new Swiper(".mySwiper", {
    // 한번에 보일 슬라이드 수
    slidesPerView: 3,
    // 사이간격
    spaceBetween: 20,
    // 무한루프
    loop: true,
    // 페이지네이션
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // 자동넘기기
    autoplay: {
        delay: 2500,
        // 상호작용(배너움직이기)에 대한 재가동이 없어지지 않음(false)
        disableOnInteraction: false,
    },
    // 넘기기버튼
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // 크기별 화면분기
    breakpoints: {
    // 화면크기 >= 300px
    300: {
      slidesPerView: 1,
      spaceBetween: 0
    },
    // 화면크기 >= 700px
    700: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    // 화면크기 >= 1000px
    1000: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
});