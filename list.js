// http://localhost:5500/contacts?pageno=값


function getPageno() {
    const params = new URLSearchParams(location.search);
    const paramsno = params.get('pageno');
    const pageno = parseInt(paramsno);
    // pageno가 없거나 숫자로 바꿀 수 없는 값인 경우 parseInt의 결과는 NaN(Not a Number)
    // NaN를 비교하면 무조건 false(Js에서 NaN은 비교되는 값이 아니다)
    // NaN와 비교할 때는 isNaN() 함수를 사용해야 한다.
    // 지금 여기서 isNaN(pageno)가 null 까지 잡아줌
    return isNaN(pageno) || pageno <0 ? 1: pageno ;
}

// 기본 매개변수(default parameter)
async function fetch (pageno=1, pagesize=10) {
    const API = 'http://sample.bmaster.kro.kr/contacts'
    const url = `${API}?pageno=${pageno}&pagesize=${pagesize}`
    // $.ajax 는 비동기처리되는 코드 → 언제 끝날지 모른다
    // 비동기코드를 리턴 받는 것은 '미래에 값이 들어올 것이다' 라는 값을 가진다 
    // 이것을 Promise 객체라고 한다.
    try {
        return await $.ajax(url);
    } catch (error) {
        console.log(error);
        return null;
    };
};

function printContacts ({contacts}){
    const $tbody = $('#tbody');
    for(const c of contacts) {
        const html = `
            <tr>
            <td>${c.no}</td>
            <td><a href ="read.html?no=${c.no}">${c.name}</a></td>
            <td>${c.address}</td>
            <td>${c.tel}</td>
            </tr>
        `;
        $tbody.append(html);
    };
};

//pagination 에 필요한 prev, start, end, next, pageno를 리턴하는 함수

// getPagination(result) → result에서 pageno, pagesize, totalcount 를 꺼내는 문법
// 구조분해할당

function getPagination({pageno, pagesize, totalcount, blocksize=5}){
    // 페이지의 개수 계산
    const countofpage = Math.ceil(totalcount/pagesize);

    // prev , start, end, next 를 계산한 다음 목록의 끝에 도달한 경우 end , next 를 변경
    const prev = Math.floor((pageno-1)/blocksize) * blocksize;
    const start = prev + 1;
    let end = prev + blocksize;
    let next = end +1;
    if(end >= countofpage){
        end = countofpage;
        next = 0;
    };

    // 구조분해할당 : 객체 → 변수로 분해 , 변수를 모아서 객체를 생성
    // return {prev:prev , start:start , end;end , next:next , pageno:pageno}
    return {prev, start, end, next, pageno};
};

function printPagination ({prev, start, end, next, pageno}) {
    const $pagination = $('#pagination');
    if(prev >0){
        const html = `
        <li class="page-item">
        <a class="page-link" href="list.html?pageno=${prev}">Previous</a>
        </li>
        `;
        $pagination.append(html);
    };

    for(let i =start ; i<=end ; i++){
        let li_class = i === pageno? 'page-item active' : 'page-item';
        const html = `
        <li class="${li_class}">
        <a class="page-link" href="list.html?pageno=${i}">${i}</a>
        </li>
        `
        $pagination.append(html);
    };

    if(next>0){
        const html = `
        <li class="page-item">
        <a class="page-link" href="list.html?pageno=${next}">Next</a>
        </li>
        `;
        $pagination.append(html);
    };
}