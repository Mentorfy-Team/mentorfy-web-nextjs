import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

export default function SearchInput({ sx }: any) {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: (theme) => theme.palette.primary.light,
        ...sx,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Procurar pelo nome"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon color="info" />
      </IconButton>
    </Paper>
  );
}
