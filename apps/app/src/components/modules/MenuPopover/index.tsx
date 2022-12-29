import React from 'react';
import Popover from '@mui/material/Popover';
import { MenuItem, PopoverBox } from './styles';

// import { Container } from './styles';

type Props = {
  itens: {
    label: string;
    onClick: (event) => void;
  }[];
  BtModel: JSX.Element;
};

const MenuPopover: React.FC<Props> = ({ itens, BtModel }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const open = Boolean(anchorEl);
  const id = open ? 'popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ButtonModel = React.cloneElement(BtModel, {
    onClick: handleClick,
  });

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {ButtonModel}
      <Popover
        id={'postickover' + id}
        open={open}
        className="Popover-menu"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transitionDuration={4}
      >
        <PopoverBox display="flex" flexDirection="column">
          {itens.map((item, index) => (
            <MenuItem
              key={index}
              onClick={(event) => {
                item.onClick(event);
                handleClose();
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </PopoverBox>
      </Popover>
    </div>
  );
};

export default MenuPopover;
