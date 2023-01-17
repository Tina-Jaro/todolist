import "./Home.css";


function Home() {
    var task_toggles = document.getElementsByClassName("task_toggle");
    const task_toggle_function = (numb) => {
   for (let i = 0; i < task_toggles.length; i++) {
       if (i === numb) {
           task_toggles[numb].className += " active_toggle";
       }
       else {
           task_toggles[i].className = "task_toggle";
       }
   }
}
var taskList = []
const fetchToDoList = () => {
   var retrievedToDoList = localStorage.getItem("todoList");
   taskList = JSON.parse(retrievedToDoList);
}
fetchToDoList();

var taskCounter;
var task_info = document.getElementById('taskInfo');
const countTasks = () => {
   if (taskList === null || taskList === 0) {
       taskCounter = 0;
        task_info.style.display = "block";
   }
   else {
       taskCounter = taskList.length;
      task_info.style.display = "none";
   }
   if (taskCounter > 1) {
     document.getElementById("item_count").innerHTML = taskCounter + " items left";
   } else {
    document.getElementById("item_count").innerHTML = taskCounter + " item left";
   }
}
// countTasks();

const addToDoTask = (todoItem) => {
   if (taskList == null) {
       taskList = [];
       taskList.length = 0;
   }
   document.getElementById("taskholder").innerHTML = "";
   countTasks();
   taskList[taskCounter] = todoItem;
   countTasks();
   console.log(taskList);
   localStorage.setItem("todoList", JSON.stringify(taskList));

   displayNewToDoTask();

}

const createNewTask = () => {
   var newTask = document.getElementById("newtask").value;
   if (document.getElementById("create_todo").checked && newTask !== "") {
       addToDoTask(newTask);
       document.getElementById("newtask").value = "";
       document.getElementById("create_todo").checked = false;
   }
   else {
       console.log("It's empty");
       //document.getElementById("create_todo").style.border = "2px solid red";
       document.getElementById("create_todo").checked = false;

   }
}


const displayNewToDoTask = () => {
   var task_holder = document.getElementById("taskholder");
   for (let i = 0; i < taskCounter; i++) {
       const task_container = document.createElement('div');
       task_container.classList.add("task");
       task_container.id = "task" + i;


       const text_container = document.createElement('span');
       text_container.classList.add("textpart");

       const Input_Element = document.createElement("input");
       Input_Element.type = 'checkbox';
       Input_Element.name = ('name', 'check_task');
       Input_Element.id = "input" + i;

       const label_Element = document.createElement("label");
       label_Element.setAttribute("for", "input" + i);
       const label_Text = document.createTextNode(taskList[i]);
       label_Element.appendChild(label_Text);

       const image_container = document.createElement('span');
       image_container.classList.add("picture_part");

       const cancel_Image = document.createElement('img');
       cancel_Image.src = "./images/icon-cross.svg";
       cancel_Image.classList.add("btn_cancel");
       cancel_Image.id = "" + i;
       cancel_Image.onclick = function () {
           deleteIndividualToDo(this.id);
       }
       text_container.appendChild(Input_Element);
       text_container.appendChild(label_Element);

       image_container.appendChild(cancel_Image);

       task_container.appendChild(text_container);
       task_container.appendChild(image_container);

       task_holder.append(task_container);
   }
}
displayNewToDoTask();

var showing_items = 0;
const setItemNumber = () => {
   if (showing_items > 1) {
       document.getElementById("item_count").innerHTML = showing_items + " items";
   } else {
       document.getElementById("item_count").innerHTML = showing_items + " item";
   }
}

const showActiveTodo = () => {
   var checkboxes = document.getElementsByName("check_task");
   var tasks = document.getElementsByClassName("task");
   displayAll()
   showing_items = checkboxes.length;
   for (let i = 0; i < checkboxes.length; i++) {
       if (checkboxes[i].checked === true) {

       tasks[i].style.display = 'none';
           showing_items = showing_items - 1;
       }
   }
   task_toggle_function(1);
   setItemNumber();
}

const showCompletedTodo = () => {
   var checkboxes = document.getElementsByName("check_task");
   var tasks = document.getElementsByClassName("task");
   displayAll();
   showing_items = checkboxes.length;
   for (let i = 0; i < checkboxes.length; i++) {
       if (checkboxes[i].checked === false) {

      tasks[i].style.display = 'none';
           showing_items = showing_items - 1;
       }
   }
   task_toggle_function(2);
   setItemNumber();
}

const displayAll = () => {
   var tasks = document.getElementsByClassName("task");
   for (let i = 0; i < tasks.length; i++) {
     tasks[i].style.display = 'flex';
   }
   task_toggle_function(0);
   countTasks();
}

const deleteCompletedToDos = () => {
   var checkboxes = document.getElementsByName("check_task");
   var tasks = document.getElementsByClassName("task");
   displayAll();
   //console.log(tasks.length);
   for (let i = 0; i < checkboxes.length; i++) {
       if (checkboxes[i].checked === true) {
           //console.log(taskList[i]);
           taskList.splice(i, 1);
           localStorage.setItem("todoList", JSON.stringify(taskList));
           tasks[i].remove();
       }
   }
   task_toggle_function(0);
   countTasks();
}

const deleteIndividualToDo = (num) => {
   taskList.splice(num, 1);
   localStorage.setItem("todoList", JSON.stringify(taskList));
   var selected_task = document.getElementById("task" + num);
   selected_task.remove();
   displayAll();
   countTasks();
}
    return (
        <div className="container">
            <div className="container_top">
                <h1>TO-DO LIST</h1>
            </div>
            <div className="task_inserter">
                <div className="toptask">
                    <span>
                        <input type="checkbox" name="create_todo" id="create_todo" onClick={createNewTask} />
                            <label for="create_todo"></label>
                            <input type="text" id="newtask" placeholder="Enter a new todo..." />
                    </span >
                </div>
                        <div id="taskdisplay" className="taskdisplay">
                            <div id="taskInfo" className="taskInfo">
                                Your todo list will appear here!!!
                            </div>
                            <div id="taskholder">
                            </div>

                            <div className="bottom_control">
                                <p id="item_count">0 item left</p>
                                <ul>
                                    <li className="task_toggle active_toggle" onClick={displayAll}>All</li>
                                    <li className="task_toggle" onClick={showActiveTodo}>Active</li>
                                    <li className="task_toggle" onClick={showCompletedTodo}>Completed</li>
                                </ul>
                                <p id="clear_completed" onClick={deleteCompletedToDos}>Clear Completed</p>
                            </div>
                        </div>
                </div>
            </div>
        
    );
}

export default Home;
