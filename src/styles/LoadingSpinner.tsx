import { faSpinner } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'react-emotion';

const Div = styled.div({
  marginTop: '20px',
  height: '75px',
  textAlign: 'center',
  width: '100%',
});

export const LoadingSpinner = () => {

return (
    <Div>
      <FontAwesomeIcon icon={faSpinner} spin size={'lg'} />;
    </Div>
  );
};
