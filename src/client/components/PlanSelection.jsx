import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function PlanSelection() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/api/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handlePlanSelection = async () => {
    if (!selectedPlan) return;
    try {
      await axios.post('/api/plans/subscribe', { planId: selectedPlan.id });
      alert('Subscription successful!');
    } catch (error) {
      console.error('Error subscribing to plan:', error);
    }
  };

  return (
    <div>
      <h2>Select a Plan</h2>
      {plans.map((plan) => (
        <div key={plan.id}>
          <h3>{plan.name}</h3>
          <p>Price: ${plan.price}/month</p>
          <ul>
            {JSON.parse(plan.features).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <button onClick={() => setSelectedPlan(plan)}>Select</button>
        </div>
      ))}
      {selectedPlan && (
        <button onClick={handlePlanSelection}>Subscribe to {selectedPlan.name}</button>
      )}
    </div>
  );
}

export default PlanSelection;