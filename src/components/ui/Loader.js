import React from 'react';
import { Button } from 'reactstrap';
import '../../styles/ui/Loader/Loader.css';

export default ({
  isLoading,
  text,
  loadingText,
  className = '',
  disabled = false,
  ...props
}) => (
  <Button
    className={`Loader ${className}`}
    id="bandit-loader"
    disabled={disabled || isLoading}
  >
    {isLoading && <i className="fa fa-refresh spinning" aria-hidden="true" />}
    {isLoading ? loadingText : text}
  </Button>
);
