import { keyCodes } from "../constants/common.js"

class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
    }

    open() {
        if (!this._popup) {
            return;
        }

        this._popup.style.display = 'flex';
        this._popup.classList.add('popup_opened');

        this._popup.addEventListener('click', this._handleClickOverlayClose);
        document.body.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        if (!this._popup) {
            return;
        }

        this._popup.classList.remove('popup_opened');

        this._popup.removeEventListener('click', this._handleClickOverlayClose);
        document.body.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popup
            .querySelector('.popup__close-button')
            .addEventListener('click', () => this.close());
    }

    _handleClickOverlayClose = event => {
        if (event.target.classList.contains('popup')) {
            this.close(this._popup);
        }
    }

    _handleEscClose = event => {
        if (event.code === keyCodes.ESCAPE && this._popup !== null) {
            this.close();
        }
    }
}

export { Popup };
