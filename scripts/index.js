const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__info-button');


const openPopup = function() {
    popupElement.classList.add('popup_is-opened');
    nameInput.value = nameInfo.textContent;
    jobInput.value = jobInfo.textContent;
}
const closePopup = function() {
    popupElement.classList.remove('popup_is-opened');

}


popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);




// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');

const nameInfo = document.querySelector('#nameInfo');
const jobInfo = document.querySelector('#jobInfo');



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault();

    nameInfo.textContent = nameInput.value;
    jobInfo.textContent = jobInput.value;
    closePopup();


}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);