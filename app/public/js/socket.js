const socket = io();

const url = new URL(window.location.href);
const params = url.searchParams;

const urlRoomId = parseInt(params.get('roomId'));
const urlName = params.get('name');

// ルームに入る
socket.on("connect", () => {
  socket.emit("join", { roomId: urlRoomId, name: urlName });
})

// 発言する
document.getElementById("frm-post").addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = document.getElementById("msg");
  if (msg.value === "") {
    return false;
  }

  socket.emit("post", { name: urlName, text: msg.value, time: new Date()});

  // メッセージを送信したら、入力欄を空にする
  msg.value = "";
});

// メッセージを受信する
socket.on("message", (msg) => {
  const list = document.getElementById("msglist");
  const commentDom = document.createElement("div");

  // 時間をhh:mm:ssにフォーマットする
  const msgTime = dayjs(msg.time)
  const msgTimeFormat = msgTime.format('hh:mm:ss')

  // 受診したメッセージをDOMにセットする
  commentDom.innerHTML =
    `
    <div class="faceicon">
      <div class="name">${msg.name}</div>
      <div class="time">${msgTimeFormat}</div>
    </div>
    <div class="chatting">
      <div class="says">
        <p>${msg.text}</p>
      </div>
    </div>`
  list.insertBefore(commentDom, list.firstChild);

  // フェードインするアニメーションを付ける
  commentDom.classList.add('animate__animated', 'animate__fadeInDown');

  // 紙吹雪を降らせる
  for (let i = 0; i < 7; i++) {
    setTimeout(function () {
      party.confetti(document.body);
    }, i * 200);
  }
});

// 画面が表示したら、入力欄にフォーカスする
window.addEventListener('load', () => {
  msg.focus();
  // URLパラメータをDOMにセットする
  document.getElementById("roomid").innerHTML = `ルームID: ${urlRoomId}`;
  document.getElementById("name").innerHTML = `名前: ${urlName}`;
})
