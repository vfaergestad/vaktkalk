class Shift {
  constructor(hours = 0, night = 0, weekend = 0, morning_evening = 0) {
    this.hours = hours;
    this.night = night;
    this.weekend = weekend;
    this.morning_evening = morning_evening;
  }
}

const N1 = new Shift(20, 16.3, 0, 2);
const N2 = new Shift(20, 16.3, 0, 2);
const N3 = new Shift(30, 24.45, 20, 1);
const H1 = new Shift(22.5, 0, 15, 0);
const H2 = new Shift(22.5, 3.5, 15, 0);
const AN = new Shift(37.5, 0, 0, 0);
const AK = new Shift(40, 10, 0, 15);

window.addEventListener("DOMContentLoaded", (event) => {
    // Get the form element
    const form = document.getElementById('vaktkalk-form');

    // Add an event listener to the form submit event
    form.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Check each input field and set its value to 0 if it's empty
    $('input[type="number"]').each(function() {
      if ($(this).val() === '') {
        $(this).val(0);
      }
    });

    // Get the input values
    const n1s = parseInt(document.getElementById('N1').value);
    const n2s = parseInt(document.getElementById('N2').value);
    const n3s = parseInt(document.getElementById('N3').value);
    const h1s = parseInt(document.getElementById('H1').value);
    const h2s = parseInt(document.getElementById('H2').value);
    const ans = parseInt(document.getElementById('AN').value);
    const aks = parseInt(document.getElementById('AK').value);
    const extra_hours = parseInt(document.getElementById('extra_hours').value);
    const hellig_hours = parseInt(document.getElementById('hellig_hours').value);
    const hourly_rate = parseInt(document.getElementById('hourly_rate').value);
    const tax_rate = parseInt(document.getElementById('tax_rate').value);

    if (hourly_rate == 0) {
      $('.ui.basic.modal')
        .modal('show')
      ;
    }

    // Calculate the total hours
    const total_hours = n1s * N1.hours + n2s * N2.hours + n3s * N3.hours + h1s * H1.hours + h2s * H2.hours + ans * AN.hours + aks * AK.hours + extra_hours * 1;

    // Calculate the total night hours
    const total_night = n1s * N1.night + n2s * N2.night + n3s * N3.night + h1s * H1.night + h2s * H2.night + ans * AN.night + aks * AK.night;

    // Calculate the total weekend hours
    const total_weekend = n1s * N1.weekend + n2s * N2.weekend + n3s * N3.weekend + h1s * H1.weekend + h2s * H2.weekend + ans * AN.weekend + aks * AK.weekend;

    // Calculate the total morning/evening hours
    const total_morning_evening = n1s * N1.morning_evening + n2s * N2.morning_evening + n3s * N3.morning_evening + h1s * H1.morning_evening + h2s * H2.morning_evening + ans * AN.morning_evening + aks * AK.morning_evening;

    // Calculate the total night pay
    const night_rate = hourly_rate * 0.45;
    const total_night_pay = total_night * night_rate;

    // Calculate the total weekend pay
    const weekend_rate = 65;
    const total_weekend_pay = total_weekend * weekend_rate;

    // Calculate the total morning/evening pay
    const morning_evening_rate = 25;
    const total_morning_evening_pay = total_morning_evening * morning_evening_rate;

    // Calculate the total hellig pay
    const hellig_rate = hourly_rate;
    const total_hellig_pay = hellig_hours * hellig_rate;

    // Calculate the total pay
    const total_pay = total_hours * hourly_rate + total_night_pay + total_weekend_pay + total_morning_evening_pay + total_hellig_pay;

    // Calculate the effective hourly rate
    const effective_pay = total_pay / total_hours;

    // Calculate the pay after tax
    const pay_after_tax = total_pay * (1 - tax_rate / 100);

    // Update the result elements with the calculated values
    document.getElementById('total_hours').innerHTML = total_hours;
    document.getElementById('effective_pay').innerHTML = effective_pay.toFixed(2);
    document.getElementById('total_pay').innerHTML = total_pay.toFixed(2);
    document.getElementById('pay_after_tax').innerHTML = pay_after_tax.toFixed(2);
    });
});