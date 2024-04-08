// express 설치
// npm init -y
// npm install express

const express = require('express'); // express
const app = express(); // app이 express()로 만들어져서 서버의 기능을 가짐.
const path = require('path');
const port = 3000;

// POST를 처리하기 위한 부분
app.use(express.urlencoded({ extended: true })); // config를 바꿔주는 부분
app.use(express.json()); // json사용

// localhost:3000에 접속하면 index.html이 보임
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); //response에 sendFile을 해줌.
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
