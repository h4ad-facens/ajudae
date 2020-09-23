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

import SignInput from '../../components/SignInput';

import ArrowIcon from '../../assets/arrow.svg';
import ProfileIcon from '../../assets/profile.svg';
import LockIcon from '../../assets/lock.svg';

export default ({navigation}) => {
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const { dispatch: userDispatch } = useContext(UserContext);
 
    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    const handleSignClick = async () => {
        if(emailField != '' && passwordField != ''){
            let jsonSign = await Api.signIn(emailField, passwordField);
            if(jsonSign.token){
                await AsyncStorage.setItem('ajudae@token', jsonSign.token);
                await AsyncStorage.setItem('ajudae@expiresat', String(jsonSign.expiresAt));

                let jsonMe = await Api.getMe();
                if(jsonMe.name)
                {
                    userDispatch({
                        type: 'setName',
                        payload:{
                            name: jsonMe.name
                        }
                    });

                    navigation.reset({
                        routes: [{name:'Profile'}]
                    });
                }
            } else {
                Alert.alert('OOPS!', jsonSign.message, [
                    {text: 'Ok!'}
                ]);
            }

        } else {
            Alert.alert('OOPS!', 'Preencha todos os campos', [
                {text: 'Entendi!'}
            ]);
        }
    }

    return(
        <Container>
            <HeaderArea>
                <BlueSquare />
                <WelcomeText>Bem-vindo</WelcomeText>
                <WelcomeDescription>Primeiro, entre no aplicativo para poder gerenciar suas ONGs.</WelcomeDescription>
            </HeaderArea>
            
            <InputArea>
                <SignInput 
                    IconSvg={ProfileIcon} 
                    placeholder="Seu e-mail"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />
                <SignInput 
                    IconSvg={LockIcon} 
                    placeholder="Sua senha"
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                />

                <SignMessageButton onPress={() => goTo('SignUp')}>
                    <SignMessageButtonText>Não possui conta? Clique aqui para se registrar.</SignMessageButtonText>
                </SignMessageButton>

                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Entrar</CustomButtonText>
                    <CustomButtonArrow>
                        <ArrowIcon width="20.83" fill={"#FFFFFF"} height="9"/>
                    </CustomButtonArrow>
                </CustomButton>
            </InputArea>            
        </Container>
    );
}