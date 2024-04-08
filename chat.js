const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function getCurrentTimestamp() {
  const now = new Date();
  return `${now.toISOString()} `;
}

// 로그 기록
const fs = require('fs');

function procFile(message) {
  fs.appendFile('log.txt', getCurrentTimestamp() + message + '\n', (err) => {
    if (err) {
      console.error('파일을 쓰는 동안 오류가 발생했습니다:', err);
    } else {
      console.log(`파일이 성공적으로 쓰여졌습니다.`);
    }
  });
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message); // 받은 메시지

    // 받은 메시지를 모든 클라이언트에게 보냄
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
        procFile(message);
      }
    });
  });
});

const port = 8080;

// 정적 파일 제공
app.use(express.static('./'));


// 루트 경로에 대한 라우트 설정
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
