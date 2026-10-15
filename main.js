let formcreat = document.getElementById("form-create")
let formedit = document.getElementById("form-edit")
let messagecreate = document.getElementById("message-create")
let listgrouptodo = document.getElementById("list-group-todo")
let time = document.querySelector("time-container")
// time
let fullday = document.getElementById("full-day")
let hour = document.getElementById('hour')
let minute = document.getElementById("minute")
let second = document.getElementById("second")
let modal = document.getElementById('modal')
let overly = document.getElementById('overlay')
let closeimg = document.getElementById("close")
let button = document.getElementById("btn")
let edititem = []

// localstorge ga qiymat berish olish
let todos = JSON.parse(localStorage.getItem("list")) ? JSON.parse(localStorage.getItem("list")) : []
if (todos.length) showtodos()
// time
gettime()
function gettime() {
    const now = new Date()
    const data = now.getDate() < 10
        ? "0" + now.getDate()
        : now.getDate()
    const month = now.getMonth() < 9
        ? "0" + (now.getMonth() + 1)
        : now.getMonth() + 1
    const year = now.getFullYear()
    const hours = now.getHours() < 10
        ? "0" + now.getHours()
        : now.getHours()
    const minutes = now.getMinutes() < 10
        ? "0" + now.getMinutes()
        : now.getMinutes()
    const seconds = now.getSeconds() < 10
        ? "0" + now.getSeconds()
        : now.getSeconds()
    fullday.textContent = (`${data}.${month}.${year}`)
    hour.textContent = hours;
    minute.textContent = minutes;
    second.textContent = seconds;
    setInterval(gettime, 1000)
    return (`${hours}:${minutes}/${data}.${month}.${year}`)
}
function showtodos() {
    const todos = JSON.parse(localStorage.getItem("list"))
    listgrouptodo.innerHTML = ""
    todos.forEach((item, i) => {
        listgrouptodo.innerHTML += ` <li class="list-group-item d-flex justify-content-between">${item.Text}
        <div class="todo-icons">
          <span class="opacity-50 me-2">${item.time}</span>
          <i onclick=(editTudo(${i})) class="fa-regular fa-pen-to-square" style="color: rgb(116, 192, 252);"></i>
          <i  onclick=(deletTodo(${i}))  class="fa-solid fa-trash-can fa-buzz" style="color: rgb(246, 0, 0);"></i>
        </div>
      </li>`
    });

}
function showmassage(whare, message) {
    document.getElementById(whare).textContent = message
    setTimeout(() => {
        document.getElementById(whare).textContent = ""
    }, 2500);
}
function settodos() {
    localStorage.setItem("list", JSON.stringify(todos))

}
formcreat.addEventListener("submit", (e) => {
    e.preventDefault()
    const todotexst = formcreat["input-create"].value.trim()
    if (todotexst.length) {
        todos.push({ Text: todotexst, time: gettime(), completed: false })
        formcreat.reset()
        settodos()
        showtodos()
    }
    else {
        showmassage("message-create", "Iltimos maydoni toldiring!!!")
    }

})
function deletTodo(id) {

    const deletTodo = todos.filter((item, i) => {
        return i !== id
    })
    todos = deletTodo
    settodos()
    showtodos()
}
function editTudo(id) {
    open()
    edititem = id


}
function open() {
    modal.classList.remove("hidden")
    overly.classList.remove("hidden")
}
function close() {
    modal.classList.add("hidden")
    overly.classList.add("hidden")
}


formedit.addEventListener("submit", (e) => {
    e.preventDefault()
    const todotexst = formedit["input-edit"].value.trim()
    if (todotexst.length) {
        todos.splice(edititem, 1, { Text: todotexst, time: gettime(), completed: false })
        formedit.reset()
        settodos()
        showtodos()
    }
    else {
        showmassage("message-edit", "Iltimos maydoni toldiring!!!")
    }

})
overly.addEventListener("click", close)
closeimg.addEventListener("click", close)
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        close()
    }

    if (e.key === "Enter" && !modal.classList.contains("hidden")) {
        e.preventDefault()
        close()
    }
})
button.addEventListener("click", function name() {
      modal.classList.add("hidden")
    overly.classList.add("hidden")
}
)