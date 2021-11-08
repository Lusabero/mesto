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