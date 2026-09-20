window.addEventListener("load", init);

let taskToDelete = null;

function init() {
    // koppelt de toevoegen knop aan de functie om to do aan t e maken
    let addButton = document.querySelector("#addButton");
    addButton.addEventListener("click", handleAddNote);

    // koppelt de lijst met to do's aan de verwijder functie
    let del = document.querySelector("#taskList");
    del.addEventListener("dblclick", handleDeleteNote);

    // Koppel de knoppen van het dialoogvenster
    let confirmBtn = document.querySelector("#confirmBtn");
    confirmBtn.addEventListener("click", handleconfirmBtn);
    let cancelBtn = document.querySelector("#cancelBtn");
    cancelBtn.addEventListener("click", handlecancelBtn);
}

function handleconfirmBtn() {
    let confirmModal = document.querySelector("#confirmModal");
    if (taskToDelete) {
        taskToDelete.remove();
        taskToDelete = null;
    }
    confirmModal.close(); // Sluit het venster
}

function handlecancelBtn() {
    let confirmModal = document.querySelector("#confirmModal");
    taskToDelete = null;
    confirmModal.close();
}

// Functie die een to-do toevoegt aan de ongeordende lijst
function handleAddNote() {
    let list = document.querySelector("#taskList");
    let text = document.querySelector("#taskInput");
    let summary = document.querySelector("#taskSummary");

    if (text.value.trim() !== "") {
        // Maak de HTML voor de hoofdtaak aan
        let taskHTML = `<li class="task-item">${text.value}`;

        // Als er een beschrijving is ingevuld, voeg deze BINNEN het <li> toe
        if (summary && summary.value.trim() !== "") {
            taskHTML += `<ul class="summary-list"><li>beschrijving: ${summary.value}</li></ul>`;
        }

        taskHTML += `</li>`; // Sluit het <li> element af

        list.insertAdjacentHTML('beforeend', taskHTML);

        // Velden weer leegmaken
        text.value = "";
        if (summary) summary.value = "";
    }
}

// Functie die een to-do verwijderd van de ongeordende lijst door dubbel te klikken
function handleDeleteNote(event) {
    // Zoek het dichtstbijzijnde hoofdtaak <li> element met de class 'task-item'
    let li = event.target.closest("li.task-item");

    if (li) {
        taskToDelete = li;
        let confirmModal = document.querySelector("#confirmModal");
        confirmModal.showModal();
    }
}