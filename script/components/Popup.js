import { keyCodes } from "../constants/common.js"

class Popup {
    constructor(selector) {
        this.popup = document.querySelector(selector);
    }

    open() {
        if (!this.popup) {
            return;
        }

        this.popup.style.display = 'flex';
        this.popup.classList.add('popup_opened');

        this.popup.addEventListener('click', this._handleClickOverlayClose);
        document.body.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        if (!this.popup) {
            return;
        }

        this.popup.classList.remove('popup_opened');

        this.popup.removeEventListener('click', this._handleClickOverlayClose);
        document.body.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this.popup
            .querySelector('.popup__close-button')
            .addEventListener('click', () => this.close());
    }

    _handleClickOverlayClose = event => {
        if (event.target.classList.contains('popup')) {
            this.close(this.popup);
        }
    }

    _handleEscClose = event => {
        if (event.code === keyCodes.ESCAPE && this.popup !== null) {
            this.close();
        }
    }
}

export { Popup };
