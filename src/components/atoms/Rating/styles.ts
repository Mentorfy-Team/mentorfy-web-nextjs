import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

type Props = {
    isWheelOLife?: boolean;
}
export const RatingBox = styled(Rating)<Props>`
    
    

        .MuiRating-decimal { 
            font-size: 2.1rem;
                &:hover { 
                    font-size: 2.1rem;
                }
                &:focus-within { 
                    font-size: 2.1rem;
                }
             
        }
    
`;
