let taskArr = [];
let start = 0;
let current = 0;


if (localStorage.getItem('localObject') !== null) {
    taskArr = JSON.parse(localStorage.getItem('localObject'));
} else {
    taskArr = [];
}

function editListen() {
const getEdit = document.querySelectorAll('p');
getEdit.forEach((e, i) => {
    e.addEventListener('keypress', (j) => {
    if (j.key === 'Enter') {
        const x = e.innerText;
        edit(i, x);
        show();
        drag();
        editListen();
        delOne();
    }
    });
});
}

function drag() {
const getlistid = document.querySelectorAll('li');
getlistid.forEach((e, i) => {
    e.addEventListener('dragstart', () => {
    start = i;
    });
    e.addEventListener('dragenter', () => {
    current = i;
    e.classList.add('bg-success');
    });
    e.addEventListener('dragleave', () => {
    e.classList.remove('bg-success');
    });
    e.addEventListener('dragend', () => {
    e.classList.remove('bg-primary');
    if (start !== current) {
        taskArr[start].index = current;
        taskArr[current].index = start;
        show();
        drag();
        editListen();
        delOne();
    }
    });
});
}

function clear() {
const button = document.querySelector('.btn');
button.addEventListener('click', () => {
    const check = document.querySelectorAll('#check');
    check.forEach((i) => {
    if (i.checked) {
        taskArr.splice(i, 1);
        taskArr.forEach((x, y) => {
        x.index = y;
        });
        show();
        drag();
        editListen();
        delOne();
    }
    });
});
}

function delOne() {
const gettrash = document.querySelectorAll('#trash');
gettrash.forEach((e, i) => {
    e.addEventListener('click', () => {
    taskArr.splice(i, 1);
    taskArr.forEach((x, y) => {
        x.index = y;
    });
    show();
    drag();
    editListen();
    delOne();
    });
});
}

const ti = document.querySelector('#textinput');
ti.addEventListener('keydown', (i) => {
if (i.key === 'Enter') {
    create(ti.value);
    show();
    drag();
    editListen();
    delOne();
}
});

class Task {
constructor(description = ' ', completed = false, index = (taskArr.length)) {
    this.description = description;
    this.completed = completed;
    this.index = index;
}
}

function store(array) {
localStorage.setItem('localObject', JSON.stringify(array));
}
function create(x) {
const newTask = new Task(x);
taskArr.push(newTask);
}
function edit(x, y) {
taskArr[x].description = y;
}

function show() {
const taskContainerUl = document.getElementById('list');
  // this.taskArr = taskArr;
taskContainerUl.innerHTML = '';
taskArr.sort((a, b) => a.index - b.index);
taskArr.forEach((item) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item d-flex justify-content-between zone');
    li.setAttribute('id', item.index);
    li.setAttribute('draggable', true);
    const input = document.createElement('input');
    input.setAttribute('class', 'form-check-input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', 'check');
    const p = document.createElement('p');
    p.setAttribute('class', 'm-0 p-0');
    p.setAttribute('id', 'edit');
    p.setAttribute('contenteditable', true);
    p.innerText = item.description;
    const span2 = document.createElement('span');
    const i2 = document.createElement('i');
    i2.setAttribute('class', 'as fa-trash-alt');
    span2.appendChild(i2);
    const span = document.createElement('span');
    const i = document.createElement('i');
    i.setAttribute('class', 'fas fa-ellipsis-v');
    const ia = document.createElement('i');
    ia.setAttribute('class', 'fas fa-trash-alt me-3');
    ia.setAttribute('id', 'trash');
    span.appendChild(ia);
    span.appendChild(i);
    li.appendChild(input);
    li.appendChild(p);
    li.appendChild(span);

    taskContainerUl.appendChild(li);
});
store(taskArr);
}

show();
drag();
clear();
editListen();
delOne();