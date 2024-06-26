document.addEventListener('DOMContentLoaded', () => {
    var age = document.getElementById("age");
    var height = document.getElementById("height");
    var weight = document.getElementById("weight");
    var male = document.getElementById("m");
    var female = document.getElementById("f");
    var resultArea = document.querySelector(".comment");

    var modal = document.getElementById("myModal");
    var modalText = document.getElementById("modalText");
    var span = document.getElementsByClassName("close")[0];

    function calculate() {
        if (age.value === '' || height.value === '' || weight.value === '' || (!male.checked && !female.checked)) {
            showModal('ALL fields are required!');
        } else if (!isPositiveNumber(height.value) || !isPositiveNumber(weight.value)) {
            showModal('Please enter valid positive values for height and weight!');
        } else {
            countBmi();
        }
    }

    function isPositiveNumber(value) {
        return /^\d*\.?\d+$/.test(value) && parseFloat(value) > 0;
    }

    function countBmi() {
        var p = [age.value, height.value, weight.value];
        if (male.checked) {
            p.push("male");
        } else if (female.checked) {
            p.push("female");
        }

        var bmi = Number(p[2]) / (Number(p[1]) / 100 * Number(p[1]) / 100);
        var result = '';
        if (bmi < 18.5) {
            result = 'Underweight';
        } else if (18.5 <= bmi && bmi < 25) {
            result = 'Healthy';
        } else if (25 <= bmi && bmi < 30) {
            result = 'Overweight';
        } else if (30 <= bmi && bmi < 35) {
            result = 'Obese (Class 1)';
        } else if (35 <= bmi && bmi < 40) {
            result = 'Obese (Class 2)';
        } else if (bmi >= 40) {
            result = 'Obese (Class 3)';
        }

        resultArea.style.display = "block";
        document.querySelector(".comment").innerHTML = `You are <span id="comment">${result}</span>`;
        document.querySelector("#result").innerHTML = bmi.toFixed(2);
    }

    function showModal(message) {
        modal.style.display = "block";
        modalText.innerHTML = message;
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    document.getElementById("submit").addEventListener("click", calculate);
});
