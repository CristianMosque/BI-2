import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../common/Button';

const Card = styled.div`
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 250px;
`;

const PlanName = styled.h3`
  margin-top: 0;
`;

const PlanPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Feature = styled.li`
  margin-bottom: 5px;
`;

const PlanCard = ({ plan, onSelect, isSelected }) => {
  return (
    <Card>
      <PlanName>{plan.name}</PlanName>
      <PlanPrice>${plan.price}/month</PlanPrice>
      <FeatureList>
        {JSON.parse(plan.features).map((feature, index) => (
          <Feature key={index}>{feature}</Feature>
        ))}
      </FeatureList>
      <Button onClick={() => onSelect(plan)} disabled={isSelected}>
        {isSelected ? 'Selected' : 'Select Plan'}
      </Button>
    </Card>
  );
};

PlanCard.propTypes = {
  plan: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    features: PropTypes.string.isRequired
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired
};

export default PlanCard;