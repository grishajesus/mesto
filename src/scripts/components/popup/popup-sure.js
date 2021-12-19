import { Popup } from "./popup";

class PopupSure extends Popup {
    constructor(selector, onSubmitForm) {
        super(selector);

        this.form = this.popup.querySelector("form");
        this.submitButton = this.form.querySelector("button[type=submit]");
        this.onSubmitted = null;
        this.onSubmitForm = onSubmitForm.bind(this);
    }

    enableLoading() {
        const originText = this.submitButton.textContent;

        this.submitButton.setAttribute("data-origin-text", originText);
        this.submitButton.textContent = "Загрузка...";
    }

    disableLoading() {
        const originText = this.submitButton.getAttribute("data-origin-text");

        this.submitButton.removeAttribute("origin-text");
        this.submitButton.textContent = originText;
    }

    setOnSubmitted(onSubmitted) {
        this.onSubmitted = onSubmitted;
    }

    setEventListeners() {
        super.setEventListeners();

        this.form.addEventListener("submit", this.onSubmitForm);
    }
}

export { PopupSure };
