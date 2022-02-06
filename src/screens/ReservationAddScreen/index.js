import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import C from './style';

import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const route = useRoute();
    const [loading, setLoading] = useState(true);

    //unsubscribe -> monitorar o focus, limpando histórico da tela add reserva
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', ()=>{
            navigation.setOptions({
                headerTitle: `Reservar ${route.params.data.Title}`
            });
        });
        return unsubscribe;
        getReservations();
    }, [navigation, route]);

    return (
        <C.Container>
            <C.Scroller contentContainerStyle={{paddingBottom: 40}}>
                <C.CoverImage source={{uri: route.params.data.cover}} resizeMode="cover" />
                {loading &&
                    <C.loadingIcon size="large" color="#8863E6" />
                }
                
            </C.Scroller>
        </C.Container>
    );
}