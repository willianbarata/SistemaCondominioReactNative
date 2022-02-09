import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import C from './style';
import CalendarPicker from 'react-native-calendar-picker';
import { useStateValue } from '../../contexts/StateContext';
import api from '../../services/api';


export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();
    const route = useRoute();
    const [loading, setLoading] = useState(false);

    const minDate = new Date();
    const maxDate = new Date(minDate);
    maxDate.setMonth(maxDate.getMonth() + 3);

    const handleDateChange = () => {

    }
     
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
                {!loading &&
                    <C.CalendarArea>
                        <CalendarPicker 
                            onDateChange={handleDateChange}
                            minDate={minDate}
                            maxDate={maxDate}
                            weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']}
                            months={['Janeiro', 'Fevereiro','Maço','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']}
                            previousTitle="Anterior"
                            nextTitle="Próximo"
                            selectedDayColor="#8863E6"
                            selectedDayColor="#FFFFFF"
                            todayBackgroundColor="transparent"
                            todayTextStyle="#000000"
                        />
                    </C.CalendarArea>
                
                }

            </C.Scroller>
        </C.Container>
    );
}