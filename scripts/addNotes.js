window.addEventListener("load", init);

let taskToDelete = null; // globale variabele

function init() {
    let addButton = document.querySelector("#addButton");
    addButton.addEventListener("click", handleAddNote);

    let del = document.querySelector("#taskList");
    del.addEventListener("dblclick", handleDeleteNote);

    // Koppel de knoppen van het dialoogvenster
    let confirmModal = document.querySelector("#confirmModal");
    let confirmBtn = document.querySelector("#confirmBtn");
    let cancelBtn = document.querySelector("#cancelBtn");

    confirmBtn.addEventListener("click", function() {
        if (taskToDelete) {
            taskToDelete.remove();
            taskToDelete = null;
        }
        confirmModal.close(); // Sluit het venster
    });

    cancelBtn.addEventListener("click", function() {
        taskToDelete = null;
        confirmModal.close();
    });
}

// functie dat een to do toevoegd aan de ongeordende lijst
function handleAddNote() {
    let list = document.querySelector("#taskList");
    let text = document.querySelector("#taskInput");

    // Tip: Gebruik trim() om te controleren op echte invoer in plaats van een enkele spatie
    if (text.value.trim() !== "") {
        list.insertAdjacentHTML('beforeend', `<li>${text.value}</li>`);
        text.value = "";
    }
}

// functie dat een to do verwijderd van de ongeordende lijst door dubbel te clicken
function handleDeleteNote(event) {
    let li = event.target.closest("li");

    if (li) {
        taskToDelete = li; // Sla het geselecteerde item op
        let confirmModal = document.querySelector("#confirmModal");
        confirmModal.showModal(); // Opent het venster als een pop-over
    }
}