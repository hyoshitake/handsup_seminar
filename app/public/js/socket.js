const socket = io();

const url = new URL(window.location.href);
const params = url.searchParams;

const urlRoomId = parseInt(params.get('roomId'));
const urlName = params.get('name');

socket.on("connect", () => {
  socket.emit("join", { roomId: urlRoomId, name: urlName });
})

document.getElementById("frm-post").addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = document.getElementById("msg");
  if (msg.value === "") {
    return false;
  }

  socket.emit("post", { name: urlName, text: msg.value });

  msg.value = "";
});

socket.on("message", (msg) => {
  const list = document.getElementById("msglist");
  const li = document.createElement("li");
  li.innerHTML = `${msg.name}:${msg.text}`;
  list.insertBefore(li, list.firstChild);

  li.classList.add('animate__animated', 'animate__fadeInDown');
  party.confetti(li);
  // 10回繰り返す
  for (let i = 0; i < 15; i++) {
    setTimeout(function () {
      party.confetti(li);
    }, i * 200);
  }


});

window.addEventListener('load', () => {
  msg.focus();
})
