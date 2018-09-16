import React from 'react';
import './Banditspan.css';

export default function Banditspan(props) {
  return (
    <span className="banditspan" onClick={props.onClick}>
      {props.text}
    </span>
  );
}
