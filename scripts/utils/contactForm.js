
let modalBtn = document.querySelectorAll('.photograph-header .single-text .contact_button');
const modal = document.getElementById("contact_modal");

// Global DOM var
const $body = document.getElementById("#body");
const $openModalBtn = document.querySelectorAll('.open-modal-btn');
const $main = document.getElementById("#main");
const $contact_modal = document.getElementById('.contact_modal');
const $modalTitle = document.getElementsByClassName('.modal-title');
const $modalCloseBtn = document.querySelectorAll('.modal-close-btn');
 
 
// Event
// $openModalBtn.click(function() {
//     onOpenModal()
// //  })
  
//  $modalCloseBtn.click(function() {
//     onCloseModal()
//  })


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', displayModal, false));

function displayModal() {
    // console.log("TEST MODAL CONTACT");
    modal.style.display = "block";
    modal.style.visibility = "visible";
    // onOpenModal();
   
}

function closeModal() {
    modal.style.display = "none";
    // onCloseModal();
}


 const onCloseModal = () => {
    // $main.attr('aria-hidden', 'false');
    // $contact_modal.attr('aria-hidden', 'true');
    // $body.removeClass('no-scroll');
    // $contact_modal.css('display', 'none');
    // $openModalBtn.focus();
 }

//  // Close modal when escape key is pressed
//   document.addEventListener('keydown', e => {
//     const keyCode = e.keyCode ? e.keyCode : e.which
  
//     if ($contact_modal.attr('aria-hidden') == 'false' && keyCode === 27) {
//         onCloseModal()
//     }
//  })


