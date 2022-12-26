import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDelete from "../components/PopupWithDelete";
import Api from "../components/Api";
import {
    config,
    buttonOpenPopupProfile,
    templateElement,
    imgPopup,
    titlePopup,
    elementAddButton,
    formPopupProfile,
    formPopupAddElement,
    inputList,
    buttonOpenChangeAvatar,
    formPopupAvatar
} from '../utils/constants.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-54',
    headers: {
        authorization: '8063a2a8-a4b0-485f-8e2b-9ea71ea657df',
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo({
    name: '.profile__info-title',
    about: '.profile__info-subtitle',
    avatar: '.profile__image'
})

api.getAllData()
    .then((data) => {
        const [dataProfile, dataCards] = data;
        userInfo.setUserInfo(dataProfile);
        const userId = userInfo._id;

        function createdCard(item) {
            const card = new Card(userId, item, templateElement,
                {
                    handleCardClick: () => {
                        popupBigImage.open(item.name, item.link);
                    },

                    handleCardDelete: () => {
                        popupWithDelete.open();
                        popupWithDelete.setHandleSubmit(function () {
                            api.deleteCard(card._id)
                                .then(() => {
                                    card.handleCardRemove();
                                    popupWithDelete.close();
                                })
                                .catch((err) => {
                                    console.error(`Ошибка: ${err}`)
                                })
                                .finally(() => {
                                    popupWithDelete.handleLoading('Да');
                                });
                        })
                    },

                    handleAddLike: () => {
                        api.setLike(item._id)
                            .then((item) => {
                                card.showLikeCounter(item.likes);
                                card.handleToggleLike();
                            })
                            .catch((err) => {
                                console.error(`Ошибка: ${err}`)
                            })
                    },

                    handleDeleteLike: () => {
                        api.deleteLike(item._id)
                            .then((item) => {
                                card.showLikeCounter(item.likes);
                                card.handleToggleLike();
                            })
                            .catch((err) => {
                                console.error(`Ошибка: ${err}`)
                            })
                    }
                });
            return card.createCard();
        }

        const cardList = new Section({
            renderer: (item) => {
                cardList.addItem(createdCard(item))
            }
        }, '.elements');

        const popupWithFormAddElement = new PopupWithForm('.popup-card',
            {
                submitRenderer: (formData) => {
                    const inputValue = { elementName: formData.nameCardTitle, link: formData.popupCardSrc }
                    api.setCard(inputValue)
                        .then((item) => {
                            cardList.addItem(createdCard(item));
                            popupWithFormAddElement.close();
                        })
                        .catch((err) => {
                            console.error(`Ошибка: ${err}`)
                        })
                        .finally(() => {
                            popupWithFormAddElement.handleLoading('Создать');
                        });
                }
            })

        popupWithFormAddElement.setEventListeners();

        elementAddButton.addEventListener('click', () => {
            validationFormAddElement.resetValidation();
            popupWithFormAddElement.open();
        });

        cardList.renderItems(dataCards.reverse());
    })
    .catch((err) => {
        console.error(`Ошибка: ${err}`)
    });





const popupWithDelete = new PopupWithDelete('.popup_delete-card');
const popupBigImage = new PopupWithImage(imgPopup, titlePopup, '.popup__photo');

const popupWithFormProfile = new PopupWithForm('.popup_edit_profile',
    {
        submitRenderer: (formData) => {
            const inputValue = { userName: formData.nameInput, userJob: formData.jobInput };
            api.setUserInfo(inputValue)
                .then((data) => {
                    userInfo.setUserInfo(data);
                    popupWithFormProfile.close();
                })
                .catch((err) => {
                    console.error(`Ошибка: ${err}`)
                })
                .finally(() => {
                    popupWithFormProfile.handleLoading('Сохранить');
                });
        }
    })

const popupAvatar = new PopupWithForm('.popup_avatar',
    {
        submitRenderer: (formData) => {
            const inputValue = { avatar: formData.avatar };
            api.changeAvatar(inputValue)
                .then((data) => {
                    userInfo.setUserInfo(data);
                    popupAvatar.close();
                })
                .catch((err) => {
                    console.error(`Ошибка: ${err}`)
                })
                .finally(() => {
                    popupAvatar.handleLoading('Сохранить');
                });
        }
    })

buttonOpenChangeAvatar.addEventListener('click', () => {
    validationFormAvatar.resetValidation();
    popupAvatar.open();
})

buttonOpenPopupProfile.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    inputList.forEach((input) => {
        input.value = userData.name
        if (input.name === 'userJob') {
            input.value = userData.about
        }
    });
    validationFormProfile.resetValidation();
    popupWithFormProfile.open();
});

popupWithFormProfile.setEventListeners();
popupBigImage.setEventListeners();
popupAvatar.setEventListeners();
popupWithDelete.setEventListeners();

const validationFormProfile = new FormValidator(config, formPopupProfile);
validationFormProfile.enableValidation();

const validationFormAddElement = new FormValidator(config, formPopupAddElement);
validationFormAddElement.enableValidation();

const validationFormAvatar = new FormValidator(config, formPopupAvatar);
validationFormAvatar.enableValidation();
