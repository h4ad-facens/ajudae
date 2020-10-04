import React from 'react';
import { Spacing } from './styles';

const AjudaeSpacing = ({
  marginTop = '0px',
  marginRight = '0px',
  marginLeft = '0px',
  marginBottom = '0px',
  paddingTop = '0px',
  paddingRight = '0px',
  paddingLeft = '0px',
  paddingBottom = '0px',
  children,
}) => {
  return (
    <Spacing
      marginTop={marginTop}
      marginRight={marginRight}
      marginLeft={marginLeft}
      marginBottom={marginBottom}
      paddingTop={paddingTop}
      paddingRight={paddingRight}
      paddingLeft={paddingLeft}
      paddingBottom={paddingBottom}>
      {children}
    </Spacing>
  );
};

export default AjudaeSpacing;
