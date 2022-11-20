import { useCallback, useState } from 'react';

import FindInPage from '@mui/icons-material/FindInPage';
import RemoveIcon from '@mui/icons-material/Block';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import SvgIcon from '@mui/material/SvgIcon';
import DotsSvg from '~/../public/svgs/dots';
import {
  MarginPopopver,
  OptionsButton,
  PopoverBox,
} from '~/layouts/mentor/area-de-membros/components/MembersAreaTable/styles';

import { RemoveButton, SeeMoreButton } from './style';
import Box from '@mui/material/Box';

const RowActions = ({ id, onSeeMore, onRemove }) => {
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, row: { id: string }) => {
      setAnchorEl(event.currentTarget);
      setSelectedRow(row);
    },
    [],
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div key={`settings-${id}`} style={{ padding: '0px' }}>
      <MarginPopopver
        sx={{ width: 35, height: 32 }}
        onClick={(e) => handleClick(e as any, { id })}
      >
        <OptionsButton>
          <SvgIcon color="info" component={DotsSvg} />
        </OptionsButton>
      </MarginPopopver>
      <Popover
        id={'popover-' + selectedRow.id}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transitionDuration={1}
      >
        <PopoverBox display="flex" flexDirection="column">
          <Box
            sx={{
              backgroundColor: 'primary.dark',
            }}
            p={0.5}
            pl={1}
            pr={1}
            onClick={() => onSeeMore(id)}
          >
            <SeeMoreButton>
              <SvgIcon
                sx={{ marginRight: '0.5rem', width: '100%' }}
                component={FindInPage}
              />
              <Box width="100%">Visualizar Perfil</Box>
            </SeeMoreButton>
          </Box>
          <Divider />
          <Box
            sx={{
              backgroundColor: 'primary.dark',
            }}
            p={0.5}
            pl={1}
            pr={1}
            onClick={() => onRemove(id)}
          >
            <RemoveButton>
              <SvgIcon
                sx={{ marginRight: '0.5rem', width: '100%' }}
                component={RemoveIcon}
              />
              <Box width="100%">Remover Cliente</Box>
            </RemoveButton>
          </Box>
        </PopoverBox>
      </Popover>
    </div>
  );
};

export default RowActions;
