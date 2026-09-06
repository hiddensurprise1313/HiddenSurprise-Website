import React from 'react';
import './StarBorder.css';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = '#F8DC6C',
  speed = '4s',
  thickness = 1.5,
  backgroundColor = '#000000',
  textColor = '#F8DC6C',
  borderColor = 'rgba(248, 220, 108, 0.45)',
  innerStyle = {},
  children,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`.trim()}
      style={{
        padding: `${thickness}px`,
        ...rest.style
      }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: speed
        }}
      />
      <div
        className="inner-content"
        style={{
          background: backgroundColor,
          color: textColor,
          borderColor,
          ...innerStyle
        }}
      >
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
