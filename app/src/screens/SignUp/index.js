import React, { useState } from 'react';
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

import AjudaeInput from '../../components/AjudaeInput';

import ArrowIcon from '../../assets/arrow.svg';
import NameIcon from '../../assets/name.svg';
import ProfileIcon from '../../assets/profile.svg';
import LockIcon from '../../assets/lock.svg';

export default ({ navigation }) => {
  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleSignClick = async () => {
    if (nameField != '' && emailField != '' && passwordField != '') {
      let json = await Api.signUp(nameField, emailField, passwordField);
      console.log(json);
      if (json.id) {
        Alert.alert(
          'OBA!',
          'Conta criada com sucesso! Utilize esses dados para se logar.',
          [
            {
              text: 'Ok!',
              onPress: () => {
                navigation.reset({
                  routes: [{ name: 'SignIn' }],
                });
              },
            },
          ],
        );
      } else {
        Alert.alert('OOPS!', json.message, [{ text: 'Ok!' }]);
      }
    } else {
      Alert.alert('OOPS!', 'Preencha todos os campos', [{ text: 'Entendi!' }]);
    }
  };

  const [nameField, setNameField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  return (
    <Container>
      <HeaderArea>
        <BlueSquare />
        <WelcomeText>Registrar</WelcomeText>
        <WelcomeDescription>
          Por favor, preencha os campos abaixo:
        </WelcomeDescription>
      </HeaderArea>

      <InputArea>
        <AjudaeInput
          IconSvg={NameIcon}
          placeholder="Seu nome"
          value={nameField}
          onChangeText={(t) => setNameField(t)}
        />
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

        <SignMessageButton onPress={() => goTo('SignIn')}>
          <SignMessageButtonText>
            Já possui conta? Clique aqui para entrar.
          </SignMessageButtonText>
        </SignMessageButton>

        <CustomButton onPress={handleSignClick}>
          <CustomButtonText>Registrar</CustomButtonText>
          <CustomButtonArrow>
            <ArrowIcon width="20.83" fill={'#FFFFFF'} height="9" />
          </CustomButtonArrow>
        </CustomButton>
      </InputArea>
    </Container>
  );
};
