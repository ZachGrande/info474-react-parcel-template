import React, { useState } from 'react';

export default function Toggle({ id, defaultChecked, onChange }) {
  const [checked, setChecked] = useState(!!defaultChecked);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (onChange) onChange(e);
  };

  return (
    <label htmlFor={id} style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <span style={{
        position: 'relative',
        display: 'inline-block',
        width: '50px',
        height: '26px',
        background: checked ? '#19ab27' : '#ccc',
        borderRadius: '13px',
        transition: 'background 0.2s',
      }}>
        <span style={{
          position: 'absolute',
          top: '3px',
          left: checked ? '27px' : '3px',
          width: '20px',
          height: '20px',
          background: '#fff',
          borderRadius: '50%',
          transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }} />
      </span>
    </label>
  );
}
