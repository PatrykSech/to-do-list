{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1)
        render();
    }

    const toggleDone = (index) => {
        tasks[index].done = !tasks[index].done
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

    const render = () => {
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

        bindEvents();
    };

    const onClickEvent = () => {
        document.querySelector(".js-newTask").focus();
        document.querySelector(".js-newTask").value = null;
    }

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