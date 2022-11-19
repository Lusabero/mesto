const popupProfile = document.querySelector('.popup_edit_profile');
const popupCloseBtn = document.querySelectorAll('.popup__close');
const editProfileBtn = document.querySelector('.profile__info-button');
const addCardBtn = document.querySelector('.profile__button-add');
const popupImage = document.querySelector('.popup_photo');
const popupNewCard = document.querySelector('.popup-card');
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
const cardsList = document.querySelector('.elements');

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

function submitCardForm(event) {
    event.preventDefault();

    const card = {
        name: cardTitle.value,
        link: cardSrc.value
    }
    createCard(card)
    closePopup(popupNewCard)

    cardTitle.value = '';
    cardSrc.value = '';
}

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
    popupImage.querySelector('.popup__figure-caption').textContent = caption;
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


function createCard(card) {
    const templateElementCard = templateElement.querySelector('.elements__element').cloneNode(true);
    const title = templateElementCard.querySelector('.elements__title');
    const likeBtn = templateElementCard.querySelector('.elements__like');
    const deleteBtn = templateElementCard.querySelector('.elements__delete');
    const img = templateElementCard.querySelector('.elements__image');

    title.textContent = card.name;
    img.src = card.link;
    img.alt = card.name;

    likeBtn.addEventListener('click', toggleLikeCard)
    deleteBtn.addEventListener('click', deleteCurrentCard)
    img.addEventListener('click', popupBigImage);

    renderCard(templateElementCard)
}

function renderCard(card) {
    cardsList.prepend(card);
}

function toggleLikeCard(event) {
    event.target.classList.toggle('elements__like-active');
}

function deleteCurrentCard(event) {
    event.currentTarget.closest('.elements__element').remove()
}


function formSubmitCard(event) {
    event.preventDefault();

    const card = {
        name: cardTitle.value,
        link: cardSrc.value
    }
    createCard(card)
    closePopup(popupNewCard)

    cardTitle.value = '';
    cardSrc.value = '';
}
addCardBtn.addEventListener('click', () => {
    openPopup(popupNewCard);
})

formElementCard.addEventListener('submit', formSubmitCard);
initialCards.forEach((card) => {
    createCard(card)
});

popupCloseBtn.forEach((button) => {
    button.addEventListener('click', (evt) => {
        const popup = evt.target.closest('.popup');
        closePopup(popup);
    });
});