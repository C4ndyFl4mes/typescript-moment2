import { TPriority } from "../utilities/types";
import { toTPriority } from "../utilities/functions";
import { ITodo } from '../interfaces/todo';
import { UStorage } from "../utilities/classes/Storage";
import { ErrorHandler } from "../utilities/classes/ErrorHandler";

/**
 * En klass som lagrar todos.
 */

export class TodoList {
    private todos: Array<ITodo>;

    /**
     * Initierar todolistan.
     * @param todos - lista av todos.
     */
    constructor(todos: Array<ITodo>) {
        this.todos = todos;
        if (UStorage.hasItem("todos")) {
            this.loadFromLocalStorage();
        }
    }

    /**
     * Lägger till en todo till TodoList.
     * @param task - beskrivning av uppgiften.
     * @param priority - prioritet.
     * @returns inmatningen var korrekt eller inte.
     */
    public addTodo(task: string, priority: number): boolean {
        const prio: TPriority | null = toTPriority(priority);
        if (prio && task.length <= 100) {
            const todo: ITodo = {
                task: task,
                completed: false,
                priority: prio,
                hexID: this.randomHexID()
            };
            this.todos.push(todo);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Slumpar fram hexadecimala strängar.
     * @returns ett unikt slumpat hexadecimal sträng.
     */
    private randomHexID(): string {
        const hexID: string = Math.floor(Math.random() * 4095).toString(16).padStart(3, "0");
        if (this.todos.find(todo => todo.hexID === hexID)) {
            this.randomHexID();
        }
        return hexID;
    }

    /**
     * Markerar en todo som avklarad.
     * @param todoIndex - vilken todo det handlar om.
     */
    public markTodoCompleted(todoIndex: number): void {
        if (todoIndex >= 0 && todoIndex < this.todos.length) {
            this.todos[todoIndex].completed ? this.todos[todoIndex].completed = false : this.todos[todoIndex].completed = true; // Jag vill att det ska gå att toggla.
            this.saveToLocalStorage();
        } else {
            console.error(`Invalid todoIndex: ${todoIndex}.`);
        }
    }

    /**
     * Hämtar todolistan.
     * @returns 
     */
    public getTodos(): Array<ITodo> {
        return this.todos;
    }

    /**
     * Sparar todolistan i localStorage.
     */
    public saveToLocalStorage(): void {
        UStorage.setItem<Array<ITodo>>("todos", this.todos);
    }

    /**
     * Laddar in todolistan från localStorage.
     */
    public loadFromLocalStorage(): void {
        const loadedTodos: Array<ITodo> | null = UStorage.getItem<Array<ITodo>>("todos");
        loadedTodos ? this.todos = loadedTodos : ErrorHandler.logError("LS-Todo-0", "Tom lista", "Det finns inga todos ännu!");
    }
}