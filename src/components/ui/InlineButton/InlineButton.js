import React from 'react';
import './InlineButton.css';

export default function InlineButton(props) {
  return (
    <span className="alt-span" onClick={props.onClick}>
      {props.text}
    </span>
  );
}
