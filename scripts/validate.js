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
    // console.log(forms);
}


function addListenersToForm(form, obj) {
    const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
    inputs.forEach(input => addListenersToInput(input, obj));

    form.addEventListener('input', (evt) => handleFormInput(evt, obj));
    toggleButton(form, obj);
    // console.log(inputs);
}

function handleFormInput(evt, obj) {
    toggleButton(evt.currentTarget, obj);
}

function toggleButton(form, obj) {
    const button = form.querySelector(obj.submitButtonSelector);
    const isFormInvalid = !form.checkValidity();

    button.disabled = isFormInvalid;
    button.classList.toggle(obj.inactiveButtonClass, isFormInvalid);
    // console.log(button);
    // console.log(isFormInvalid);
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
    // console.log(element);
    console.log(errorContainer);

    errorContainer.textContent = element.validationMessage;
}