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

## Utility Klasser
