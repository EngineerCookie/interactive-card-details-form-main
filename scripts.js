//Shortcuts functions: because otherwise would be writing them over and over again
const selectAll = (x) => document.querySelectorAll(x);
const selectId = (x) => document.getElementById(x);
const errorFind = (x) => errorMsg.find(msg => msg.dataset.errorMsg === (x));
const errorAdd = (x) => x.classList.add('error');
const errorRemove = (x) => x.classList.remove('error');
const noSpaceBar = (x) => x.addEventListener('keydown', (e) => {if (e.key == ' ') {e.preventDefault();}});
const blankErrorAdd = (input, errorId) => input.addEventListener('focusout', () => {
    input.value = input.value.trim();
    if(input.value == '') {
        errorAdd(errorFind(errorId));
        errorAdd(input);
    }
});

/*###############
Card Owner Input
#################*/
let nameInput = selectId('owner-name'),    
    errorMsg = Array.from(selectAll('[data-error-msg]')); //All error messages for errorFind(x)

nameInput.addEventListener('keyup', () => {
    errorRemove(nameInput); //reset error states
    errorRemove(errorFind('name-blank'));

    let nameTarget = selectId('name-target');
    nameTarget.innerHTML = nameInput.value;
})

blankErrorAdd(nameInput,'name-blank');

/*###############
Card Number Input
#################*/
let cardNum = selectId('card-num'),
    cardNumArr = [];

blankErrorAdd(cardNum, 'num-blank');

cardNum.addEventListener('change', () => { //Card Number INPUT
    let regex = /^\d+[ ]*\d+[ ]*\d+[ ]*\d+$/g,
        numValue = cardNum.value,
        error = errorMsg.filter(msg => msg.htmlFor === 'card-num');
    //RESET ERROR STATE
    errorRemove(cardNum);
    error.forEach((msg) => { 
        errorRemove(msg);
    });
    //ERRORS CHECKER
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
    return;
})

//make the input look nicer with spacing
cardNum.addEventListener('focusout', () => {
        cardNum.value = cardNumArr.join(' ');  
        return;
})

//deletes spaces for edition
cardNum.addEventListener('focus', () => { 
    cardNum.value = cardNum.value.split(' ').join('');
    noSpaceBar(cardNum);
    return;
})


/*###############
    EXP DATE
#################*/

let dateForm = selectId('exp-date'),
    expMM = selectId('exp-mm'),
    expYY = selectId('exp-yy');

noSpaceBar(dateForm); //no spacebar for date
blankErrorAdd(expMM, 'date-blank');
blankErrorAdd(expYY, 'date-blank');


dateForm.addEventListener('change', () => { //label error state reset
    //Solo si ambos MM y YY no tienen error, reset el state del Label
    if (expMM.classList.contains('error') || expYY.classList.contains('error')) {
        return;
    }
    errorRemove(errorFind('date-invalid'));
    errorRemove(errorFind('date-blank'));
    return;
})

expMM.addEventListener('change', () => {
    let regex = /^[\d]+$/g; //detect anything but number

    // invalid month
    if (!(regex.test(expMM.value)) || (expMM.value < 1 || expMM.value > 12)) { 
        errorAdd(errorFind('date-invalid'));
        errorAdd(expMM);
        return;
    }

    //reset input error state
    errorRemove(expMM); 

    //adds cero keep 2 digits
    if (expMM.value.length == 1) { 
        expMM.value = `0${expMM.value}`;
    }

    //MM target
    let mm = selectId('month-target');
    mm.innerHTML = expMM.value;
    return;    
})

expYY.addEventListener('change', () => {
    let regex = /^[\d]+$/g; //detect anything but number

    // invalid month
    if (!(regex.test(expYY.value))) { 
        errorAdd(errorFind('date-invalid'));
        errorAdd(expYY);
        return;
    }

    //reset input error state
    errorRemove(expYY);

    //adds cero keep 2 digits
    if (expYY.value.length == 1) { 
        expYY.value = `0${expYY.value}`;
    }

    //MM target
    let yy = selectId('year-target');
    yy.innerHTML = expYY.value;
    return;    
})

/*###############
    CSC / CVC
#################*/
let cscForm = selectId('card-csc');

noSpaceBar(cscForm);
blankErrorAdd(cscForm, 'csc-blank');

cscForm.addEventListener('change', () => {
    let regex = /^\d+$/g;
    let cscTarget = selectId('csc-target');

    //reset error state
    errorRemove(cscForm);
    errorRemove(errorFind('csc-blank'));
    errorRemove(errorFind('csc-invalid'));

    //check digits
    if((!regex.test(cscForm.value)) || (cscForm.value.length < 3)) {
        errorAdd(cscForm);
        errorAdd(errorFind('csc-invalid'));
        return;
    }

    //update target
    cscTarget.innerHTML = cscForm.value;
    return;
})

/*###############
    Confirm Button
#################*/


let confirmBtn = selectAll('.input-btn');
let displayPage = Array.from(selectAll('[data-display]'));

confirmBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        let inputFields = Array.from(selectAll('input'));

        if (inputFields.some(x => x.value == '') || inputFields.some(x => x.classList.contains('error'))) {
            return;
        } 
        
        displayPage.forEach(page => page.classList.toggle('hidden'));

    })
})