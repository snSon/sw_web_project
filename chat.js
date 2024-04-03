// 중요! 소스코드의 경로에 한글이 있으면 안 됨
// npm init -y
// npm install ws

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

function getCurrentTimestamp() {
  const now = new Date();
  return `${now.toISOString()} `;
}

// 로그 기록
const fs = require('fs');
const readline = require('readline');

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

console.log('Chat server is running on ws://localhost:8080');