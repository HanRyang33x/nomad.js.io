//background
const backgroundImg = ["pic1", "pic2", "pic3"];
const backgroundRan = Math.floor(Math.random() * backgroundImg.length);
const backgroundEl = document.querySelector(".allWrap");
function loadingBackground() {
  backgroundEl.classList.add(`${backgroundImg[backgroundRan]}`);
}
loadingBackground();

//현재시간
const timeEl = document.querySelector("#time p");

function nowTime() {
  nowHours = new Date().getHours();
  nowMin = new Date().getMinutes();
  nowSec = new Date().getSeconds();
  const time = nowHours.toString();
  const min = nowMin.toString();
  const sec = nowSec.toString();
  const timePd = time.padStart(2, "0");
  const minPd = min.padStart(2, "0");
  const secPd = sec.padStart(2, "0");
  timeEl.innerText = `${timePd} : ${minPd} : ${secPd}`;
}

nowTime();
setInterval(() => {
  nowTime();
}, 1000);

//로컬 로그인
const userIdEl = document.querySelector("#loginBox .logout input");
const userForm = document.querySelector("#loginBox form");
const loginEl = document.querySelector(".logined");
const loginTextEl = document.querySelector(".logined p");
const logoutEl = document.querySelector(".logout");

function login(e) {
  e.preventDefault();
  let userId = userIdEl.value;
  if (userId != "") {
    localStorage.setItem("id", userId);
    logoutEl.classList.add("hide");
    loginEl.classList.remove("hide");
    loginTextEl.innerText = userId;
  } else {
    alert("이름을 입력하세요");
  }
}

function ckLogined() {
  const key = localStorage.getItem("id");
  if (key != null) {
    logoutEl.classList.add("hide");
    loginEl.classList.remove("hide");
    loginTextEl.innerText = key;
  }
}

ckLogined();
userForm.addEventListener("submit", login);

//to do list
const todoInputEl = document.querySelector("#toDo input");
const todoForm = document.querySelector("#toDo form");
const todoUlEl = document.querySelector("#toDoList");
const delEl = document.querySelector("#toDoList li button");
const saved = localStorage.getItem("todoList");

let todoListArr = [];
let letid = Date.now();

function saveTodo(e) {
  e.preventDefault();
  letid = Date.now();
  if (todoInputEl.value != "") {
    todoUlEl.classList.remove("hide");
    todoListArr.push({
      key: letid,
      val: todoInputEl.value,
    });
    localStorage.setItem("todoList", JSON.stringify(todoListArr));
    paintList(todoInputEl.value, letid);
    todoInputEl.value = null;
  }
}

function paintList(todotext, todoId) {
  const liEl = document.createElement("li");
  const spanEl = document.createElement("span");
  const buttonEl = document.createElement("button");
  buttonEl.innerText = "X";
  spanEl.innerText = todotext;
  liEl.append(spanEl);
  liEl.append(buttonEl);
  liEl.classList.add(todoId);
  todoUlEl.append(liEl);
  buttonEl.addEventListener("click", del);
}

function loadTodo() {
  if (saved != null) {
    todoListArr = JSON.parse(saved);
    todoUlEl.classList.remove("hide");
    JSON.parse(saved).forEach((item) => {
      paintList(item.val, item.key);
    });
  }
}
function del(e) {
  const targetEl = e.target.parentElement;
  const liId = e.target.parentElement.classList.value;
  todoListArr = todoListArr.filter((val) => val.key != liId);
  localStorage.setItem("todoList", JSON.stringify(todoListArr));
  targetEl.remove();
}

loadTodo();
todoForm.addEventListener("submit", saveTodo);

//날씨 apikey 활성화.. 필요
const APIKEY = "3ccfdb873022eb6d217c93261bd0eb10";
function onGeo(pos) {
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${APIKEY}&units=metric`;
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      const weatherName = document.querySelector(".location");
      const weatherBox = document.querySelector(".we");
      const weatherTemp = document.querySelector(".temp");
      const name = data.name;
      const weather = data.weather[0].main;
      const temp = data.main.temp;
      weatherName.innerText = name;
      weatherBox.innerText = weather;
      weatherTemp.innerText = temp;
    });
}
function onGeoErr() {
  console.log("err");
}
navigator.geolocation.getCurrentPosition(onGeo, onGeoErr);

//console.log(data.name, data.weather[0].main
