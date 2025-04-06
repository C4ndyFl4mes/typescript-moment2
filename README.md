# Att göra-lista

## Main
Klassen Main är en utility klass som knyter samman applikationen. Metoden init initirerar en kontakt mellan gränssnittets knappar och inmatningsfält till de resterande klasser och deras metoder som ska hantera listan.
```ts
Main.init();
```
Flera privata, statiska variabler är deklarerade i Main som HTMLElement och HTMLInputElement, även TodoList-objektet deklrareras men tilldelas ett värde i metoden init.
Knappen för att lägga till en todo till listan tar värdena ur HTMLInputElementen och kontrollerar att de finns och därefter anropas addTodo med TodoList-objektet inuti en if-sats.
If-satsen kontrollerar att det returnerades true eller false beroende på hur det gick i addTodo.
```ts
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
```
Metoden renderTodos är en privat metod inne i Main klassen. Den tar parametern Array<ITodo> där ITodo är det interface som är kontraktet för ett todo-objekt.
ITodo har följande egenskaper: task (sträng), completed (boolean), prioritet (TPriority) och hexID (sträng av ett tre-siffrigt hexadecimalt värde).
TPriority är en Type Union som endast kan vara värdena 1, 2 eller 3.

RenderTodos skapar HTMLElement och ett HTMLInputElement av typen checkBox för varje todo-objekt. CheckBox togglar vid klick om en uppgift är avklarad eller inte.

Det finns fyra knappar som hanterar listan, en nollställningsknapp, en knapp som tar bort alla avklarade uppgifter, en knapp som endast visar oavklarade uppgifter och en knapp som visar alla uppgifter.

## TodoList
Klassen TodoList hanterar listan av todos. TodoList-objektet initieras i Main.init() med en tom array i konstruktorns parameter. I konstruktorns kropp finns en if-sats som kollar om det finns en lista i LocalStorage och anger todos med den istället.
Metoden addTodo kontrollerar om inmatningen är korrekt och skickar felmeddelande om det är inkorrekt. Vid korrekt inmatning skapas ett nytt todo-objekt, läggs in i listan och listan sorteras med höst priroitet (1) först.
```ts
public addTodo(task: string, priority: number): boolean {
  const prio: TPriority | null = toTPriority(priority);
  if (prio && task !== "") {
    const todo: ITodo = {
    task: task,
    completed: false,
    priority: prio,
    hexID: this.randomHexID()
    };
    this.todos.push(todo);
    this.sortByPriority();
    return true;
  } else {
    return false;
  }
}
```
Metoden randomHexID slumpar fram ett unikt tre-siffrig hexadecimal sträng, den kallar sig självt ifall det redan finns en med det ID:et.

Den metod som kallas av checkboxen heter markTodoCompleted och tar in ett indexvärde som parameter. Indexvärdet är positionen i todo-listan. Den togglar mellan true och false när användaren klickar på checkboxen.

Tre av de fyra knapparna som kontrollerar listan har var sin metod inuti TodoList-klassen:
- Nollstälningsmetoden tömmer listan och raderar den från LocalStorage.
- Rensa avklarade uppgifter metoden filtrerar ut alla avklarade uppgifter. _Konstig mening_.
- Visa endast oavklarade uppgifter fungerar exakt som den ovan, men att den gör en kopia av arrayen istället och därmet inte blir permanent.
- Den fjärde är ingen metod i TodoList-klassen, den kallar bara render med original arrayen i Main-klassen direkt i den anonyma funktionen för händelselyssnaren.

Det finns två metoder, save och load, som hanterar todo-listan inför localStorage. De utnyttjar utility-klassen UStorage som hanterar localStorage, mer om det under rubriken Utility Klasser.

## Utility Klasser
