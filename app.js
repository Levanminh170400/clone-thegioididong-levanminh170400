const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

let sliderMainHeader = $('.header___slider-main')
let sliderItemHeader = $$('.header___slider-item')
let nextBtnHeader = $('.header__slider-next')
let PreBtnHeader = $('.header__slider-pre')
slider(sliderMainHeader, sliderItemHeader, nextBtnHeader, PreBtnHeader)

function slider(sliderMain, sliderItem, next, previous) {

    const sliderItemWidth = 1200
    const sliderLenght = sliderItem.length

    let positionX = 0
    let i = 1
    next.onclick = function() {
        changeSlidersingle(1)
    }

    previous.onclick = function() {
        changeSlidersingle(-1)
    }

    function changeSlidersingle(index) {
        if (index === 1) {
            ++i
            if (i > sliderLenght) {
                i = 1
                positionX = 0
                sliderMain.style = `transform:translateX(${positionX}px)`
                return
            }
            positionX -= sliderItemWidth
            sliderMain.style = `transform:translateX(${positionX}px)`
        } else if (index === -1) {
            --i
            if (i <= 0) {
                i = sliderLenght
                positionX = -(sliderItemWidth * (i - 1))
                sliderMain.style = `transform:translateX(${positionX}px)`
                return
            }
            positionX += sliderItemWidth
            console.log(`positionX_pre ${positionX}`)
            sliderMain.style = `transform:translateX(${positionX}px)`
        }
    }
    setInterval(() => {
        ++i
        if (i > sliderLenght) {
            i = 1
            positionX = 0
            sliderMain.style = `transform:translateX(${positionX}px)`
            return
        }
        positionX -= sliderItemWidth
        sliderMain.style = `transform:translateX(${positionX}px)`
    }, 2000)
}

// =============slider home================
const sliderMainHome = $('.homeMain')
const sliderItemHome = $$('.homeItem')
const nextBtnHome = $('.next__home')
const PreBtnHome = $('.pre__home')
console.log(sliderItemHome)
slider(sliderMainHome, sliderItemHome, nextBtnHome, PreBtnHome)

// === === === === ==slider discount === === === === === ===
const discountMain = $('.discountMain')
const discountItem = $$('.discountItem')
const discountNext = $('.discount__next')
const discountPrevious = $('.discount__pre')
slider(discountMain, discountItem, discountNext, discountPrevious)

// ===================== slider newchain======================
const newchainMain = $('.newchain__main')
const newchainItem = $$('.newchain__item')
const newchainNext = $('.next__chain')
const newchainPrevious = $('.pre__chain')
slider(newchainMain, newchainItem, newchainNext, newchainPrevious)

// =============== slider hotdeal==================
const hotdealMain = $('.hotdeal__main')
const hotdealItem = $$('.hotdeal__item')
const hotdealNext = $('.next__hotdeal')
const hotdealPrevious = $('.pre__hotdeal')
slider(hotdealMain, hotdealItem, hotdealNext, hotdealPrevious)

// ========Form===========

function Validator(option) {
    var selectorRules = {}



    function vadidate(inputElement, rule) {
        var errorMessage;
        var errorElement = inputElement.parentElement.querySelector(option.errorSelector)
        var rules = selectorRules[rule.selector]
        console.log("==========================")
        console.log(rule.selector, selectorRules[rule.selector])
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break;
        }
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid')
        }
        return !errorMessage;
    }
    var formElement = document.querySelector(option.form)
    console.log(formElement)
    if (formElement) {
        formElement.onsubmit = function(e) {
            e.preventDefault();
            var isFormValid = true;
            option.rule.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = vadidate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            })
            if (isFormValid) {
                if (typeof option.onsubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]')
                    var formValues = Array.from(enableInputs)
                    console.log('formValues:', formValues)
                    var data = {};
                    for (var i = 0; i < formValues.length; i++) {
                        data[formValues[i].name] = formValues[i].value;
                    }
                    option.onsubmit(data)
                }
                // Submit hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        }
        option.rule.forEach(function(rule) {
            // Lấy ra tất cả các ru cho một thẻ input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            var inputElement = formElement.querySelector(rule.selector)
            if (inputElement) {
                var errorElement = inputElement.parentElement.querySelector(option.errorSelector)
                inputElement.onblur = function() {
                    vadidate(inputElement, rule);
                }
                inputElement.oninput = function() {
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}
Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    }
}