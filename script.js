{
    let tasks = [];
    let hideDoneTasks = false; 

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {content: newTaskContent},
        ];
        render();
    };

    const removeTask = (index) => {
            tasks = [
                ...tasks.slice(0, index),
                ...tasks.slice(index + 1),
            ];
        render();
    };

    const toggleDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {...tasks[index], done: !tasks[index].done},
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const toggleAllDone = () => {
    tasks = tasks.map((task) => ({
        ...task,
        done: true, 
    }));
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove")

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleTasksDone = document.querySelectorAll(".js-done")

        toggleTasksDone.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleDone(index);
            });
        });
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__task">
            <button class="js-done task_button-done">
            ${task.done ? "✓" : ""}
            </button>
            <span ${task.done ? "class=\"list__task--done\"" : ""}>${task.content}</span>
            <button class="js-remove task__button-remove">🗑</button> 
            </li>
            `;
        };

        document.querySelector('.js-tasks').innerHTML = htmlString;
    };

    const renderButtons = () => {
        const tasksEvents = document.querySelector('.js-tasksEvents')

        if (tasks.length === 0){
            tasksEvents.innerHTML = "";
        } else {
            tasksEvents.innerHTML = `
            <button class="js-allTasksDone">Ukończ wszytskie</button>
            <button class="js-doneTasksHidden">Ukryj ukończone</button>
            `;
        };

    };

    const bindButtonsEvents = () => {
        const buttonAllTasksDone = document.querySelector('.js-allTasksDone');
        const buttonHiddeDoneTasks = document.querySelector('.js-doneTasksHidden');

        if (tasks.length !== 0){
            buttonAllTasksDone.addEventListener("click", () => {
                toggleAllDone();
            });
        };
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonsEvents();
    };

    const onClickEvent = () => {
        document.querySelector(".js-newTask").focus();
        document.querySelector(".js-newTask").value = null;
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector('.js-newTask').value.trim();
        console.log(newTaskContent);

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);

        onClickEvent();
    };

    const init = () => {
        render(); 

        const form = document.querySelector('.js-form');
        form.addEventListener("submit", onFormSubmit);
    };

    init();
};