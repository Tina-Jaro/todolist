import "./Home.css";

function Home() {
    return (
        <div class="container">
            <div class="container_top">
                <h1><marquee>TO-DO LIST</marquee></h1>
                {/* <h3><p>What's the plan for today?</p></h3> */}
            </div>
            <div class="task_inserter">
                <div class="toptask">
                    <span>
                        <input type="checkbox" name="create_todo" id="create_todo" onclick="createNewTask()" />
                            <label for="create_todo"></label>
                            <input type="text" id="newtask" placeholder="Enter a new todo..." />
                    </span >
                </div>
                        <div id="taskdisplay" class="taskdisplay">
                            <div id="taskInfo" class="taskInfo">
                                Your todo List will be appear here!!!
                            </div>
                            <div id="taskholder">
                            </div>

                            <div class="bottom_control">
                                <p id="item_count">0 item left</p>
                                <ul>
                                    <li class="task_toggle active_toggle" onclick="displayAll()"><a href="#">All</a></li>
                                    <li class="task_toggle" onclick="showActiveTodo()"><a href="#">Active</a></li>
                                    <li class="task_toggle" onclick="showCompletedTodo()"><a href="#">Completed</a></li>
                                </ul>
                                <p id="clear_completed" onclick="deleteCompletedToDos()">Clear Completed</p>
                            </div>
                        </div>
                </div>
            </div>
        
    );
}

export default Home;
