import './index.css'
import { Card } from '../components/Card.js';
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { Section } from "../components/Section";
import { UserInfo } from "../components/UserInfo";

const popupProfile = document.querySelector('.popup_edit_profile');
const profileEditBtn = document.querySelector('.profile__info-button');
const cardAddBtn = document.querySelector('.profile__button-add');
const popupImage = document.querySelector('.popup-photo');
const popupImageCaption = popupImage.querySelector('.popup__figure-caption')
const popupNewCard = document.querySelector('.popup-card');
const formElementProfile = popupProfile.querySelector('.popup__form');
const formElementCard = popupNewCard.querySelector('.popup__form');
const nameInput = formElementProfile.querySelector('[name="nameInput"]');
const jobInput = formElementProfile.querySelector('[name="jobInput"]');
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
const popupBigImage = new PopupWithImage(popupImage, popupImageCaption, '.popup-photo');

function handleCardClick(name, link) {
    popupBigImage.open(name, link);
}

function createCard(name, link) {
    return new Card({ name, link }, templateElement, handleCardClick).createCard();
}
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const { name, link } = item;
        cardList.addItem(createCard(name, link));
    }
}, '.elements');
const userInfo = new UserInfo({ name: '.profile__info-title', job: '.profile__info-subtitle' });

const popupWithFormProfile = new PopupWithForm('.popup_edit_profile', {
    submitRenderer: (formData) => {
        const { nameInput, jobInput } = formData;
        userInfo.setUserInfo(nameInput, jobInput);
        popupWithFormProfile.close();
    }
})
const popupWithFormAddElement = new PopupWithForm('.popup-card', {
    submitRenderer: (formData) => {
        const { nameCardTitle, popupCardSrc } = formData;
        cardList.addItem(createCard(nameCardTitle, popupCardSrc));
        popupWithFormAddElement.close();
    }
})

popupWithFormProfile.setEventListeners();
popupWithFormAddElement.setEventListeners();
popupBigImage.setEventListeners();
cardList.renderItems();

formProfileValidator.enableValidation();
formCardValidator.enableValidation();

profileEditBtn.addEventListener('click', () => {
    const { userName, userJob } = userInfo.getUserInfo();
    nameInput.value = userName
    jobInput.value = userJob
    formProfileValidator.resetValidation();
    popupWithFormProfile.open();
})

cardAddBtn.addEventListener('click', () => {
    formCardValidator.resetValidation();
    popupWithFormAddElement.open();
})