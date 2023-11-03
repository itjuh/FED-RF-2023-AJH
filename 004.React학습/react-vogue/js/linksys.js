// 보그 PJ 링크시스템 JS - linksys.js

// 제이쿼리 로드구역 ///////////////////////
$(()=>{
    // 모든 a요소 기본이동 막기
    $('a').click(e=>e.preventDefault());
    // 요구사항 : 각 네비게이션 클릭 시 페이지 이동
    // 1. 대상선정
    // 1-1. GNB메뉴
    const gnb = $('.gnb a, .mognb a');
    // 1-2. 로고이미지
    const logo = $('.logo a');
    // console.log(gnb,logo);

    // 2. 이벤트 설정 및 이동기능 구현하기
    // 2-1. 로고 클릭 시 홈 이동
    logo.click(()=>location.href='index.html');

    // 2-2. gnb메뉴 클릭 시 카테고리 서브이동
    gnb.click(e=>
        location.href='category.html?category='+$(e.target).text().toLowerCase());
    // $(e.target): 이벤트 발생요소(a태그), text(): 문자읽기
    // toLowerCase() : 소문자, toUpperCase() : 대문자
    
    /**********************************************
     * 로그인, 회원가입, 갤러리 아이콘 넣기
     * - 대상 : .sns a:last(마지막 카카오스토리 a요소)
     * - 대상추가 : 모바일모드
     * - 변경내용 : 대상요소 앞에 형제요소로 a요소 추가하기
     * - before(요소) -> 선택요소 앞에 형제요소 추가
     * - after(요소) -> 선택요소 뒤에 형제요소 추가
     **********************************************/
    // $('.sns a:last').before(`<헐></헐>`);
    // $('.sns a:last').after(`<ㅋ></ㅋ>`);

    // 아이콘 넣기
    $('.sns a:last, .mosns a:last').before(`
        <a href="#" class="fi fi-laptop">
            <span class="ir">로그인</span>
        </a>
        <a href="#" class="fi fi-user-secret">
            <span class="ir">회원가입</span>
        </a>
        <a href="#" class="fi fi-camera">
            <span class="ir">갤러리</span>
        </a>
    `);
    // sns파트 a요소에 툴팁넣기
    // 새로 추가 된 a요소까지 다시 선택하여 
    // each()메서드로 돌면서 글자를 읽어와서
    // title속성으로 넣기 attr('title',값)
    $('.sns a, .mosns a').each((idx,ele)=>{
        $(ele).attr('title',$(ele).text().trim());
    }) /////////each///////////////
    // 위에서 이어서 a요소에 링크 설정하기
    .click(function(){
        // 1. 클릭 시 요소 text 읽어오기
        let atxt = $(this).text().trim();
        console.log(atxt);

        // 2. 이동할 페이지 주소할당
        let url;
        switch(atxt){
            // 외부 시스템 페이지
            case '인스타그램' :
                url = 'https://www.instagram.com/VOGUEKOREA/';
                break;
            case '페이스북' :
                url = 'https://www.facebook.com/VOGUEkr';
                break;
            case '트위터' :
                url = 'https://twitter.com/VogueKorea';
                break;
            case '유튜브' :
                url = 'https://www.youtube.com/user/VogueKorea';
                break;
            case '카카오스토리' :
                url = 'https://story.kakao.com/ch/voguekr';
                break;
            // 내부 시스템 페이지
            case '로그인' :
                url = 'login';
                break;
            case '회원가입' :
                url = 'member';
                break;
            case '갤러리' :
                url = 'gallery';
                break;
        } ////////switch case/////////////

        // 3. 페이지 이동하기
        if(atxt == '로그인' ||atxt =='회원가입'||atxt=='갤러리'){
            location.href = url+'.html';
        }else{
            // sns는 새창열기
            window.open(url);
        }
    }); /////////click이벤트 설정/////////

    // 모바일 메뉴박스의 sns링크 4번째에서 줄바꿈 태그 넣기
    $('.mosns a').eq(3).after('<br>');
}); //////////////JQB/////////////////////