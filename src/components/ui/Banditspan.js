import React from 'react';
import '../../styles/ui/Banditspan/Banditspan.css';

export default function Banditspan(props) {
  return (
    <span className="banditspan" onClick={props.onClick}>
      {props.text}
    </span>
  );
}
