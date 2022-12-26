export const imgPopup = document.querySelector('.popup__image');
export const titlePopup = document.querySelector('.popup__figure-caption');
export const popupProfile = document.querySelector('.popup_edit_profile');
export const buttonOpenPopupProfile = document.querySelector('.profile__info-button');
export const templateElement = document.querySelector('#templ__element');
export const popupAddElement = document.querySelector('.popup-card');
export const elementAddButton = document.querySelector('.profile__button-add');
export const formPopupProfile = popupProfile.querySelector('.popup__form');
export const formPopupAddElement = popupAddElement.querySelector('.popup__form');
export const inputList = formPopupProfile.querySelectorAll('.popup__input');
export const buttonOpenChangeAvatar = document.querySelector('.profile__avatar');
export const popupAvatar = document.querySelector('.popup_avatar');
export const formPopupAvatar = popupAvatar.querySelector('.popup__form');

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorContainerClass: '.popup__error',
}