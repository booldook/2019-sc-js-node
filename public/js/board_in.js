function sendChk() {
  var f = document.querySelector("form[name='sendForm']");
  console.log(f.comment.value);
  if(f.comment.value == "") {
    alert("도서 제목을 입력하세요.");
    f.comment.focus();
    return false;
  }
  if(f.comment.value.length < 2) {
    alert("제목은 두글자 이상이어야 합니다.");
    f.comment.focus();
    return false;
  }
  return true;
}