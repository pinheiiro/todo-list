import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        error: 'red.500',
        sucess: 'green.500'
    },
    styles: {
        global: {
            body: {
                bg: 'gray.300',
                color: 'grey.900',
                fontFamily: 'Poppins, sans-serif'
            }
        }
    }
});

export default theme;