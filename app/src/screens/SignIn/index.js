import React, { useState, useContext } from 'react';
import { Alert } from 'react-native';
import {
  Container,
  HeaderArea,
  BlueSquare,
  WelcomeText,
  WelcomeDescription,
  InputArea,
  SignMessageButton,
  SignMessageButtonText,
  CustomButton,
  CustomButtonText,
  CustomButtonArrow,
} from './styles';

import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../../contexts/UserContext';
import AjudaeInput from '../../components/AjudaeInput';
import ArrowIcon from '../../assets/arrow.svg';
import ProfileIcon from '../../assets/profile.svg';
import LockIcon from '../../assets/lock.svg';

export default ({ navigation }) => {
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const { dispatch: userDispatch } = useContext(UserContext);

  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };

  const presentMessage = (title, message) =>
    Alert.alert(title, message, [{ text: 'Entendi!' }]);

  const handleSignClick = async () => {
    if (!emailField)
      return presentMessage(
        'OOPS!',
        'É necessário preencher o campo do e-mail!',
      );

    if (!passwordField)
      return presentMessage(
        'OOPS!',
        'É necessário preencher o campo de senha!',
      );

    let jsonSign = await Api.signIn(emailField, passwordField);

    if (jsonSign === null)
      return presentMessage(
        'OOPS!',
        'Ocorreu um erro desconhecido, por favor, tente novamente!',
      );

    const { message, token, expiresAt } = jsonSign;

    if (message) return presentMessage('OOPS!', message);

    await AsyncStorage.setItem('ajudae@token', token);
    await AsyncStorage.setItem('ajudae@expiresat', String(expiresAt));

    let { message: errorOnMe, ...user } = await Api.getMe();

    if (errorOnMe) return presentMessage('OOPS!', errorOnMe);

    userDispatch({
      type: 'setUser',
      payload: {
        ...user,
      },
    });

    navigation.reset({
      routes: [{ name: 'Profile' }],
    });
  };

  return (
    <Container>
      <HeaderArea>
        <BlueSquare />
        <WelcomeText>Bem-vindo</WelcomeText>
        <WelcomeDescription>
          Primeiro, entre no aplicativo para poder gerenciar suas ONGs.
        </WelcomeDescription>
      </HeaderArea>

      <InputArea>
        <AjudaeInput
          IconSvg={ProfileIcon}
          placeholder="Seu e-mail"
          value={emailField}
          onChangeText={(t) => setEmailField(t)}
        />
        <AjudaeInput
          IconSvg={LockIcon}
          placeholder="Sua senha"
          value={passwordField}
          onChangeText={(t) => setPasswordField(t)}
          password={true}
        />

        <SignMessageButton onPress={() => goTo('SignUp')}>
          <SignMessageButtonText>
            Não possui conta? Clique aqui para se registrar.
          </SignMessageButtonText>
        </SignMessageButton>

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>Entrar</CustomButtonText>
          <CustomButtonArrow>
            <ArrowIcon width="20.83" fill={'#FFFFFF'} height="9" />
          </CustomButtonArrow>
        </CustomButton>
      </InputArea>
    </Container>
  );
};
