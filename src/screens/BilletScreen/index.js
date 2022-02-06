import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import C from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';

import DocItem from '../../components/DocItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);

    //State da Lista com avisos que serão exibidos
    const [docList, setDocList] = useState([]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Boletos'
        });
        getBillets(); 
    }, [])


    const getBillets = async () => {
        setDocList([]);
        setLoading(true);
        const result = await api.getBillets();
        setLoading(false);
        if(result.error === ''){
            //se não exitir erros, listaremos
           setDocList(result.list);
        } else{
            alert(result.error);
        }
    }

    return(
        <C.Container>
                {!loading && docList.length === 0 &&
                    <C.NoListArea>
                        <C.NoListText>Não há Boletos.</C.NoListText>
                    </C.NoListArea>
                }
                <C.List 
                    data={docList}
                    onRefresh={getBillets}
                    refreshing={loading}
                    renderItem={({item}) => <DocItem data={item} />}
                    keyExtractor={(item) => item.id.toString()}
                />
        </C.Container>
    );
}