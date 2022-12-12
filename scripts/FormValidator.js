export class FormValidator {
    constructor(obj, form) {
        this._submitButtonSelector = obj.submitButtonSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._inputErrorClass = obj.inputErrorClass;
        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(obj.inputSelector));
        this._button = this._form.querySelector(this._submitButtonSelector);
        this._errorContainers = Array.from(this._form.querySelectorAll(obj.errorClass));
    }

    _handleFieldValidation(evt) {
        this._element = evt.target;
        this._errorContainer = this._form.querySelector(`#${this._element.id}-error`);
        this._element.classList.toggle(
            this._inputErrorClass,
            !this._element.validity.valid
        );

        this._errorContainer.textContent = this._element.validationMessage;
    }

    _toggleButton() {
        this._isFormInvalid = !this._form.checkValidity();
        this._button.disabled = this._isFormInvalid;
        this._button.classList.toggle(this._inactiveButtonClass, this._isFormInvalid);
    }

    _addListenersToInput(input) {
        input.addEventListener("input", (evt) => this._handleFieldValidation(evt));
    }
    enableValidation = () => {
        this._inputs.forEach((input) => this._addListenersToInput(input));
        this._form.addEventListener("input", () => this._toggleButton());
        this._toggleButton();
    };
    resetValidation() {
        this._form.reset();
        this._toggleButton();
        this._inputs.forEach((input) => {
            input.classList.remove(this._inputErrorClass);
        })
        this._errorContainers.forEach((message) => {
            message.textContent = '';
        })
    }
}