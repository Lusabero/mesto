import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(imgPopup, titlePopup, selectorPopup) {
        super(selectorPopup);
        this._imgPopup = imgPopup;
        this._img = this._imgPopup.querySelector('.popup__image')
        this._titlePopup = titlePopup;
    }

    open(name, link) {
        this._img.src = link;
        this._img.alt = name;
        this._titlePopup.textContent = name;
        super.open();
    }
}
