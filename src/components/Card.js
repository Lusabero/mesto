export class Card {
    constructor(data, template, handleCardClick) {
        this._title = data.name;
        this._link = data.link;
        this._template = template;
        this._handleCardClick = handleCardClick;
    }

    _handleLikeButton(evt) {
        evt.target.classList.toggle('elements__like-active');
    }
    _handleTrashButton(evt) {
        evt.target.closest('.elements__element').remove();
    }
    _handleImagePopup() {
        this._handleCardClick(this._title, this._link)
    }
    _setEventListeners() {
        this._card.querySelector('.elements__like').addEventListener('click', this._handleLikeButton);
        this._card.querySelector('.elements__delete').addEventListener('click', this._handleTrashButton);
        this._cardImage.addEventListener('click', () => {
            this._handleImagePopup()
        });
    }
    createCard() {
        this._card = this._template.cloneNode(true);
        this._cardImage = this._card.querySelector('.elements__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._title;
        this._card.querySelector('.elements__title').textContent = this._title;
        this._setEventListeners();
        return this._card;
    }
}
