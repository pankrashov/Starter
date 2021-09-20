/* eslint-disable consistent-return */
class ProjectApp {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			Signal: require('./classes/Signal').default,
		};
		this.components = {};
		this.helpers = {};
		this.modules = {};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');
		});
	}
}
global.ProjectApp = new ProjectApp();

if (module.hot) {
	module.hot.accept();
}
const cards = document.querySelector('.basket__section--cards');
const burger = document.querySelector('.header__button--burger');
const close = document.querySelector('.menu__close');
const menu = document.querySelector('.menu');
const btnBasket = document.querySelector('.header__button--basket');
const basket = document.querySelector('.basket');

const totalBasket = () => {
	const card = document.querySelector('.basket');
	const subtotal = card.querySelector('#subtotal span');
	const total = card.querySelector('#total span');
	const cardPrice = card.querySelectorAll('.card__price p');
	const prices = card.querySelectorAll('.basket__price span');

	let sum = 0;
	let i = 0;

	cardPrice.forEach(element => {
		const t = +element.textContent;
		sum += t;
		subtotal.textContent = sum;
	});

	prices.forEach(element => {
		const t = +element.textContent;
		i += t;
		total.textContent = i;
	});
};

const counter = (target, parent) => {
	const col = parent.querySelector('.card__cnt');
	let cnt = col.textContent;
	const blockProce = parent.querySelector('.card__price p');
	const btn = parent.querySelector('.card__button');
	const prise = parent.dataset.price;
	const isDecrease = !target.closest('.card__button--decrease');
	if (isDecrease) {
		cnt++;
	} else {
		cnt--;
	}

	btn.classList.remove('disable');

	col.textContent = cnt;
	blockProce.textContent = prise * cnt;
	totalBasket();

	if (cnt <= 0) {
		btn.classList.add('disable');
		return false;
	}
};

const actions = event => {
	const target = event.target;
	const parent = target.closest('.card');

	if (target.closest('.card__close')) {
		parent.remove();
		totalBasket();
	}

	if (target.closest('.card__button')) {
		counter(target, parent);
	}
};

const toggle = () => {
	if (!menu.classList.contains('active')) {
		menu.classList.add('active');
	} else {
		menu.classList.remove('active');
	}
};

const toggleBasket = () => {
	if (!basket.classList.contains('active')) {
		basket.classList.add('active');
	} else {
		basket.classList.remove('active');
	}
};

totalBasket();
cards.addEventListener('click', actions);
burger.addEventListener('click', toggle);
btnBasket.addEventListener('click', toggleBasket);
close.addEventListener('click', toggle);

if (module.hot) {
	module.hot.dispose(() => {
		cards.removeEventListener('click', actions);
		burger.removeEventListener('click', toggle);
		close.removeEventListener('click', toggle);
	});
}
