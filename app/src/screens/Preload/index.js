import React, { useEffect, useContext } from 'react';
import { Container, LoadingIcon } from './styles';
import { useNavigation } from '@react-navigation/native';

import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';

import AjudaeLogo from '../../assets/ajudae.svg';

export default () => {
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);

  useEffect(() => {
    const goToHome = async () => {
      //AsyncStorage.removeItem('ajudae@token');

      const token = await AsyncStorage.getItem('ajudae@token');

      if (token) {
        let jsonMe = await Api.getMe();

        if (jsonMe?.name) {
          userDispatch({
            type: 'setName',
            payload: {
              name: jsonMe.name,
            },
          });
        }
      }

      setTimeout(() => {
        navigation.reset({
          routes: [{ name: 'MainTab' }],
        });
      }, 1000);
    };

    goToHome();
  }, [navigation, userDispatch]);

  return (
    <Container>
      <AjudaeLogo width="100%" height="160" />
      <LoadingIcon size="large" color="#FF565E" />
    </Container>
  );
};
