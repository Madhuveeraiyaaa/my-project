// DOM Elements
const ageInput = document.getElementById('age');
const ageValue = document.getElementById('ageValue');

const bmiInput = document.getElementById('bmi');
const bmiValue = document.getElementById('bmiValue');

const childrenInput = document.getElementById('children');
const childrenValue = document.getElementById('childrenValue');

const smokerInput = document.getElementById('smoker');
const resultAmount = document.getElementById('resultAmount');
const calculationDetails = document.getElementById('calculationDetails');

// Linear Regression Weights (from the original python script)
const BASE_CHARGE = 2000;
const AGE_WEIGHT = 250;
const BMI_WEIGHT = 150;
const SMOKER_WEIGHT = 20000;
const CHILDREN_WEIGHT = 500;

function formatMoney(amount) {
    return amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function calculateInsurance() {
    const age = parseInt(ageInput.value);
    const bmi = parseFloat(bmiInput.value);
    const children = parseInt(childrenInput.value);
    const isSmoker = smokerInput.checked ? 1 : 0;

    // The Linear Regression Formula
    const totalCharge = BASE_CHARGE + 
                        (age * AGE_WEIGHT) + 
                        (bmi * BMI_WEIGHT) + 
                        (isSmoker * SMOKER_WEIGHT) + 
                        (children * CHILDREN_WEIGHT);

    // Update UI Values
    ageValue.textContent = age;
    bmiValue.textContent = bmi.toFixed(1);
    childrenValue.textContent = children;

    // Animate Number Change
    const currentVal = parseFloat(resultAmount.textContent.replace(/,/g, '')) || 0;
    animateValue(resultAmount, currentVal, totalCharge, 500);

    // Update Details
    calculationDetails.innerHTML = `
        Base: $2,000<br>
        Age Factor: $${formatMoney(age * AGE_WEIGHT)}<br>
        BMI Factor: $${formatMoney(bmi * BMI_WEIGHT)}<br>
        Smoker Factor: $${formatMoney(isSmoker * SMOKER_WEIGHT)}<br>
        Children Factor: $${formatMoney(children * CHILDREN_WEIGHT)}
    `;
}

// Helper to animate numbers
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const current = start + (end - start) * easeOutQuart;
        obj.innerHTML = formatMoney(current);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Event Listeners
ageInput.addEventListener('input', calculateInsurance);
bmiInput.addEventListener('input', calculateInsurance);
childrenInput.addEventListener('input', calculateInsurance);
smokerInput.addEventListener('change', calculateInsurance);

// Initial Calculation
calculateInsurance();
