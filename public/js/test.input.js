function sendChk() {
  var f = document.querySelector("form[name='sendForm']");
  console.log(f.bookName.value);
  if(f.bookName.value == "") {
    alert("도서 제목을 입력하세요.");
    f.bookName.focus();
    return false;
  }
  if(f.bookName.value.length < 2) {
    alert("제목은 두글자 이상이어야 합니다.");
    f.bookName.focus();
    return false;
  }
  return true;
}