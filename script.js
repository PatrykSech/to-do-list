{
    const tasks = [
        {
            content: "treść zadania",
            done: true,
        },
        {
            content: "treść zadania",
            done: false,
        },
    ];

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
            <li${task.done ? "  style=\"text-decoration: line-through\"" : ""}>
            <button class="js-done">Zrobione?</button>
            <button class="js-remove">Usuń</button>
                ${task.content}
            </li>
            `;
        };

        document.querySelector('.js-tasks').innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
            event.preventDefault();
    
        const newTaskContent = document.querySelector('.js-newTask').value.trim();
            console.log(newTaskContent);
    
        if (newTaskContent === ""){
            return; 
        }
            addNewTask(newTaskContent);
    };

    const init = () => {
        render();

    const form = document.querySelector('.js-form');

    form.addEventListener("submit", onFormSubmit);
    };

    init();
    
}