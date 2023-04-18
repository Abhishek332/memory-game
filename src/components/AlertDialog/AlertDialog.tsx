import React from 'react';
import {
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Slide,
	Typography,
} from '@mui/material';
import { useStyles } from './AlertDialog.styles';
import { TransitionProps } from '@mui/material/transitions';

const AlertDialogSlide = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialog: React.FC<AlertDialogType> = ({
	title,
	text,
	isDialogOpen,
	isGameEnd,
}) => {
	const { classes } = useStyles();

	return (
		<Dialog
			data-testid={`AlertDialog is ${isDialogOpen ? 'open' : 'close'}`}
			open={isDialogOpen}
			TransitionComponent={AlertDialogSlide}
			keepMounted
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle className={classes.title}>
				{isGameEnd ? `🏁  ${title}  🏁` : title}
			</DialogTitle>
			<DialogContent>
				{text && <DialogContentText align="center">{text}</DialogContentText>}
				{isGameEnd && (
					<Box
						data-testid="game-restart-button"
						onClick={() => window.location.reload()}
						sx={{ color: 'blue', cursor: 'pointer' }}
					>
						<Typography variant="subtitle2" align="center">
							Click here to begin the new Game
						</Typography>
					</Box>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default AlertDialog;

interface AlertDialogType {
	title: string;
	text?: string;
	isDialogOpen: boolean;
	isGameEnd?: boolean;
}
