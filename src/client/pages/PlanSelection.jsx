import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanCard from '../components/plans/PlanCard';
import Button from '../components/common/Button';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const PlansContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PlanSelection = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

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

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    try {
      await axios.post('/api/plans/subscribe', { planId: selectedPlan.id });
      alert('Subscription successful!');
    } catch (error) {
      console.error('Error subscribing to plan:', error);
    }
  };

  return (
    <Container>
      <h2>Select a Plan</h2>
      <PlansContainer>
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSelect={handlePlanSelection}
            isSelected={selectedPlan && selectedPlan.id === plan.id}
          />
        ))}
      </PlansContainer>
      {selectedPlan && (
        <Button onClick={handleSubscribe}>
          Subscribe to {selectedPlan.name}
        </Button>
      )}
    </Container>
  );
};

export default PlanSelection;