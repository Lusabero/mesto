const obj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.error'
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
    const element = evt.target;
    const errorContainer = document.querySelector(`#${element.id}-error`);
    element.classList.toggle(
        obj.inputErrorClass, !element.validity.valid
    );
    errorContainer.textContent = element.validationMessage;
}

function clearFormErrors(form, obj) {
    const button = form.querySelector(obj.submitButtonSelector);
    const errors = Array.from(form.querySelectorAll(obj.errorClass));
    errors.forEach((error) => {
        error.textContent = '';
    })
    toggleButton(form, obj, button);
}