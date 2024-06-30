import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
//import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import { CircularProgress } from '@mui/material';

// Create a styled wrapper to position the CircularProgress over the Button
// const ButtonWrapper = styled('div')({
//   position: 'relative',
//   display: 'inline-block',
// });

const StyledButton = styled(Button)({
  // Any custom styles for the button can go here
});
/* 
const ProgressWrapper = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
 */
interface LoadButtonProps extends ButtonProps {
  loading?: boolean;
  loadingIndicator?:React.ReactNode|string|number|null
}

const LoadButton: React.FC<LoadButtonProps> = ({ loading=false, loadingIndicator=<CircularProgress sx={{color:'white'}}/>,children, ...props }) => {
  return (
    // <ButtonWrapper>
      <StyledButton {...props} >
        {(loading)? 
            loadingIndicator:
            children
        }
      </StyledButton>

    // </ButtonWrapper>
  );
};

export default LoadButton;
