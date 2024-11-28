// *Проверка поддержки Webp
import * as andreyFunctions from "./modules/functions.js";

andreyFunctions.isWebp();
// =======================================================================================================
// * Меню бургер
const burger = document.querySelector('.burger');

if (burger) {
    const menuInner = document.querySelector('.menu__inner');
    burger.addEventListener('click', (e) => {
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Открыть меню');
        document.body.classList.toggle('_lock');
        burger.classList.toggle('_active');
        menuInner.classList.toggle('_active');

        if (burger.classList.contains('_active')) {
            burger.setAttribute('aria-expanded', 'true');
            burger.setAttribute('aria-label', 'Закрыть меню');
            const menuLinks = document.querySelectorAll('[data-burger-link]');

            menuLinks.forEach(link => link.addEventListener('click', (e) => {
                document.body.classList.remove('_lock');
                burger.classList.remove('_active');
                menuInner.classList.remove('_active');
                burger.setAttribute('aria-expanded', 'false');
                burger.setAttribute('aria-label', 'Открыть меню');
            }));
        }
    });
}

// * Фиксация шапки
const header = document.querySelector('.header');
const headerBody = document.querySelector('.header__body');

window.addEventListener("scroll", (e) => {
    const scrollPos = window.scrollY;

    if (scrollPos >= 50) {
        header.classList.add('_active');
        headerBody.classList.add('_active');
    } else {
        header.classList.remove('_active');
        headerBody.classList.remove('_active');
    }
});

