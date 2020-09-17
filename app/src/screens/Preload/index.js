import React, { useEffect } from 'react';
import { Container, LoadingIcon } from './styles';
import { useNavigation } from '@react-navigation/native';

import AjudaeLogo from '../../assets/ajudae.svg';

export default () => {

    const navigation = useNavigation();

    useEffect(()=>{
        const goToHome = async () => { 
            return new Promise(() => 
            setTimeout(
             () => { navigation.navigate('Home')},
             1000
                )
            );
        }

        goToHome();
    }, []);

    return (
        <Container>
            <AjudaeLogo width="100%" height="160" />
            <LoadingIcon size="large" color="#FF565E" />
        </Container>
    );
}