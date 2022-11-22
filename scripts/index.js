const popupProfile = document.querySelector('.popup_edit_profile');
const popupCloseBtns = document.querySelectorAll('.popup__close');
const editProfileBtn = document.querySelector('.profile__info-button');
const addCardBtn = document.querySelector('.profile__button-add');
const popupImage = document.querySelector('.popup_photo');
const popupBigImage = popupImage.querySelector('.popup__image');
const caption = popupImage.querySelector('.popup__figure-caption');
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
    document.addEventListener('keydown', (evt) => closePopupKeyEsc(element, evt));
}

function closePopup(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupKeyEsc);
}


function closePopupKeyEsc(element, evt) {
    if (evt.key === 'Escape') {
        closePopup(element);
    }
};

function closePopupOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
};

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
function handlerProfiltFormSubmit(evt) {
    evt.preventDefault();

    nameInfo.textContent = nameInput.value;
    jobInfo.textContent = jobInput.value;
    closePopup(popupProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handlerProfiltFormSubmit);

function openPopupImage(evt) {
    popupBigImage.src = evt.target.src;
    caption.textContent = evt.target.alt;
    openPopup(popupImage);
}



// const ul = document.querySelector('.elements');

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



function hanlerCardFormSubmit(evt) {
    evt.preventDefault();
    srcInput = cardSrc.value;
    placeInput = cardTitle.value;
    const card = createCard(srcInput, placeInput);
    renderCard(card);
    closePopup(popupNewCard);
    evt.target.reset();
}

addCardBtn.addEventListener('click', () => {
    openPopup(popupNewCard);
})

formElementCard.addEventListener('submit', hanlerCardFormSubmit);
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