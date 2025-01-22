const addNoteButton = document.getElementById("addNote");
const noteInput = document.getElementById("noteInput");
const notesList = document.getElementById("notesList");

// Function to add a new note
function addNote() {
  const noteText = noteInput.value.trim();
  if (noteText === "") {
    return; // Exit if no text is entered
  }

  const noteItem = document.createElement("div");
  noteItem.classList.add("note-item");

  const noteContent = document.createElement("div");
  noteContent.classList.add("note-content");
  noteContent.textContent = noteText;
  noteItem.appendChild(noteContent);

  // Make the note content editable
  noteContent.addEventListener("click", () => {
    if (!noteContent.classList.contains("editable")) {
      noteContent.contentEditable = true;
      noteContent.classList.add("editable");
      noteContent.focus();
    }
  });

  // Three dots menu for options
  const dotsMenu = document.createElement("div");
  dotsMenu.classList.add("three-dots");
  dotsMenu.innerHTML = "&#8230;"; // Three dots character
  noteItem.appendChild(dotsMenu);

  const menu = document.createElement("div");
  menu.classList.add("three-dots-menu");

  // Edit button in the menu
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.onclick = () => editNote(noteContent);
  menu.appendChild(editButton);

  // Delete button in the menu
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteNote(noteItem);
  menu.appendChild(deleteButton);

  noteItem.appendChild(menu);
  notesList.appendChild(noteItem);

  // Save note to localStorage
  saveNotesToLocalStorage();

  noteInput.value = "";
}

// Function to edit an existing note inline
function editNote(noteContent) {
  if (!noteContent.classList.contains("editable")) {
    noteContent.contentEditable = true;
    noteContent.classList.add("editable");
    noteContent.focus();
  } else {
    noteContent.contentEditable = false;
    noteContent.classList.remove("editable");
    saveNotesToLocalStorage(); // Save changes
  }
}

// Function to delete a note
function deleteNote(noteItem) {
  notesList.removeChild(noteItem);
  saveNotesToLocalStorage();
}

// Save notes to localStorage
function saveNotesToLocalStorage() {
  const notes = [];
  const noteItems = document.querySelectorAll(".note-item");
  noteItems.forEach(item => {
    const noteContent = item.querySelector(".note-content");
    notes.push(noteContent.textContent);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Load notes from localStorage
function loadNotesFromLocalStorage() {
  const savedNotes = JSON.parse(localStorage.getItem("notes"));
  if (savedNotes) {
    savedNotes.forEach(noteText => {
      const noteItem = document.createElement("div");
      noteItem.classList.add("note-item");

      const noteContent = document.createElement("div");
      noteContent.classList.add("note-content");
      noteContent.textContent = noteText;
      noteItem.appendChild(noteContent);

      const dotsMenu = document.createElement("div");
      dotsMenu.classList.add("three-dots");
      dotsMenu.innerHTML = "&#8230;"; // Three dots character
      noteItem.appendChild(dotsMenu);

      const menu = document.createElement("div");
      menu.classList.add("three-dots-menu");

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = () => editNote(noteContent);
      menu.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteNote(noteItem);
      menu.appendChild(deleteButton);

      noteItem.appendChild(menu);
      notesList.appendChild(noteItem);
    });
  }
}

// Load notes when the page is loaded
window.onload = loadNotesFromLocalStorage;

addNoteButton.addEventListener("click", addNote);
