import { TPriority } from "../utilities/types";
import { toTPriority } from "../utilities/functions";
import { ITodo } from '../interfaces/todo';

/**
 * En klass som lagrar todos.
 */

export class TodoList {
    private todos: Array<ITodo>;

    constructor(todos: Array<ITodo>) {
        this.todos = todos;
    }

    public addTodo(task: string, priority: number): boolean {
        const prio: TPriority | null = toTPriority(priority);
        if (prio && task.length <= 100) {
            const todo: ITodo = {
                task: task,
                completed: false,
                priority: prio
            };
            this.todos.push(todo);
            return true;
        } else {
            return false;
        }
    }
}