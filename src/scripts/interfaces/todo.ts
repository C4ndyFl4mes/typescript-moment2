import { TPriority } from "../utilities/types";

/**
 * Ett interface för todo.
 */

export interface ITodo {
    task: string;               // Beskrivning av uppgiften. Text, en sträng.
    completed: boolean;         // Om uppgiften är avklarad eller inte. Sant eller falskt, en boolean.
    priority: TPriority;        // Prioritet, 1 hösta och 3 lägsta. Tillåter endast värdena 1, 2 och 3, en union type.
    hexID: string;              // Ett hexadecimalt id som används för att koppla checkbox med task och en cool grej med färger.
}