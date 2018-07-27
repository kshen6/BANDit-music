import React from 'react';
import { Button } from 'reactstrap';
import './Loader.css';

export default ({
  isLoading,
  text,
  loadingText,
  className = '',
  disabled = false,
  ...props
}) => (
  <Button className={`Loader ${className}`} disabled={disabled || isLoading}>
    {isLoading && <i className="fa fa-refresh spinning" aria-hidden="true" />}
    {!isLoading ? text : loadingText}
  </Button>
);
