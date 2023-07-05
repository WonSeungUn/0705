function getNo() {
    const params = new URLSearchParams(location.search);
    const paramsno = params.get('no');
    const no = parseInt(paramsno);
    return (isNaN(no) || no<1 )? null : no ;
};

async function fetch(no){
    const url = `http://sample.bmaster.kro.kr/contacts/${no}`;
    try {
        return await $.ajax(url);
    } catch (error) {
        console.log(error);
        return null;
    };
};

function printContact (contacts) {
    $('#photo').attr('src', contacts.photo);
    $('#name').text(contacts.name);
    $('#address').text(contacts.address);
    $('#tel').text(contacts.tel);
};