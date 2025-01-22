
    const addImageButton = document.getElementById("addImage");
    const imageInput = document.getElementById("imageInput");
    const imageDescriptionInput = document.getElementById("imageDescription");
    const imagesList = document.getElementById("imagesList");

    // Function to add a new image
    function addImage() {
      const file = imageInput.files[0];
      const description = imageDescriptionInput.value.trim();
      if (!file || description === "") {
        return; // Exit if no file or description is provided
      }

      const reader = new FileReader();
      reader.onload = function(event) {
        const imageUrl = event.target.result;

        const imageItem = document.createElement("div");
        imageItem.classList.add("image-item");

        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = description;
        image.width = 100;
        image.height = 100;
        imageItem.appendChild(image);

        const imageContent = document.createElement("div");
        imageContent.classList.add("image-content");
        imageContent.textContent = description;
        imageItem.appendChild(imageContent);

        // Make the description editable
        imageContent.addEventListener("click", () => {
          if (!imageContent.classList.contains("editable")) {
            imageContent.contentEditable = true;
            imageContent.classList.add("editable");
            imageContent.focus();
          }
        });

        // Three dots menu for options
        const dotsMenu = document.createElement("div");
        dotsMenu.classList.add("three-dots");
        dotsMenu.innerHTML = "&#8230;"; // Three dots character
        imageItem.appendChild(dotsMenu);

        const menu = document.createElement("div");
        menu.classList.add("three-dots-menu");

        // Edit button in the menu
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editImage(imageContent);
        menu.appendChild(editButton);

        // Delete button in the menu
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteImage(imageItem);
        menu.appendChild(deleteButton);

        imageItem.appendChild(menu);
        imagesList.appendChild(imageItem);

        // Save images to localStorage
        saveImagesToLocalStorage();

        imageInput.value = "";
        imageDescriptionInput.value = "";
      };

      reader.readAsDataURL(file);
    }

    // Function to edit an existing image description inline
    function editImage(imageContent) {
      if (!imageContent.classList.contains("editable")) {
        imageContent.contentEditable = true;
        imageContent.classList.add("editable");
        imageContent.focus();
      } else {
        imageContent.contentEditable = false;
        imageContent.classList.remove("editable");
        saveImagesToLocalStorage(); // Save changes
      }
    }

    // Function to delete an image
    function deleteImage(imageItem) {
      imagesList.removeChild(imageItem);
      saveImagesToLocalStorage();
    }

    // Save images to localStorage
    function saveImagesToLocalStorage() {
      const images = [];
      const imageItems = document.querySelectorAll(".image-item");
      imageItems.forEach(item => {
        const image = item.querySelector("img");
        const description = item.querySelector(".image-content").textContent;
        images.push({ src: image.src, description });
      });
      localStorage.setItem("images", JSON.stringify(images));
    }

    // Load images from localStorage
    function loadImagesFromLocalStorage() {
      const savedImages = JSON.parse(localStorage.getItem("images"));
      if (savedImages) {
        savedImages.forEach(({ src, description }) => {
          const imageItem = document.createElement("div");
          imageItem.classList.add("image-item");

          const image = document.createElement("img");
          image.src = src;
          image.alt = description;
          image.width = 100;
          image.height = 100;
          imageItem.appendChild(image);

          const imageContent = document.createElement("div");
          imageContent.classList.add("image-content");
          imageContent.textContent = description;
          imageItem.appendChild(imageContent);

          const dotsMenu = document.createElement("div");
          dotsMenu.classList.add("three-dots");
          dotsMenu.innerHTML = "&#8230;";
          imageItem.appendChild(dotsMenu);

          const menu = document.createElement("div");
          menu.classList.add("three-dots-menu");

          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.onclick = () => editImage(imageContent);
          menu.appendChild(editButton);

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = () => deleteImage(imageItem);
          menu.appendChild(deleteButton);

          imageItem.appendChild(menu);
          imagesList.appendChild(imageItem);
        });
      }
    }

    // Load images when the page is loaded
    window.onload = loadImagesFromLocalStorage;

    addImageButton.addEventListener("click", addImage);