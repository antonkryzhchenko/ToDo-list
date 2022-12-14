'use strict';

const app = document.getElementById('app');

let taskList = [];

function getName() {
    return JSON.parse(localStorage.getItem('todos')) ?? [];
}

function setName() {
    localStorage.setItem('todos', JSON.stringify(taskList));
}

document.addEventListener("DOMContentLoaded", () => {
    taskList = getName();
    render(taskList);
});

import { createElement } from './helpers.js';

import { getDate } from './helpers.js';

const todoCard = createElement('div', 'todo-card');
const todoCardTitle = createElement('div', 'todo-card__title');
const todoCardTitleBtn1 = createElement('button', 'todo-card__title-btn', 'Delete all');
const todoCardTitleInput = createElement('input', 'todo-card__title-input', '', 'text', 'Enter todo ...');
const todoCardTitleBtn2 = createElement('button', 'todo-card__title-btn', 'Add');
const todoCardItemBlock = createElement('div', 'todo-card__item-block');

todoCardTitle.append(todoCardTitleBtn1, todoCardTitleInput, todoCardTitleBtn2);
todoCard.append(todoCardTitle);

todoCardTitleInput.addEventListener('keydown', (e) => e.keyCode === 13 ? createTask() : null);

todoCardTitleBtn2.addEventListener('click', () => createTask());

todoCardTitleBtn1.addEventListener('click', () => {
    taskList.length = 0;
    setName();
    render(taskList);
})

function deleteTask(task) {
    let taskIndex = taskList.findIndex((el) => el.id === task.id);
    taskList.splice(taskIndex, 1);
    setName();
    render(taskList);
}

function checkTask(task) {
    let el = taskList.find((item) => item.id === task.id);
    el.isChecked = el.isChecked ? false : true;
    setName();
    render(taskList);
}

function createTask() {
    if (!todoCardTitleInput.value) {
        return;
    }

    const todo = {
        id: Math.random(),
        date: getDate(),
        text: todoCardTitleInput.value,
        isChecked: false,
    };

    taskList.push(todo);
    setName();
    render(taskList);
};

function createTaskFrame(task) {
    let todoCardItem = createElement('div', 'todo-card__item');
    
    let todoCardItems = createElement('div', 'todo-card__items');
    
    let todoCardItemsText = createElement('div', 'todo-card__items-text');
    todoCardItemsText.innerText = task.text;
    todoCardTitleInput.value = '';

    let todoCardItemsCheckbox = createElement('input', 'todo-card__items-checkbox');
    todoCardItemsCheckbox.type = 'checkbox';
    todoCardItemsCheckbox.addEventListener('click', () => checkTask(task));
        if (task.isChecked) {
            todoCardItemsCheckbox.checked = true;
            todoCardItemsText.style.textDecoration = 'line-through';
            todoCardItemsText.style.backgroundColor = 'rgb(197, 250, 197)';
            } else {
            todoCardItemsText.style.textDecoration = 'none';
            todoCardItemsText.style.backgroundColor = 'rgb(250, 247, 197)';
        }
    
    let todoCardItemsBtn = createElement('button', 'todo-card__items-btn', 'X');
    todoCardItemsBtn.addEventListener('click', () => deleteTask(task));
    
    todoCardItems.append(todoCardItemsCheckbox, todoCardItemsText, todoCardItemsBtn);
    
    let todoCardItemDate = createElement('div', 'todo-card__item-date');
    
    let todoCardItemText = createElement('p', 'todo-card__item-p');
    todoCardItemText.innerText = task.date;
    
    todoCardItemDate.append(todoCardItemText);
    
    todoCardItem.append(todoCardItems, todoCardItemDate);

    todoCardItemBlock.append(todoCardItem);
    
    todoCard.append(todoCardItemBlock);

    todoCardTitleBtn1.addEventListener('click', () => todoCardItemBlock.innerHTML = '');

    return todoCardItem;
};

app.append(todoCard);

function render(array) {
    todoCardItemBlock.innerHTML = '';
    array.forEach((task) => {
        todoCardItemBlock.append(createTaskFrame(task));
    });
};