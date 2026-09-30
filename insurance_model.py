import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import joblib

# 1. Generate Synthetic Data
# In a real scenario, you would load data here, e.g., pd.read_csv('insurance.csv')
np.random.seed(42)
n_samples = 1000

# Features: age, bmi, smoker (0=no, 1=yes), children
age = np.random.randint(18, 65, n_samples)
bmi = np.random.uniform(15, 40, n_samples)
smoker = np.random.randint(0, 2, n_samples) 
children = np.random.randint(0, 4, n_samples)

# Simulate charges: Base charge + age factor + bmi factor + smoker factor (huge impact) + children factor + noise
charges = 2000 + (age * 250) + (bmi * 150) + (smoker * 20000) + (children * 500) + np.random.normal(0, 1500, n_samples)

data = pd.DataFrame({
    'age': age,
    'bmi': bmi,
    'smoker': smoker,
    'children': children,
    'charges': charges
})

print("First 5 rows of generated dataset:")
print(data.head())
print("-" * 30)

# 2. Prepare Data for Modeling
X = data[['age', 'bmi', 'smoker', 'children']]
y = data['charges']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Train Linear Regression Model
model = LinearRegression()
model.fit(X_train, y_train)

# 4. Evaluate Model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("Model Evaluation:")
print(f"Mean Squared Error: {mse:.2f}")
print(f"R-squared: {r2:.4f}")
print("-" * 30)

# 5. Make Predictions
# Example 1: 30 years old, BMI 25, non-smoker, 1 child
new_user_1 = pd.DataFrame({'age': [30], 'bmi': [25.0], 'smoker': [0], 'children': [1]})
predicted_charge_1 = model.predict(new_user_1)[0]
print(f"Predicted Cost for 30yo, BMI 25, non-smoker, 1 child: ${predicted_charge_1:.2f}")

# Example 2: Same user, but smoker
new_user_2 = pd.DataFrame({'age': [30], 'bmi': [25.0], 'smoker': [1], 'children': [1]})
predicted_charge_2 = model.predict(new_user_2)[0]
print(f"Predicted Cost for 30yo, BMI 25, SMOKER, 1 child: ${predicted_charge_2:.2f}")
print("-" * 30)

# 6. Save the Model
model_filename = "insurance_model.joblib"
joblib.dump(model, model_filename)
print(f"Model saved successfully to {model_filename}")
print("You can load it later using: loaded_model = joblib.load('insurance_model.joblib')")
