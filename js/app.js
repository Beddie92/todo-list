console.log('collegato correttamente');

/* 
document.getElementById('add-button').addEventListener('click', function () {
});
 */

let addButton = document.getElementById('add-button');
addButton.addEventListener('click', function (event) { // al click fa partire la funzione
    addToDoItem();
});


let clearButton = document.getElementById('clear-completed-button');
clearButton.addEventListener('click', function () {
    clearCompletedToDoItems();
});

let emptyButton = document.getElementById('empty-button');
emptyButton.addEventListener('click', emptyList);

let saveButton = document.querySelector('#save-button');
saveButton.addEventListener('click', saveList);

//variabile del selettore HTML che ho come id todo-entry-box
var toDoEntryBox = document.getElementById('todo-entry-box'); //variabile globale e ci permette di gestire un listato che al momento è vuoto

//variabile del selettore HTML che ha come id todo-list
var toDoList = document.getElementById('todo-list');


function newToDoItem(itemText, completed) {//passa due parametri, il flase significa completed si o no nella funzione newToDoItem
    let toDoItem = document.createElement('li'); //aggiunge un list item e ci inserisce il valore testuale di toDoText
    let toDoText = document.createTextNode(itemText);

    toDoItem.appendChild(toDoText); //al tag li ci attacchiamo il testo toDoText
    if (completed) { //controlliamo se il parametro completed è vero o falso, ma in questo caso false per newToDoItem
        toDoItem.classList.add('completed');
    }

    toDoList.appendChild(toDoItem); //<li> item </li>
    toDoItem.addEventListener('dblclick', toggleToDoItemState); //doppio click 
}

function addToDoItem() {
    let itemText = toDoEntryBox.value; //prende i valori di toDoEntryBox il box dove scrivi il valore
    newToDoItem(itemText, false); //invoca la funzione e gli fa passare l'elemento itemText e l'altro paramentro false
}

function toggleToDoItemState() {
    if (this.classList.contains('completed')) { //controllo se l'elemento (this) che fa scaturire la funzione (todoitem) contiente la classe completed
        this.classList.remove('completed'); //barra elemento
    }
    else {
        this.classList.add('completed');
    }
}

function clearCompletedToDoItems() {
    let completedItems = toDoList.getElementsByClassName('completed');

    while (completedItems.length > 0) { //se completed items >0
        completedItems.item(0).remove(); //cancello il primo elemento
    }
}

function emptyList() {
    let toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }

    localStorage.clear();
}

function saveList() {
    let toDos = [];

    for (let i = 0; i < toDoList.children.length; i++) { //per memorizzare la lista
        let toDo = toDoList.children.item(i); //va a recuperare elemento i esimo del nostro ciclo

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains('completed')
        };

        toDos.push(toDoInfo);
    }
    console.log(toDos);
    if (toDos.length !== 0) {
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }
}

setInterval(saveList, 3000);


function loadList() {
    if (localStorage.getItem('toDos') != null) {
        let toDos = JSON.parse(localStorage.getItem('toDos')); //mettilo in formato leggibile

        for (let i = 0; i < toDos.length; i++) { //conteggio degli elementi
            let toDo = toDos[i]; //li elenchiamo
            newToDoItem(toDo.task, toDo.completed); //li andiamo a scrivere
        }
    }
}

loadList();


