import { Platform } from 'react-native';

const theme = {
  colors: {
    bar: '#24292e',
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBarBackground: '#24292e',
    mainBackground: '#e1e4e8',
    barText: 'white',
    error: '#d73a4a',
    fieldColor: '#33BDFF'
  },

  fontSizes: {
    barText: 18,
    body: 14,
    subheading: 16
  },
  fonts: {
    //main: 'System',
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },

};

export default theme;