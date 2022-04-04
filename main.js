const inputBox = document.querySelector(".input_field input")
const addBtn = document.querySelector(".input_field button")
const todoList = document.querySelector(".todoList")
const delBtn = document.querySelector(".footer button")
// bắt sự kiện khi nhập vào ô text
inputBox.onkeyup = ()=>{
    // lấy giá trị khi người dùng nhập vào
  let userEnteredValue = inputBox.value;
  //nếu user nhập vào value ( không phải là khoảng trắng)
  if(userEnteredValue.trim() != 0){
      addBtn.classList.add("active");// nút add sẽ sáng lên
  }else {
      addBtn.classList.remove("active");  // ngươc lại sẽ k sáng
   }   
}

showTask();
// hàm tương tác với nút add
addBtn.onclick = ()=>{
    let userEnteredValue = inputBox.value;
    let getLocalStorageData = localStorage.getItem("New todo");
       // nếu LocalStorage = null thì sẽ tạo 1 mảng rỗng
    if(getLocalStorageData == null){
       listArray = [];
    } else{  // ngược lại thì sẽ chuyển JSON từ dạng string sang Object
         listArray = JSON.parse(getLocalStorageData);
    }

    // đẩy value mới vào mảng đã tạo
    listArray.push(userEnteredValue);
    localStorage.setItem("New todo", JSON.stringify(listArray));//chuyển JSON từ dạng Object sang string

    showTask();
    addBtn.classList.remove("active");
}


function showTask(){
    let getLocalStorageData = localStorage.getItem("New todo");
       // nếu LocalStorage = null thì sẽ tạo 1 mảng rỗng
    if(getLocalStorageData == null){
       listArray = [];
    } else{  // ngược lại thì sẽ chuyển JSON từ dạng string sang Object
         listArray = JSON.parse(getLocalStorageData);
    }

    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length;
    if(listArray.length > 0){
        delBtn.classList.add("active");
    } else {
        delBtn.classList.remove("active");
    }

    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li> ${element} <span class="icon" onclick="delTask(${index})"><i class="fa-solid fa-trash-can"></i> </span> </li>`
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
}

function deleteTask(index){
    let getLocalStorageData = localStorage.getItem("New todo");
    listArray = JSON.parse(getLocalStorageData)
    listArray.splice(index, 1);
    localStorage.setItem("New todo", JSON,stringify(listArray));
    showTask();
}

delBtn.onclick = ()=>{
    listArray = [];
    localStorage.setItem("New todo", JSON.stringify(listArray));
    showTask();
}