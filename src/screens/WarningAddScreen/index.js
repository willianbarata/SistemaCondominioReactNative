import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import C from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [warnText, setWarnText ] = useState();

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Adicionar uma ocorrência',
            
        });
    }, [])


    const getWarnings = async () => {
        setList([]);
        setLoading(true);
        const result = await api.getWarnings();
        setLoading(false);
        if(result.error === ''){
            //se não exitir erros, listaremos
           setList(result.list);
        } else{
            alert(result.error);
        }
    }

    return(
        <C.Container>
               <C.Scroller>
                   <C.Title> Descreva a ocorrência</C.Title>
                   <C.Field 
                        placeholder="Ex. Vizinho com som alto"
                        value={warnText}
                        onChangeText={t=>setWarnText(t)}
                   />
                   <C.Title>Fotos relacionadas</C.Title>
                   <C.PhotoArea>
                        <C.PhotoScroll horizontal={true}>
                                <C.PhotoAddButton onPress={null}>
                                    <Icon name="camera" size={24} color="#000" />
                                </C.PhotoAddButton>
                        </C.PhotoScroll>

                   </C.PhotoArea>
                   <C.ButtonArea onPress={null}>
                       <C.ButtonText>Salvar</C.ButtonText>
                   </C.ButtonArea>
               </C.Scroller>
        </C.Container>
    ); 
}