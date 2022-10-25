const form = document.getElementById("form-container");
form.addEventListener('change', tipCalculator);

function tipCalculator(){
    let totalBill = document.getElementById("billTotal");
    let tip = document.getElementById("tip");
    let tipPercentage = document.getElementById("tipPercentage");
    let tipAmount = document.getElementById("tipAmount");
    let totalBillWithTip = document.getElementById("totalBillWithTip");

    tipPercentage.value = tip.value + "%";
    if (totalBill.value < 1 || isNaN(totalBill.value)){
        alert("Please enter valid number. Hint: No negative number or letters");
        tipAmount.value = 0;
        totalBillWithTip.value = 0;
    } else {
        document.getElementById("tipPercentage").value = tip.value + "%";
        tipAmount.value = (parseFloat(totalBill.value) * parseFloat(tip.value/100)).toFixed(2);
        totalBillWithTip.value = (parseFloat(totalBill.value) + parseFloat(tipAmount.value)).toFixed(2);
    }
}
