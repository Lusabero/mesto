import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this._img = this._popup.querySelector('.popup__image')
        this._titlePopup = this._popup.querySelector('.popup__figure-caption');
    }

    open(name, link) {
        this._img.src = link;
        this._img.alt = name;
        this._titlePopup.textContent = name;
        super.open();
    }
}
