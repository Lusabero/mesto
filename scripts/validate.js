const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}


enableValidation(obj);

function enableValidation(obj) {
    const forms = Array.from(document.querySelectorAll(obj.formSelector));
    forms.forEach(form => addListenersToForm(form, obj));

}


function addListenersToForm(form, obj) {
    const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
    inputs.forEach(input => addListenersToInput(input, obj));
    const button = form.querySelector(obj.submitButtonSelector);
    form.addEventListener('input', (evt) => handleFormInput(evt, obj, button));
    toggleButton(form, obj, button);

}

function handleFormInput(evt, obj, button) {
    toggleButton(evt.currentTarget, obj, button);
}

function toggleButton(form, obj, button) {
    const isFormInvalid = !form.checkValidity();

    button.disabled = isFormInvalid;
    button.classList.toggle(obj.inactiveButtonClass, isFormInvalid);

}


function addListenersToInput(input, obj) {
    input.addEventListener('input', (evt) => handleFieldValidation(evt, obj));
}

function handleFieldValidation(evt, obj) {
    const formElement = evt.target.closest(obj.formSelector)
    isValid(formElement, evt.target)
}

function clearFormErrors(form) {
    const button = form.querySelector('.popup__button');
    const inputElements = Array.from(form.querySelectorAll(obj.inputSelector));
    inputElements.forEach((input) => {
        hideInputError(form, input)
    })
    toggleButton(form, obj, button);
}

function isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideInputError(formElement, inputElement)
    }
}

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(obj.errorClass)
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass)
    errorElement.textContent = ''
    errorElement.classList.remove(obj.errorClass)
}