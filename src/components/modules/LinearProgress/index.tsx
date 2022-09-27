import Box from "@mui/material/Box";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from "@mui/material/Typography";

export default function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ minWidth: 35 }}>
        <Typography pr={2} variant="body2" color="caption.main">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <LinearProgress color='success' sx={{
          backgroundColor: 'white',
        }} variant="determinate" {...props} />
      </Box>
    </Box>
  );
}