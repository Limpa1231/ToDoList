let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');

let toDoList = [];

if (localStorage.getItem('todo')) {
    toDoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
};

addButton.addEventListener('click', function(){
    
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };
    toDoList.push(newTodo);
     displayMessages();
    localStorage.setItem('todo', JSON.stringify(toDoList));
});


function displayMessages() {
    let displayMessage = '';
    if (toDoList.length === 0) todo.innerHTML = ''; 
    toDoList.forEach(function(item, i) {
         displayMessage += `
        <li> 
        <input type = 'checkbox' id = 'item_${i}' ${item.checked ? 'checked' : ''}>
        <label for = 'item_${i}' class = '${item.important ? 'important' : ''}'>${item.todo}</label>
        </li>`;

        todo.innerHTML = displayMessage;
    });

    todo.addEventListener('change', function(event){
        let idItem = event.target.getAttribute('id');   
        let valueLabel = todo.querySelector('[for ='+ idItem + ']').innerHTML;
        toDoList.forEach(function(item){
            if (item.todo === valueLabel){
                item.checked = !item.checked;
                localStorage.setItem('todo', JSON.stringify(toDoList));
                addMessage.value = "";
            }
        })
    });

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    toDoList.forEach(function(item, i){
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey){
                toDoList.splice(i, 1);
            }else{
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(toDoList));
        }
    });
});

}
