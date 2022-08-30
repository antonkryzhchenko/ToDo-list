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

import {createElement} from './helpers.js';

import {getDate} from './helpers.js';

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
        render();
    };

function createTaskFrame() {
    let todoCardItem = createElement('div', 'todo-card__item');
    
    let todoCardItems = createElement('div', 'todo-card__items');
    todoCardItems.addEventListener('click', (e) => {
        let target = e.target;
        if (target.tagName === 'INPUT' && target.type === 'checkbox')
            if (target.checked) {
                todoCardItemsText.style.textDecoration = 'line-through';
                todoCardItemsText.style.backgroundColor = 'rgb(197, 250, 197)';
            } else {
                todoCardItemsText.style.textDecoration = 'none';
                todoCardItemsText.style.backgroundColor = 'rgb(250, 247, 197)';
            }
    })
    
    let todoCardItemsCheckbox = createElement('input', 'todo-card__items-checkbox');
    todoCardItemsCheckbox.type = 'checkbox';
    
    let todoCardItemsText = createElement('div', 'todo-card__items-text');
    todoCardItemsText.innerHTML = todoCardTitleInput.value;
    todoCardTitleInput.value = '';
    
    let todoCardItemsBtn = createElement('button', 'todo-card__items-btn', 'X');
    todoCardItemsBtn.addEventListener('click', () => todoCardItem.remove());
    
    todoCardItems.append(todoCardItemsCheckbox, todoCardItemsText, todoCardItemsBtn);
    
    let todoCardItemDate = createElement('div', 'todo-card__item-date');
    
    let todoCardItemText = createElement('p', 'todo-card__item-p');
    todoCardItemText.innerHTML = `${getDate()}`;
    
    todoCardItemDate.append(todoCardItemText);
    
    todoCardItem.append(todoCardItems, todoCardItemDate);

    todoCardItemBlock.append(todoCardItem);
    
    todoCard.append(todoCardItemBlock);

    todoCardTitleBtn1.addEventListener('click', () => todoCardItemBlock.innerHTML = '');
}

app.append(todoCard);

function render() {
    todoCardItemBlock.innerHTML = '';
    taskList.forEach(() => {
        todoCardItemBlock.append(createTaskFrame())
    });
}