export class FormValidator {
    constructor(validationConfig, form) {
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(validationConfig.inputSelector));
        this._button = this._form.querySelector(this._submitButtonSelector);
        this._errorContainers = Array.from(this._form.querySelectorAll(validationConfig.errorClass));
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

    _addEventListeners() {
        this._inputs.forEach((input) => {
            input.addEventListener("input", (evt) => this._handleFieldValidation(evt));
        });
        this._form.addEventListener("input", () => this._toggleButton());
    }

    enableValidation = () => {
        this._addEventListeners();
        this._toggleButton();
    };
    resetValidation() {
        this._toggleButton();
        this._inputs.forEach((input) => {
            input.classList.remove(this._inputErrorClass);
        })
        this._errorContainers.forEach((message) => {
            message.textContent = '';
        })
    }
}