// =======================================================================================================
// * Swiper
import Swiper from 'swiper';
import { Navigation, Autoplay, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

if (document.querySelector('.product-slider__slider')) {
    new Swiper('.product-slider__slider', {
        modules: [Navigation, Autoplay],

        speed: 800,
        spaceBetween: 40,
        slidesPerView: 3,
        autoplay: {
            delay: 4000,
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}
if (document.querySelector('.two-slider')) {
    new Swiper('.two-slider', {
        modules: [Autoplay],

        speed: 800,
        spaceBetween: 40,
        slidesPerView: 3.5,
        autoplay: {
            delay: 4000,
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1.5,
            },
            768: {
                slidesPerView: 2.5,
            },
            992: {
                slidesPerView: 3.5,
            },
        },
    });
}
if (document.querySelector('.images-product')) {
    const thumbsSwiper = new Swiper('.thumbs-images', {
        modules: [Navigation, Thumbs],

        speed: 800,
        spaceBetween: 16,
        slidesPerView: 3,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    new Swiper('.images-product__slider', {
        modules: [Autoplay, Thumbs],

        speed: 800,
        spaceBetween: 40,
        slidesPerView: 1,
        autoplay: {
            delay: 4000,
        },
        thumbs: {
            swiper: thumbsSwiper,
        },
    });
}


// https://swiperjs.com/ - документация

// =======================================================================================================
// * noUiSlider
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const rangeSlider = document.getElementById('price-range');
const rangeFrom = document.getElementById('price-range-from');
const rangeTo = document.getElementById('price-range-to');
const rangeInputs = [rangeFrom, rangeTo];

if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
        start: [Number(rangeFrom.value), Number(rangeTo.value)],
        step: 200,
        connect: true,
        tooltips: [true, true],
        range: {
            'min': Number(rangeFrom.min),
            'max': Number(rangeTo.max)
        }
    });

    rangeSlider.noUiSlider.on('update', function (values, handle) {
        rangeInputs[handle].value = values[handle];
    });
}

// https://refreshless.com/nouislider/ - документация

// =======================================================================================================
// * Spoller
const spollerButtons = document.querySelectorAll('._spoller-button');
const spollerBody = document.querySelectorAll('._spoller-body');
const spollerArrow = document.querySelectorAll('._spoller-arrow');
const spollerLinks = document.querySelectorAll('._spoller-link');

spollerButtons.forEach(i => {
    spollerBody.forEach(j => {
        if (i.getAttribute('data-spoller-button') === j.getAttribute('data-spoller-path')) {
            i.addEventListener('click', (e) => {
                i.classList.toggle('_active');
                j.classList.toggle('_active');

                if (i.classList.contains('_active')) {
                    i.setAttribute('aria-expanded', 'true');
                    j.setAttribute('aria-hidden', 'false');

                    if (j.querySelector('[data-spoller-link]')) {
                        spollerLinks.forEach(p => {
                            if (i.getAttribute('data-spoller-button') === p.getAttribute('data-spoller-link')) {
                                p.setAttribute('tabindex', '0');
                            }
                        });
                    }
                } else {
                    i.setAttribute('aria-expanded', 'false');
                    j.setAttribute('aria-hidden', 'true');

                    if (j.querySelector('[data-spoller-link]')) {
                        spollerLinks.forEach(p => {
                            if (i.getAttribute('data-spoller-button') === p.getAttribute('data-spoller-link')) {
                                p.setAttribute('tabindex', '-1');
                            }
                        });
                    }
                }

                if (i.nextElementSibling.hasAttribute('data-spoller-arrow')) {
                    spollerArrow.forEach(k => {
                        if (k.getAttribute('data-spoller-arrow') === i.getAttribute('data-spoller-button')) {
                            k.classList.toggle('_active');
                        }
                    });
                }
            });
        }
    });
});

// доработка спройлера в шапке
const spollerMenu = document.querySelectorAll('.spoller-menu');

spollerMenu.forEach((spollerMenu) => {
    const spollerMenuButton = spollerMenu.querySelectorAll('.spoller-menu__button');
    const spollerMenuList = spollerMenu.querySelectorAll('.spoller-menu__list');

    spollerMenuButton.forEach((spollerButton) => {
        spollerButton.addEventListener('click', (e) => {
            spollerMenuList.forEach((spollerList) => {
                spollerList.classList.toggle('_active');
            });
        });
    });
});

// =======================================================================================================
// * search
const buttonSearch = document.querySelector('.actions-header__search');
const search = document.querySelector('.search');
const inputSearch = search.querySelector('.main-form__input_search');

buttonSearch.addEventListener('click', (e) => {
    search.classList.toggle('_active');
});

// Закрытие search
document.addEventListener('click', (e) => {
    if (e.target !== buttonSearch && e.target !== inputSearch) {
        search.classList.remove('_active');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        search.classList.remove('_active');
    }
});

// =======================================================================================================
// * Modal
/*const modal = document.querySelectorAll('.modal');
const modalOpen = document.querySelectorAll('._modal-open');
const modalClose = document.querySelectorAll('._modal-close');

modalOpen.forEach(item => item.addEventListener('click', (e) => {
    let path = e.currentTarget.getAttribute('data-modal-path');
    document.querySelector(`[data-modal-target="${path}"]`).classList.add('_active');

    modal.forEach(item => {
        if (item.classList.contains('_active')) {
            item.showModal();
            document.body.classList.add('_lock');
        }
    });
}));

modalClose.forEach(item => item.addEventListener('click', (e) => {
    if (e.target == item) {
        modal.forEach(item => {
            item.close();
            item.classList.remove('_active');
        });
        document.body.classList.remove('_lock');
    }
}));

modal.forEach(item => item.addEventListener('click', ({ currentTarget, target }) => {
    const dialog = currentTarget;
    const isOnOverlayClick = target === dialog;
    if (isOnOverlayClick) {
        modal.forEach(item => {
            item.close();
            item.classList.remove('_active');
        });
        document.body.classList.remove('_lock');
    }
}));

modal.forEach(item => item.addEventListener('cancel', () => {
    if (item.classList.contains('_active')) {
        item.close();
        item.classList.remove('_active');
        document.body.classList.remove('_lock');
    }
}));*/

// =======================================================================================================
// *tab
const tab = document.querySelectorAll('._tab');

tab.forEach(tab => {
    const tabButtons = tab.querySelectorAll('._tab-button');
    const tabContents = tab.querySelectorAll('._tab-content');

    tabButtons.forEach(tabButton => {
        tabButton.addEventListener('click', e => {
            // 1. Убираю класс _active у кнопки и у контента таба и выключаем aria-selected на false
            tabButtons.forEach(tabButton => {
                tabButton.classList.remove('_active');
                tabButton.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(tabContent => {
                tabContent.classList.remove('_active')
            });

            // 2 Добавление класса _active кнопки и меняем значение у aria-selected на true
            e.currentTarget.classList.add('_active');
            e.currentTarget.setAttribute('aria-selected', 'true');

            // 3 Показываем нужный контент в табе
            let valueTabButtons = e.currentTarget.getAttribute('data-tab-path');
            let valueAttrTabContent = tab.querySelector(`[data-tab-target="${valueTabButtons}"]`).getAttribute('data-tab-target');
            let objectTabContent = tab.querySelector(`[data-tab-target="${valueTabButtons}"]`);

            console.log(valueTabButtons);
            console.log(valueAttrTabContent);
            console.log(objectTabContent);

            if (valueTabButtons === valueAttrTabContent) {
                objectTabContent.classList.add('_active');
            }
        });
    });
});

// =======================================================================================================
// *imask
// import IMask from 'imask';

// объект который нужен
// const phoneInput = document.getElementById('phone');

// заполнение маски
/*IMask(
    phoneInput,
    { mask: '+{380} (00) 00-00-000' }
);*/

// =======================================================================================================
// *just validate
// import JustValidate from 'just-validate';

// Пример валидации формы
/*const validation = new JustValidate('#form');
validation
    .addField('#name-input', [
        {
            rule: 'required',
            errorMessage: 'Имя обязательно',
        },
        {
            rule: 'minLength',
            value: 5,
            errorMessage: 'Минимум 5 символов',
        },
        {
            rule: 'maxLength',
            value: 15,
            errorMessage: 'Максимум 15 символов',
        },
    ])
    .addField('#tel-input', [
        {
            rule: 'required',
            errorMessage: 'Номер обязателен',
        },
    ])*/

// =======================================================================================================
// * quantity
const quantity = document.querySelector('.quantity');
const quantityButtonMinus = document.querySelector('.quantity__button_minus');
const quantityButtonPlus = document.querySelector('.quantity__button_plus');
const quantityCurrent = document.querySelector('.quantity__input');

if (quantity) {
    let textQuantityCurrent = Number(quantityCurrent.getAttribute('value'));

    function quantityMinus() {
        if (textQuantityCurrent > 1) {
            let quantityMinus = textQuantityCurrent -= 1;
            quantityCurrent.setAttribute('value', quantityMinus);
        }
    }

    function quantityPlus() {
        if (textQuantityCurrent < 30) {
            let quantityPlus = textQuantityCurrent += 1;
            quantityCurrent.setAttribute('value', quantityPlus);
        }
    }

    quantityButtonMinus.addEventListener('click', quantityMinus);
    quantityButtonPlus.addEventListener('click', quantityPlus);
}

// =======================================================================================================
// * Custom select
const select = document.querySelectorAll('.select');

if (select) {
    select.forEach((selectWrapper) => {
        const selectButton = selectWrapper.querySelector('.select__button');
        const selectIcon = selectWrapper.querySelector('.select__icon');
        const selectList = selectWrapper.querySelector('.select__list');
        const selectItem = selectList.querySelectorAll('.select__item');
        const selectInput = selectWrapper.querySelector('.select__input');

        // Назначение по умолчанию атрибута aria-label кнопке
        selectButton.setAttribute('aria-label', 'Комбинированный список ' + selectButton.innerText);

        // Значение по умолчанию у input атрибута value
        selectInput.setAttribute('value', selectList.children[0].getAttribute('data-value'));

        // Счетчик для переключателя select`а клавишами ArrowDown и ArrowUp
        let count = 0;

        // Клик по кнопке. Открыть/Закрыть select
        selectButton.addEventListener('click', (e) => {
            selectIcon.classList.toggle('_active');
            selectList.classList.toggle('_active');
            selectButton.classList.add('_active');
            selectButton.setAttribute('aria-expanded', 'false');
            selectList.setAttribute('aria-hidden', 'true');
            selectItem.forEach(item => {
                item.classList.toggle('_active');
            });

            if (selectList.classList.contains('_active')) {
                selectButton.setAttribute('aria-expanded', 'true');
                selectList.setAttribute('aria-hidden', 'false');
            }
        });

        // Переключатель select`а клавишами ArrowDown и ArrowUp
        selectButton.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (count < selectList.children.length - 1) {
                    count += 1;
                    selectItem.forEach(item => item.classList.remove('_focus-visible'));
                    selectList.children[count].classList.add('_focus-visible');
                    selectButton.innerText = selectList.children[count].innerText;
                    selectInput.setAttribute('value', selectList.children[count].dataset.value);
                }
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (count > 0) {
                    count = count - 1;
                    selectItem.forEach(item => item.classList.remove('_focus-visible'));
                    selectList.children[count].classList.add('_focus-visible');
                    selectButton.innerText = selectList.children[count].innerText;
                    selectInput.setAttribute('value', selectList.children[count].dataset.value);
                }
            }
        });

        // Выбор элемента списка. Запомнить выбор. Закрыть дропдаун
        selectItem.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                selectButton.innerText = e.target.innerText;
                selectInput.setAttribute('value', e.target.dataset.value);
                selectList.classList.remove('_active');
                selectButton.setAttribute('aria-expanded', 'false');
                selectList.setAttribute('aria-hidden', 'true');
                selectIcon.classList.remove('_active');
                selectItem.forEach(item => {
                    item.classList.remove('_focus-visible');
                    item.classList.remove('_active');
                });
                e.target.classList.add('_focus-visible');
            });
        });

        // Клик за пределами select`а - закрыть
        document.addEventListener('click', (e) => {
            if (e.target !== selectButton) {
                selectList.classList.remove('_active');
                selectIcon.classList.remove('_active');
                selectButton.classList.remove('_active');
                selectButton.setAttribute('aria-expanded', 'false');
                selectList.setAttribute('aria-hidden', 'true');
                selectItem.forEach(item => {
                    item.classList.remove('_active');
                });
            }
        });

        // Нажатие по esc и tab - закрыть дропдаун
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' || e.key === 'Escape') {
                selectList.classList.remove('_active');
                selectIcon.classList.remove('_active');
                selectButton.classList.remove('_active');
                selectButton.setAttribute('aria-expanded', 'false');
                selectList.setAttribute('aria-hidden', 'true');
                selectItem.forEach(item => {
                    item.classList.remove('_active');
                });
            }
        });
    });
}