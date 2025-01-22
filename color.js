const addColorButton = document.getElementById("addColor");
const colorInput = document.getElementById("colorInput");
const colorList = document.getElementById("colorList");

function addColor() {
  const colorValue = colorInput.value;
  
  const colorItem = document.createElement("div");
  colorItem.classList.add("color-item");
  colorItem.style.backgroundColor = colorValue;

  const dotsMenu = document.createElement("div");
  dotsMenu.classList.add("three-dots");
  dotsMenu.innerHTML = "&#8230;"; // Three dots character
  colorItem.appendChild(dotsMenu);

  const menu = document.createElement("div");
  menu.classList.add("three-dots-menu");

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.onclick = () => editColor(colorItem, colorInput);
  menu.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => deleteColor(colorItem);
  menu.appendChild(deleteButton);

  colorItem.appendChild(menu);
  colorList.appendChild(colorItem);

  saveColorsToLocalStorage();
}

function editColor(colorItem, colorInput) {
  const newColor = prompt("Enter new color (hex code):", colorItem.style.backgroundColor);
  if (newColor) {
    colorItem.style.backgroundColor = newColor;
    saveColorsToLocalStorage();
  }
}

function deleteColor(colorItem) {
  colorList.removeChild(colorItem);
  saveColorsToLocalStorage();
}

function saveColorsToLocalStorage() {
  const colors = [];
  document.querySelectorAll(".color-item").forEach(item => {
    colors.push(item.style.backgroundColor);
  });
  localStorage.setItem("colors", JSON.stringify(colors));
}

function loadColorsFromLocalStorage() {
  const savedColors = JSON.parse(localStorage.getItem("colors"));
  if (savedColors) {
    savedColors.forEach(color => {
      const colorItem = document.createElement("div");
      colorItem.classList.add("color-item");
      colorItem.style.backgroundColor = color;

      const dotsMenu = document.createElement("div");
      dotsMenu.classList.add("three-dots");
      dotsMenu.innerHTML = "&#8230;";

      const menu = document.createElement("div");
      menu.classList.add("three-dots-menu");

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = () => editColor(colorItem, colorInput);
      menu.appendChild(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteColor(colorItem);
      menu.appendChild(deleteButton);

      colorItem.appendChild(dotsMenu);
      colorItem.appendChild(menu);
      colorList.appendChild(colorItem);
    });
  }
}

window.onload = loadColorsFromLocalStorage;
addColorButton.addEventListener("click", addColor);
