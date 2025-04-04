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

    static init(): void {
        const todos: Array<ITodo> = [];
        const todoList = new TodoList(todos);
        
        this.submitTodoBTN?.addEventListener("click", () => {
            if (this.taskIINPUT && this.priorityINPUT) {
                if (todoList.addTodo(this.taskIINPUT.value.trim(), Number(this.priorityINPUT.value))) {
                    ErrorHandler.removeError("INPUT-0");
                    ErrorHandler.reloadErrors();
                    this.renderTodos(todoList);
                    todoList.saveToLocalStorage();
                } else {
                    ErrorHandler.logError("INPUT-0", "Fel vid inmatning", `Antingen är uppdraget eller prioritet fel.`);
                }
            }
        });

        todoList.loadFromLocalStorage();
        this.renderTodos(todoList);
    }

    /**
     * Renderar ut alla todos på webbsidan.
     * @param todoList instansen av TodoList.
     */
    private static renderTodos(todoList: TodoList): void {
        this.todoListDIV!.innerHTML = "";
        todoList.getTodos().forEach(todo => {
            const todoDIV: HTMLElement = document.createElement("div");
            todoDIV.className = "todo-item";

            const priorityH2: HTMLElement = document.createElement("h2");
            todo.priority ? priorityH2.textContent = String(todo.priority) : ErrorHandler.logError("OUTPUT-0", "Fel vid utmatning", "Kunde inte skriva ut priority.");
            
            const taskLABEL: HTMLElement = document.createElement("label");
            const taskSPAN: HTMLElement = document.createElement("span");
            taskSPAN.textContent = todo.task;

            const completedINPUT = document.createElement("input") as HTMLInputElement;
            completedINPUT.type = "checkbox";
            completedINPUT.checked = todo.completed;

            taskLABEL.appendChild(taskSPAN);
            taskLABEL.appendChild(completedINPUT);

            todoDIV.appendChild(priorityH2);
            todoDIV.appendChild(taskLABEL);

            this.todoListDIV?.appendChild(todoDIV);
        });
    }
}

Main.init(); // Initierar applikationen.