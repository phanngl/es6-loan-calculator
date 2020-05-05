// listen to submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  e.preventDefault();
  // hide results
  document.getElementById('results').style.display = 'none';

  // show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
});

// calculate results
function calculateResults() {
  // ui vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value * 12);

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);

    // show results
    document.getElementById('results').style.display = 'block';
    // hide spinner
    document.getElementById('loading').style.display = 'none';
  } else {
    console.log('Please check your number');
    showError('Please check your numbers');
  }
}


// Show Error
function showError(error) {
  // hide results
  document.getElementById('results').style.display = 'none';
  // hide spinner
  document.getElementById('loading').style.display = 'none';
  // create a div
  const errorDiv = document.createElement('div');

  // add class
  errorDiv.className = 'alert alert-danger';

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));


  // get element
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}