const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__info-button');


const openPopup = function() {
    popupElement.classList.add('popup_is-opened');
}
const closePopup = function() {
    popupElement.classList.remove('popup_is-opened');
}
const closePopupByClickOverlay = function(event) {
    if (event.target === event.currentTarget) {
        closePopup();
    }
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOverlay);



// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault();

    const nameInfo = document.querySelector('#nameInfo');

    nameInput.value = nameInfo.textContent;
    const jobInfo = document.querySelector('#jobInfo');
    jobInput.value = jobInfo.textContent;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);