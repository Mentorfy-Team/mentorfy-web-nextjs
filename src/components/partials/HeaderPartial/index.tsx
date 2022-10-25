import React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { useProfile } from '~/hooks/useProfile';
import { AppBar, AvatarWrapper, MenuItem, PopoverBox } from './styles';
import Tipografia from '~/../public/images/tipografia.png';
import MenuAvatar from '~/../public/svgs/menu-avatar';
import Notification from '~/../public/svgs/notification';
import Search from '~/../public/svgs/search';
const HeaderPartial: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    data: { profile, logout },
  } = useProfile();

  const open = Boolean(anchorEl);
  const id = open ? 'popover' : undefined;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <AppBar id="Header" position="fixed">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4.0rem',
          }}
        >
          <Image
            style={{
              marginLeft: '2rem',
            }}
            height={30}
            alt="some important man mentoring smart people"
            src={Tipografia}
            quality={100}
            placeholder="blur"
          />
          {router.pathname.includes('mentorado') && (
            <Button
              sx={{
                color: '#fff',
              }}
              variant="text"
              href="http://localhost:3000/mentor/dashboard"
            >
              Visualizar como mentor
            </Button>
          )}
          {!router.pathname.includes('mentorado') && (
            <Button
              sx={{
                color: '#fff',
              }}
              variant="text"
              href="http://localhost:3000/mentorado/bem-vindo"
            >
              Visualizar como mentorado
            </Button>
          )}
        </div>
        <Search />
        <Notification />
        <AvatarWrapper onClick={handleClick}>
          <MenuAvatar fill={profile?.avatar ? 'transparent' : null} />
          <div
            style={{
              position: 'absolute',
              top: '6px',
              left: '8px',
              clipPath: 'circle(50% at 50% 50%)',
            }}
          >
            {profile?.avatar && (
              <Image
                src={profile?.avatar}
                alt="avatar"
                style={{
                  objectFit: 'cover',
                }}
                width={28}
                height={28}
              />
            )}
          </div>
        </AvatarWrapper>
      </AppBar>
      <Popover
        id={'postick' + id}
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
        transitionDuration={1}
      >
        <PopoverBox display="flex" flexDirection="column">
          <MenuItem variant="caption">Perfil</MenuItem>
          <MenuItem variant="caption">Certificados</MenuItem>
          <MenuItem variant="caption">FAQ</MenuItem>
          <Divider
            sx={{
              borderColor: '#6e6e6e55',
            }}
          />
          <MenuItem variant="caption" onClick={() => handleLogout()}>
            Sair
          </MenuItem>
        </PopoverBox>
      </Popover>
    </>
  );
};

export default HeaderPartial;
