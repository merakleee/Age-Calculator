document.addEventListener("DOMContentLoaded",function() {
    const DateTime = luxon.DateTime;
    const birthdateInput = document.getElementById("birthdate");
    const form = document.getElementById("ageForm");
    const resultDiv = document.getElementById("result");

    function createDatePicker(){
        let picker = document.createElement("input");
        picker.type = "date";
        picker.style.width = "100%";
        picker.style.padding = "8px";
        picker.style.marginTop = "10px";
        picker.style.border = "1px solid #ccc";
        picker.style.borderRadius ="5px";

        picker.addEventListener("change",function() {
            birthdateInput.value = this.value;
        });

        document.getElementById("datepicker").appendChild(picker);
    }

    createDatePicker();

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const birthdateValue = birthdateInput.value;

        if (!birthdateValue){
            resultDiv.innerHTML = "<p style'color: red;'>Please enter a valid birthdate.</p>"
            return;
        }

        const birthDate = DateTime.fromISO(birthdateValue);
        const today = DateTime.now();

        if (!birthDate.isValid || birthDate > today){
            resultDiv.innerHTML = "<p style = 'color: red;'>Invalid date. Please enter a past date.</p>";
            return;
        }

        let years = today.year - birthDate.year;
        let months = today.month - birthDate.month;
        let days = today.day - birthDate.day;

        if (days < 0){
            months--;
            days += birthDate.daysInMonth;
        }
        if (months < 0){
            years--;
            months += 12;
        }
        resultDiv.innerHTML = `<p>You are <strong>${years}</strong> years, <strong>${months}</strong> months, and <strong>${days}</strong> days old.</p>`;


    });
});