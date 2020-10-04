import React from 'react';
import { Text } from 'react-native';

import AjudaeBackButton from '../../components/AjudaeBackButton';
import { Container, Scroller } from './styles';

export default ({ navigation }) => {
  return (
    <Container>
      <Scroller>
        <AjudaeBackButton navigation={navigation} url="ProfileUser" />
        <Text>Adicionar uma ONG</Text>
      </Scroller>
    </Container>
  );
};
