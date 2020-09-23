import React from 'react';
import styled from 'styled-components/native';

import OngIcon from '../assets/ongs.svg';
import CauseIcon from '../assets/causes.svg';
import ProfileIcon from '../assets/profile.svg';
import AsyncStorage from '@react-native-community/async-storage';
import { State } from 'react-native-gesture-handler';


const TabArea = styled.View`
    height: 50px;
    background-color: #FFFFFF;
    flex-direction: row;
    borderTopLeftRadius: 25px;
    borderTopRightRadius: 25px;
    elevation: 5;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
`;

const ItemText = styled.Text`
    font-size: 10px;
    margin-top: 3px;
`;

export default ({state, navigation}) => {
    const verifyProfile = async () => {
        const token = await AsyncStorage.getItem('ajudae@token');

        if(token){
            goTo('Profile')
        } else {
            goTo('SignIn')
        }
    }    
    
    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return(
            <TabArea>
                <TabItem onPress={() => goTo('Ongs')}>
                    <OngIcon width="20" height="20" fill={state.index===0? "#108EE9" : "#BBBBBB"}/>
                    <ItemText style={{color: state.index===0? "#108EE9" : "#BBBBBB"}}>ONGs</ItemText>
                </TabItem>
                <TabItem onPress={() => goTo('Causes')}>
                    <CauseIcon width="20" height="20" fill={state.index===1? "#108EE9" : "#BBBBBB"}/>
                    <ItemText style={{color: state.index===1? "#108EE9" : "#BBBBBB"}}>Causas</ItemText>
                </TabItem>
                <TabItem onPress={() => verifyProfile()}>
                    <ProfileIcon width="20" height="20" fill={state.index>=2? "#108EE9" : "#BBBBBB"}/>
                    <ItemText style={{color: state.index>=2? "#108EE9" : "#BBBBBB"}}>Perfil</ItemText>
                </TabItem>
            </TabArea>
    );
}