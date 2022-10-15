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

const ul = document.querySelector('.elements');

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

const templateElement = document.querySelector('#templ__element').content;
initialCards.forEach((count) => {
    const templateElementClone = templateElement.querySelector('.elements__element').cloneNode(true);
    templateElement.querySelector('.elements__title').textContent = count.name;
    const img = templateElementClone.querySelector('.elements__image');
    img.src = count.link;
    img.alt = `alt ${count.name}`;
    ul.append(templateElementClone);
});