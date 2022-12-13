import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, Wrapper } from './styles';

type Item = {
  label: string;
  icon?: JSX.Element;
  disabled?: boolean;
  onClick: (event) => void;
};

type Props = {
  itens: Item[];
  title: string;
  icon?: JSX.Element;
  disabled?: boolean;
  BtModel?: (item: Item) => JSX.Element;
};

export default function MenuDropdown({
  itens,
  icon,
  BtModel,
  title,
  disabled,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={disabled}
        style={{ display: 'flex', gap: '1rem' }}
      >
        {icon}
        {title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          style: {
            paddingTop: 0,
            paddingBottom: 0,
          },
        }}
      >
        {!BtModel &&
          itens.map((item, index) => (
            <MenuItem
              key={index}
              disabled={item.disabled}
              onClick={(event) => {
                item.onClick(event);
                handleClose();
              }}
              style={{
                display: 'flex',
                gap: '1rem',
                width: '100%',
                fontSize: '0.8rem',
                backgroundColor: item.disabled ? '#000' : '#2c2c2c',
              }}
            >
              {item.icon}
              {item.label}
            </MenuItem>
          ))}
        {BtModel && itens.map((item) => BtModel(item))}
      </Menu>
    </Wrapper>
  );
}
