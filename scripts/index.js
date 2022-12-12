import { Card } from './Card.js';
import { FormValidator } from "./FormValidator.js";
const popupProfile = document.querySelector('.popup_edit_profile');
const popupCloseBtns = document.querySelectorAll('.popup__close');
const profileEditBtn = document.querySelector('.profile__info-button');
const cardAddBtn = document.querySelector('.profile__button-add');
export const popupImage = document.querySelector('.popup-photo');
const popupNewCard = document.querySelector('.popup-card');
const cardTitleInput = popupNewCard.querySelector('.popup__card-title');
const cardSrcInput = popupNewCard.querySelector('.popup__card-src');
// Находим форму в DOM
const formElementProfile = popupProfile.querySelector('.popup__form');
const formElementCard = popupNewCard.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = formElementProfile.querySelector('[name="nameInput"]');
const jobInput = formElementProfile.querySelector('[name="jobInput"]');
const nameInfo = document.querySelector('#nameInfo');
const jobInfo = document.querySelector('#jobInfo');
const cardsList = document.querySelector('.elements');
const templateElement = document.querySelector('#templ__element').content;
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__error'
}

const formProfileValidator = new FormValidator(obj, formElementProfile);
const formCardValidator = new FormValidator(obj, formElementCard);
export function openPopup(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupKeyEsc);
}

function closePopup(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupKeyEsc);
}


function closePopupKeyEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened')
        closePopup(openedPopup);
    }
}

function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
}

function editProfile() {
    nameInput.value = nameInfo.textContent;
    jobInput.value = jobInfo.textContent;
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    nameInfo.textContent = nameInput.value;
    jobInfo.textContent = jobInput.value;
    closePopup(popupProfile);
}

function renderCard(item) {
    const card = new Card(item, templateElement).createCard();
    cardsList.prepend(card);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const card = { name: cardTitleInput.value, link: cardSrcInput.value };
    renderCard(card);
    closePopup(popupNewCard);
}

initialCards.forEach((element) => {
    renderCard(element);
})

profileEditBtn.addEventListener('click', () => {
    formProfileValidator.resetValidation();
    editProfile();
    openPopup(popupProfile);
})

cardAddBtn.addEventListener('click', () => {
    formCardValidator.resetValidation();
    openPopup(popupNewCard);
})

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handleProfileFormSubmit);

formElementCard.addEventListener('submit', handleCardFormSubmit);

popupCloseBtns.forEach((button) => {
    button.addEventListener('click', (evt) => {
        const popup = evt.target.closest('.popup');
        closePopup(popup);
    });
});
popupImage.addEventListener('click', closePopupOverlay);
popupProfile.addEventListener('click', closePopupOverlay);
popupNewCard.addEventListener('click', closePopupOverlay);
formProfileValidator.enableValidation();
formCardValidator.enableValidation();