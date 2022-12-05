const popupProfile = document.querySelector('.popup_edit_profile');
const popupCloseBtns = document.querySelectorAll('.popup__close');
const profileEditBtn = document.querySelector('.profile__info-button');
const cardAddBtn = document.querySelector('.profile__button-add');
const popupImage = document.querySelector('.popup__photo');
const popupBigImage = popupImage.querySelector('.popup__image');
const caption = popupImage.querySelector('.popup__figure-caption');
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

function openPopup(element) {
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

profileEditBtn.addEventListener('click', () => {
    openPopup(popupProfile);
    editProfile();
})


cardAddBtn.addEventListener('click', () => {
    openPopup(popupNewCard);
})

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    nameInfo.textContent = nameInput.value;
    jobInfo.textContent = jobInput.value;
    closePopup(popupProfile);
    evt.target.reset();
    clearFormErrors(evt.target, obj)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handleProfileFormSubmit);

function openPopupImage(evt) {
    popupBigImage.src = evt.target.src;
    caption.textContent = evt.target.alt;
    popupBigImage.alt = evt.target.alt;

    openPopup(popupImage);
}

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


function createCard(srcValue, titleValue) {
    const templateElementCard = templateElement.querySelector('.elements__element').cloneNode(true);
    const cardImage = templateElementCard.querySelector('.elements__image');
    cardImage.src = srcValue;
    cardImage.alt = titleValue;
    templateElementCard.querySelector('.elements__title').textContent = titleValue;
    templateElementCard.querySelector('.elements__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('elements__like-active');
    });
    templateElementCard.querySelector('.elements__delete').addEventListener('click', (evt) => {
        const card = evt.target.closest('.elements__element');
        card.remove();
    });
    cardImage.addEventListener('click', openPopupImage);
    return templateElementCard;
}

function renderCard(card) {
    cardsList.prepend(card);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const card = createCard(cardSrcInput.value, cardTitleInput.value);
    renderCard(card);
    closePopup(popupNewCard);
    evt.target.reset();
    clearFormErrors(evt.target, obj)
}

cardAddBtn.addEventListener('click', () => {
    openPopup(popupNewCard);
})

formElementCard.addEventListener('submit', handleCardFormSubmit);
initialCards.forEach((element) => {
    const card = createCard(element.link, element.name);
    renderCard(card);
})

popupCloseBtns.forEach((button) => {
    button.addEventListener('click', (evt) => {
        const popup = evt.target.closest('.popup');
        closePopup(popup);
    });
});
popupImage.addEventListener('click', closePopupOverlay);
popupProfile.addEventListener('click', closePopupOverlay);
popupNewCard.addEventListener('click', closePopupOverlay);