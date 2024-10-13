import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primaryColor};
  }
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.errorColor};
  font-size: 14px;
  margin-top: 5px;
`;

const Input = ({ type, name, value, onChange, placeholder, error }) => {
  return (
    <div>
      <StyledInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string
};

export default Input;