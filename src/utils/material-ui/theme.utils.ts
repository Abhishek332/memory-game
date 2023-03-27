import { createTheme } from '@mui/material/styles';
import { purple, lime, brown } from '@mui/material/colors';

export const theme: Theme = createTheme({
	palette: {
		primary: {
			main: purple['400'],
			contrastText: '#fff',
		},
		secondary: {
			main: lime['50'],
			contrastText: brown['800'],
		},
	},
});
