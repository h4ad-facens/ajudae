import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'http://192.168.100.2:3000';

export default {
    signIn: async (username, password) => {
        const req = await fetch(`${BASE_API}/auth/local`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        const json = await req.json();
        return json;
    },
    signUp: async (name, email, password) => {
        const req = await fetch(`${BASE_API}/users`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await req.json();
        return json;
    },
    getMe: async () => {
        const token = await AsyncStorage.getItem('ajudae@token');

        const req = await fetch(`${BASE_API}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const json = await req.json();
        return json;
    }
};