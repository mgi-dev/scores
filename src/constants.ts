import {Dimensions} from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const constants = {
    littleFont: 16,
    mediumFont: 22,
    bigFont: 35,
    veryBigFont: 35,
    windowWidth : Dimensions.get('window').width,
    windowHeight : Dimensions.get('window').height,
    rules: {
        DEFAULT: 'default',
        DUMBAL: 'dumbal',
    }
}


