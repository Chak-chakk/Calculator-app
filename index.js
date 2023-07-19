document.addEventListener("DOMContentLoaded", () => {
  const buttonWrapper = document.querySelector(".form-block__button-wrapper");
  const inputBill = document.querySelector("#form-block-input-bill-id");
  const percents = document.querySelectorAll(".form-block__percent");
  const customPercent = document.querySelector("#form-block__percent__custom-id");
  const inputNumPeople = document.querySelector("#form-block-input-id__num-people");
  const tipAmountSpan = document.querySelector('.tip-amount__counter');
  const totalAmountSpan= document.querySelector('.total-amount__counter');
  const buttonReset = document.getElementById('right-cont__reset-id');
  const inputElements = document.querySelectorAll(".form-block-input");
  
  let billValue = 0;
  let customValue = 0;
  let peopleValue = 0;

  inputElements.forEach(input => {
    hideError(input);
  });

  inputNumPeople.addEventListener("blur", validateDataEntry);

  inputBill.addEventListener("change", (event) => {
    billValue = event.target.value;
  });

  customPercent.addEventListener("change", (event) => {
    customValue = event.target.value;
  });

  inputNumPeople.addEventListener("change", (event) => {
    peopleValue = event.target.value;
  });

  
  const getTipAmount = function (billValue, selectedPercent, peopleValue) {
    billValue = parseInt(billValue);
    selectedPercent = parseInt(selectedPercent);
    peopleValue = parseInt(peopleValue);

    let tips = billValue * selectedPercent / 100;
    let res = tips / peopleValue;
    return res;
  }

  const getTotalAmount = function (bill, tipResult, numberOfPeople) {
    let total = bill / numberOfPeople + tipResult;
    return total;
  }


  buttonWrapper.addEventListener('click', function (event) {
    const el = event.target;

    if (el.classList.contains('form-block__percent')) {
      const selectedClass = 'form-block__percent--selected';

      percents.forEach(btn => {
        btn.classList.remove(selectedClass);
      });

      el.classList.add(selectedClass);

      let selectedPercent = el.value;

      let tipResult = getTipAmount(billValue, selectedPercent, peopleValue);
      tipAmountSpan.textContent = tipResult;

      let totalResult = getTotalAmount(billValue, tipResult, peopleValue);
      totalAmountSpan.textContent = totalResult;
    }
  });

  customPercent.addEventListener("change", (event) => {
    const selectedPercent = event.target.value;
    const selectedClass = 'form-block__percent--selected';
    
    percents.forEach(btn => {
      btn.classList.toggle(selectedClass, btn.value === selectedPercent);
    });
    
    customPercent.value = '';

    const tipResult = getTipAmount(billValue, selectedPercent, peopleValue);
    tipAmountSpan.textContent = tipResult;
  
    const totalResult = getTotalAmount(billValue, tipResult, peopleValue);
    totalAmountSpan.textContent = totalResult;
  });

  buttonReset.addEventListener('click', () => {
    inputBill.value = '';
    customPercent.value = '';
    inputNumPeople.value = '';

    tipAmountSpan.textContent = '$0.00';
    totalAmountSpan.textContent = '$0.00';
  })

  function validateDataEntry(event) {
    const target = event.target;

    if (target.value.trim() === '') {
      showError('Cant be zero', target);
      target.classList.add('error');
    } else {
      hideError(target);
    }
  }

  function showError(errorMessage, target) {
    const parent = target.parentNode;

    parent.classList.add('form-block__input-wrapper--error');

    const errorBlock = parent.querySelector('.error-message');

    if (errorBlock) {
      errorBlock.textContent = errorMessage;
    }
  }

  function hideError(target) {
    const parent = target.parentNode;

    parent.classList.remove('form-block__input-wrapper--error');

    const errorBlock = parent.querySelector('.error-message');

    if (errorBlock) {
      errorBlock.textContent = '';
    }
  }

 });