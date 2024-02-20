// eslint-disable-next-line no-unused-vars
import React from 'react';
import Button from '@mui/material/Button';

const Test = () => {
  return (
    <div>
      <Button
        sx={{
          backgroundColor: {
            xs: 'red',
            md: 'blue',
            lg: 'green',
            xl: 'yellow',
          },
        }}
      >
        Hello World
      </Button>
    </div>
  );
};

export default Test;
