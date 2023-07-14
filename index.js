document.addEventListener("DOMContentLoaded", () => {
  const inputBill = document.querySelector("#form-block-input-id");
  const percents = document.querySelectorAll(".form-block__percent");
  const customPercent = document.querySelector("#form-block__percent__custom-id");
  const inputNumPeople = document.querySelector("#form-block-input-id__num-people");
  const tipAmountSpan = document.querySelector('.tip-amount__counter');
  const totalAmountSpan= document.querySelector('.total-amount__counter');
  
  
  let billValue = 0;
  let customValue = 0;
  let peopleValue = 0;

  inputBill.addEventListener("change", (event) => {
    billValue = event.target.value;
  });

  customPercent.addEventListener("change", (event) => {
    customValue = event.target.value;
    
  });

  inputNumPeople.addEventListener("change", (event) => {
    peopleValue = event.target.value;
  });

  percents.forEach(button => {
    button.addEventListener('click', (event) => {
      const selectedPercent = event.target.value;

      percents.forEach(btn => {
        btn.classList.remove('form-block__percent--selected');
      });

      event.target.classList.add('form-block__percent--selected');

      let tipResult = getTipAmount(billValue, selectedPercent, peopleValue);
      tipAmountSpan.textContent = tipResult;

      let totalResult = getTotalAmount(billValue, tipResult, peopleValue);
      totalAmountSpan.textContent = totalResult;

    });

  });
  
  function getTipAmount(billValue, selectedPercent, peopleValue) {
    billValue = parseInt(billValue);
    selectedPercent = parseInt(selectedPercent);
    peopleValue = parseInt(peopleValue);

    let tips = billValue * selectedPercent / 100;
    let res = tips / peopleValue;
    return res;
  }

  function getTotalAmount(bill, tipResult, numberOfPeople) {
    let total = bill / numberOfPeople + tipResult;
    return total;
  }

  function clearAllFormInputs() {
    let formReset = document.getElementById('interactive-fields__form-block');
    let inputs = formReset.getElementsByTagName('form-block-input');
    for (let input of inputs)
      input.value = '';
  }
  
  let buttonReset = document.getElementById('right-cont__reset-id');
  buttonReset.addEventListener('click', clearAllFormInputs);
 
 });