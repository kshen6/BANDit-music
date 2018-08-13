import React from 'react';
import '../../styles/ui/InlineButton/InlineButton.css';

export default function InlineButton(props) {
  return (
    <span className="alt-span" onClick={props.onClick}>
      {props.text}
    </span>
  );
}
