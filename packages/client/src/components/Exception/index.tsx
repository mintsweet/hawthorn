import React from 'react';

interface ExceptionProps {
  type: 403 | 404 | 500;
  title?: string;
};

export default React.memo((props: ExceptionProps) => {
  const { title, type } = props;

  return (
    <div>
      <div></div>
      <div>
        <h1>{title || type}</h1>
      </div>
    </div>
  );
});
