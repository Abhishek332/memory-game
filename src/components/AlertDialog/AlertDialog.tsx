import React from 'react';
import {
	Box,
	Dialog,
	DialogContent,
	DialogContentText,
	Slide,
	Typography,
} from '@mui/material';
import { StyledDialogTitle } from './AlertDialog.styles';
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
	return (
		<Dialog
			open={isDialogOpen}
			TransitionComponent={AlertDialogSlide}
			keepMounted
			aria-describedby="alert-dialog-slide-description"
		>
			<StyledDialogTitle>
				{isGameEnd ? `🏁  ${title}  🏁` : title}
			</StyledDialogTitle>
			<DialogContent>
				{text && <DialogContentText align="center">{text}</DialogContentText>}
				{isGameEnd && (
					<Box
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
