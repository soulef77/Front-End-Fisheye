
let modalBtn = document.querySelectorAll('.photograph-header .single-text .contact_button');
const modal = document.getElementById("contact_modal");

// Global DOM var
const $body = document.getElementById("#body");
const $openModalBtn = document.querySelectorAll('.open-modal-btn');
const $main = document.getElementById("#main");
const $contact_modal = document.getElementById('.contact_modal');
const $modalTitle = document.getElementsByClassName('.modal-title');
const $modalCloseBtn = document.querySelectorAll('.modal-close-btn');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', displayModal, false));

function displayModal() {
    modal.style.display = "block";
    modal.style.visibility = "visible";
   
}

function closeModal() {
    modal.style.display = "none";
}

document.addEventListener("keyup", (e) => {
        switch (e.key) {
        case "Escape":
            this.closeModal();
            break;
    }
});




