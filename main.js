/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 979:
/***/ (() => {

class Popup {
  constructor() {
    this._button = document.querySelector('.popup-button');
    this.test = [];
  }
  clickToButton() {
    this._button.addEventListener('click', () => {
      if (this.test.length) {
        this.test.pop().remove();
        return;
      }
      const div = document.createElement('div');
      div.classList.add('popup-text');
      div.textContent = "Что-то пошло не так.";
      document.querySelector('.popup-form').append(div);
      this.test.push(div);
    });
  }
}
const obj = new Popup();
obj.clickToButton();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/js/editor.js
class ProductTable {
  constructor() {
    this._addButton = document.querySelector('.create');
    this._cancelBtn = document.querySelector('#cancel');
    this._addBtn = document.querySelector('#add');
    this._updBtn = document.querySelector('#update');
    this._addNewDataBlock = document.querySelector('.main-create-block');
    this._tabelRows = document.querySelectorAll('tr').length;
    this._alertBlock = document.querySelector('.main-alert-block');
    this.current = [];
    this.priceInput = this._addNewDataBlock.querySelector('#price');
    this.nameInput = this._addNewDataBlock.querySelector('#name');
  }
  init() {
    this._addButton.addEventListener('click', this.createData.bind(this));
    document.querySelector('table').addEventListener('click', this.editData.bind(this));
    document.querySelector('table').addEventListener('click', this.deleteData.bind(this));
    this._cancelBtn.addEventListener('click', this.closeBlock.bind(this));
    this._addBtn.addEventListener('click', this.addData.bind(this));
    this._updBtn.addEventListener('click', this.updData.bind(this));
  }
  setTableRowHTML(name, price) {
    return `
        <tr>
            <td>${name}</td>
            <td>${price}</td>
            <td>
                <div class="chexbox-btn">
                    <label for="edit-data${this._tabelRows}" class="table-row edit">
                        <input type="checkbox" id="edit-data${this._tabelRows}" class="visually-hidden">
                    </label>
                    <label for="delete-data${this._tabelRows}" class="table-row delete">
                        <input type="checkbox" id="delete-data${this._tabelRows}" class="visually-hidden">
                    </label>
                </div>
            </td>
        </tr>`;
  }
  createData() {
    if (this._addBtn.classList.contains('_hidden')) {
      this._addBtn.classList.remove('_hidden');
    }
    this._addNewDataBlock.classList.remove('_hidden');
    this._updBtn.classList.add('_hidden');
  }
  editData(e) {
    if (this._updBtn.classList.contains('_hidden')) {
      this._updBtn.classList.remove('_hidden');
    }
    this._addBtn.classList.add('_hidden');
    if (e.target.classList.contains('edit')) {
      this.current = [...e.target.closest('tr').querySelectorAll('td')].slice(0, 2);
      const [name, price] = this.current;
      this._addNewDataBlock.classList.remove('_hidden');
      this._addNewDataBlock.querySelector('#name').value = name.textContent;
      this._addNewDataBlock.querySelector('#price').value = price.textContent;
    }
  }
  deleteData(e) {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
      this._alertBlock.classList.remove('_hidden');
      this._alertBlock.querySelector('#yes').onclick = el => {
        el.preventDefault();
        e.target.closest('tr').remove();
        this._alertBlock.classList.add('_hidden');
      };
      this._alertBlock.querySelector('#no').onclick = e => {
        e.preventDefault();
        this._alertBlock.classList.add('_hidden');
      };
    }
  }
  closeBlock(e = undefined) {
    if (e) e.preventDefault();
    [...this._addNewDataBlock.querySelectorAll('input')].forEach(elem => {
      elem.value = '';
    });
    this._addNewDataBlock.classList.add('_hidden');
  }
  addData(e) {
    e.preventDefault();
    if (this.checkValidity()) {
      return;
    }
    const name = this._addNewDataBlock.querySelector('#name').value;
    const price = this._addNewDataBlock.querySelector('#price').value;
    const result = this.setTableRowHTML(name, price);
    document.querySelector('table').insertAdjacentHTML("beforeend", result);
    this.closeBlock();
  }
  updData(e) {
    e.preventDefault();
    const [name, price] = this.current;
    if (this.checkValidity()) {
      return;
    }
    name.textContent = this._addNewDataBlock.querySelector('#name').value;
    price.textContent = this._addNewDataBlock.querySelector('#price').value.replace(/\s/g, '');
    this.closeBlock();
  }
  checkValidity() {
    let result = false;
    if (isNaN(this.priceInput.value.replace(/\s?\W/g, '')) || this.priceInput.value == '') {
      if (isNaN(this.priceInput.value.replace(/\s?\W/g, ''))) {
        this.showError(this.priceInput, 'Только цифры');
      } else {
        this.showError(this.priceInput, 'Пустое значение');
      }
      result = true;
    } else {
      this.hideError(this.priceInput);
    }
    if (this.nameInput.value == '') {
      this.showError(this.nameInput, 'Пустое значение');
      result = true;
    } else {
      this.hideError(this.nameInput);
    }
    return result;
  }
  showError(input, message) {
    const errorText = input.previousElementSibling.querySelector('.error-text');
    errorText.textContent = message;
    if (errorText.classList.contains('_hidden')) {
      errorText.classList.remove('_hidden');
    }
  }
  hideError(input) {
    const errorText = input.previousElementSibling.querySelector('.error-text');
    if (!errorText.classList.contains('_hidden')) {
      errorText.classList.add('_hidden');
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const obj = new ProductTable();
obj.init();
// EXTERNAL MODULE: ./src/js/popup.js
var popup = __webpack_require__(979);
;// CONCATENATED MODULE: ./src/index.js



})();

/******/ })()
;