class Popup {
    constructor() {
        this._button = document.querySelector('.popup-button')
        this.test = []
    }
    
    clickToButton() {
        this._button.addEventListener('click', () => {
            if (this.test.length) {
                this.test.pop().remove()
                return
            }
            const div = document.createElement('div')
            div.classList.add('popup-text')
            div.textContent = "Что-то пошло не так."
            document.querySelector('.popup-form').append(div)
            this.test.push(div)
        })
    }
}

const obj = new Popup()
obj.clickToButton()