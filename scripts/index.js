const popupProfile = document.querySelector('.popup_edit_profile');
const popupCloseBtn = document.querySelectorAll('.popup__close');
const editProfileBtn = document.querySelector('.profile__info-button');
const addCardBtn = document.querySelector('.profile__button-add');
const popupImage = document.querySelector('.popup_photo');
const popupNewCard = document.querySelector('.popup__card');
const cardTitle = popupNewCard.querySelector('.popup__card-title');
const cardSrc = popupNewCard.querySelector('.popup__card-src');
// Находим форму в DOM
const formElementProfile = document.querySelector('.popup__form');
const formElementCard = document.querySelector('.popup__form_card');
// Находим поля формы в DOM
const nameInput = formElementProfile.querySelector('#nameInput');
const jobInput = formElementProfile.querySelector('#jobInput');

const nameInfo = document.querySelector('#nameInfo');
const jobInfo = document.querySelector('#jobInfo');

function openPopup(element) {
    element.classList.add('popup_is-opened');
}

function closePopup(element) {
    element.classList.remove('popup_is-opened');
}

function editProfile() {
    nameInput.value = nameInfo.textContent;
    jobInput.value = jobInfo.textContent;
}

editProfileBtn.addEventListener('click', () => {
    openPopup(popupProfile);
    editProfile();
})

addCardBtn.addEventListener('click', () => {
    openPopup(popupNewCard);
})



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault();

    nameInfo.textContent = nameInput.value;
    jobInfo.textContent = jobInput.value;
    closePopup(popupProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', formSubmitHandler);

function popupBigImage(evt) {
    const srcValue = evt.target.src;
    const caption = evt.target.alt;
    popupImage.querySelector('.popup__image').src = srcValue;
    popupImage.querySelector('.popup__image').alt = caption;
    popupImage.querySelector('.popup__figure_caption').textContent = caption;
    openPopup(popupImage);
}



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

initialCards.forEach((card) => {
    const templateElementCard = templateElement.querySelector('.elements__element').cloneNode(true);
    templateElementCard.querySelector('.elements__title').textContent = card.name;
    const img = templateElementCard.querySelector('.elements__image');
    img.src = card.link;
    img.alt = `${card.name}`;


    const likeBtn = templateElementCard.querySelector('.elements__like');
    const toggleLikeCard = () => likeBtn.classList.toggle('elements__like-active');
    likeBtn.addEventListener('click', () => toggleLikeCard())


    const deleteBtn = templateElementCard.querySelector('.elements__delete');

    const deleteCurrentCard = (e) => {
        if (e.target === e.currentTarget) {
            templateElementCard.remove()
        }
    }

    deleteBtn.addEventListener('click', deleteCurrentCard)


    ul.append(templateElementCard);
    img.addEventListener('click', popupBigImage);
    return templateElement;


});
popupCloseBtn.forEach((button) => {
    button.addEventListener('click', (evt) => {
        const popup = evt.target.closest('.popup');
        closePopup(popup);
    });
});