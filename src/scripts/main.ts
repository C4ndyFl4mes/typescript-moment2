import { TodoList } from "./classes/todolist";
import { ITodo } from "./interfaces/todo";
import { ErrorHandler } from "./utilities/classes/ErrorHandler";

/**
 * Main klassen kopplar samman hela applikationen.
 */

class Main {
    private static todoListDIV: HTMLElement | null = document.getElementById("todo-list");
    private static taskIINPUT = document.getElementById("task-input") as HTMLInputElement | null;
    private static priorityINPUT = document.getElementById("priority-input") as HTMLInputElement | null;
    private static submitTodoBTN: HTMLElement | null = document.getElementById("submit-todo");
    private static todoList: TodoList;

    // List Controls:
    private static resetListBTN: HTMLElement | null = document.getElementById("reset-tasks-btn");
    private static removeCompletedTasksBTN: HTMLElement | null = document.getElementById("remove-completed-tasks-btn");
    private static showAllTasksBTN: HTMLElement | null = document.getElementById("show-all-tasks-btn");
    private static showOnlyIncompletedTasks: HTMLElement | null = document.getElementById("show-only-incompleted-tasks-btn");

    static init(): void {
        const todos: Array<ITodo> = [];
        this.todoList = new TodoList(todos);
        
        this.submitTodoBTN?.addEventListener("click", () => {
            if (this.taskIINPUT && this.priorityINPUT) {
                if (this.todoList.addTodo(this.taskIINPUT.value.trim(), Number(this.priorityINPUT.value))) {
                    ErrorHandler.removeError("INPUT-0");
                    ErrorHandler.reloadErrors();
                    this.renderTodos(this.todoList.getTodos());
                    this.todoList.saveToLocalStorage();
                    this.taskIINPUT.value = "";
                } else {
                    ErrorHandler.logError("INPUT-0", "Fel vid inmatning", `Antingen är uppdraget eller prioritet fel.`);
                }
            }
        });

        this.resetListBTN?.addEventListener("click", () => {
            this.todoList.reset();
            this.renderTodos(this.todoList.getTodos());
        });

        this.removeCompletedTasksBTN?.addEventListener("click", () => {
            this.todoList.removeCompletedTasks();
            this.todoList.saveToLocalStorage();
            this.renderTodos(this.todoList.getTodos());
        });

        this.showAllTasksBTN?.addEventListener("click", () => {
            this.renderTodos(this.todoList.getTodos());
        });

        this.showOnlyIncompletedTasks?.addEventListener("click", () => {
            this.renderTodos(this.todoList.showOnlyIncompletedTasks());
        });

        this.todoList.loadFromLocalStorage();
        this.renderTodos(this.todoList.getTodos());
    }

    /**
     * Renderar ut alla todos på webbsidan.
     * @param todos en lista av todos.
     */
    private static renderTodos(todos: Array<ITodo>): void {
        this.todoListDIV!.innerHTML = "";
        todos.forEach(todo => {
            const todoDIV: HTMLElement = document.createElement("div");
            todoDIV.className = "todo-item";
            todoDIV.style.borderLeftColor = `#${todo.hexID}`;
            todoDIV.style.borderRightColor = `#${todo.hexID}`;

            const priorityH3: HTMLElement = document.createElement("h3");
            todo.priority ? priorityH3.textContent = String(todo.priority) : ErrorHandler.logError("OUTPUT-0", "Fel vid utmatning", "Kunde inte skriva ut priority.");
            
            const taskLABEL: HTMLElement = document.createElement("label");
            taskLABEL.setAttribute("for", todo.hexID);
            taskLABEL.textContent = todo.task;

            
            const completedINPUT = document.createElement("input") as HTMLInputElement;
            completedINPUT.className = "todo-checkbox";
            completedINPUT.id = todo.hexID;
            completedINPUT.type = "checkbox";
            completedINPUT.checked = todo.completed;

            completedINPUT.addEventListener("change", () => {
                const index: number = todos.indexOf(todo);
                if (index !== -1) {
                    this.todoList.markTodoCompleted(index);
                }
            });
            

            todoDIV.appendChild(priorityH3);
            todoDIV.appendChild(taskLABEL);
            todoDIV.appendChild(completedINPUT);
            this.todoListDIV?.appendChild(todoDIV);
        });
    }
}

Main.init(); // Initierar applikationen.