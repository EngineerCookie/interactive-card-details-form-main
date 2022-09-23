//Shortcuts functions
const selectAll = (x) => document.querySelectorAll(x);
const selectId = (x) => document.getElementById(x);
const errorFind = (x) => errorMsg.find(msg => msg.dataset.errorMsg === (x));
const errorAdd = (x) => x.classList.add('error');
const errorRemove = (x) => x.classList.remove('error');

//nameInput
let nameInput = selectId('owner-name'),    
    errorMsg = Array.from(selectAll('[data-error-msg]')); //Error messages

//::::: BETTER CHANGE THE BLANK ERROR CHECK FOR THE CONFIRM BOTTOM!!!! ::::::::




nameInput.addEventListener('keyup', () => {
        if (nameInput.value === '') { //Name Blank error
            errorAdd(nameInput);
            errorAdd(errorFind('name-blank'));
            return
        }
    errorRemove(nameInput);
    errorRemove(errorFind('name-blank'));

    let nameTarget = selectId('name-target'), 
    name = nameInput.value;
    nameTarget.innerHTML = name;
})

//card number input
let cardNum = selectId('card-num');

cardNum.addEventListener('change', () => { //Card Number INPUT
    let regex = /^\d+$/g,
        numValue = cardNum.value,
        error = errorMsg.filter(msg => msg.htmlFor === 'card-num'),
        cardNumArr = [];
    //RESET ERROR STATE
    errorRemove(cardNum);
    error.forEach((msg) => { 
        errorRemove(msg);
    });

    //ERRORS CHECKER//
    if(numValue === '') { //checking if empty
        errorAdd(errorFind('num-blank'));
        errorAdd(cardNum);
        return;
    }

    if (!(regex.test(numValue))) { //checking anything but numbers
        errorAdd(errorFind('card-num'));
        errorAdd(cardNum);
        return;
    }


    if(numValue.length < 16) { //when digits are not enought
        errorAdd(errorFind('num-length'));
        errorAdd(cardNum);
        return;
    }
    
    //CardNum on target
    let num1 = selectId('card-num-target1'), 
        num2 = selectId('card-num-target2'),
        num3 = selectId('card-num-target3'),
        num4 = selectId('card-num-target4');
    cardNumArr = numValue.match(/.{4}/g);
    [num1.innerHTML, num2.innerHTML, num3.innerHTML, num4.innerHTML] = cardNumArr;

    //make the input look nicer with spacing
    cardNum.value = cardNumArr.join(' ');  
    return;
})

//Date MM & YY
let dateForm = selectId('exp-date');
/*
dateForm.addEventListener('change',  () => {
    let regex = /^\d+$/g;
    
    //reset error state
    errorRemove(monthInput);
    errorRemove(errorFind('date-invalid'));

    if (!(regex.test(monthInput.value))) {
        errorAdd(monthInput);
        errorAdd(errorFind('date-invalid'));
        return;
    }
})*/