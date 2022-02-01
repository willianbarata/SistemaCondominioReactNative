import React from 'react';
import style from 'styled-components/native';

export default {
    Container: style.SafeAreaView`
        flex: 1;
        justify-content: center;
        align-items: center;
    `,
    LoadingIcon: style.ActivityIndicator``
};