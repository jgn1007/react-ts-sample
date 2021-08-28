import React from 'react';

// Propsの型指定
type ButtonProps = ({
  clicks: number,
  onClick: (event: any) => void
});

const SubButton: React.FC<ButtonProps> = ({ clicks, onClick }) => {
  return (
    <div>
      <button onClick={onClick}>Child Button {clicks}</button>
    </div>
  );
}

export default SubButton;
