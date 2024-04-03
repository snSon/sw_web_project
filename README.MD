<h1>현재 수정 사항.</h1>
<ol>
  <li>중앙정렬
  <li>디자인수정
  <li>닉네임칸만들기 (id ="nickname")
  <li>채팅아래로 내림
  <li>채팅창 박스
  <li>배경색
  <li>버튼크기, input크기 변경


</ol>

<ol>
  <li> 색 변경 코드 : 
  <li> const nicknameInput = document.getElementById('nickname'); 추가
  <li> message.style.color = chooseColor(nicknameInput.value); 추가
  <li> function chooseColor(nickname) {
  <li>      const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#00FFFF', '#0000FF', '#800080', '#000000'];
  <li>      const sum = nickname.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  <li>      const colorIndex = sum % colors.length;
  <li>      return colors[colorIndex];
  <li>  } 추가
</ol>
