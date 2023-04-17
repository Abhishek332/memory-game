import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

export const theme = createTheme({
	palette: {
		primary: {
			main: purple['400'],
			contrastText: '#fff',
		},
	},
});
