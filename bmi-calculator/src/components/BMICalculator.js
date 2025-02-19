import React, { useState } from "react";
import { Container, Title, Input, Button, Result } from "../styles";
import BMIChart from "./BMIChart";

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [bmi, setBMI] = useState(null);
  const [status, setStatus] = useState('');

  function calculateBMI() {
    if (weight > 0 && feet > 0) {
      let heightInMeters = ((parseInt(feet) * 12) + parseInt(inches)) * 0.0254;
      let bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBMI(bmiValue);

      if (bmiValue < 18.5) setStatus("Underweight");
      else if (bmiValue >= 18.5 && bmiValue < 24.9) setStatus("Normal Weight");
      else if (bmiValue >= 25 && bmiValue < 29.9) setStatus("Overweight");
      else setStatus("Obese");
    } else {
      alert("Please enter valid values");
    }
  }

  return (
    <Container>
      <Title>BMI Calculator</Title>
      <Input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <Input type="number" placeholder="Height (feet)" value={feet} onChange={(e) => setFeet(e.target.value)} />
      <Input type="number" placeholder="Height (inches)" value={inches} onChange={(e) => setInches(e.target.value)} />
      <Button onClick={calculateBMI}>Calculate BMI</Button>

      {bmi && (
        <Result>
          <p>Your BMI: <strong>{bmi}</strong></p>
          <p>Status: <strong>{status}</strong></p>
          <BMIChart bmi={bmi} />
        </Result>
      )}
    </Container>
  );
}

export default BMICalculator;
