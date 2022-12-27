import React, { useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useProfile } from '~/hooks/useProfile';
import { AppBar, AvatarWrapper, MenuItem, PopoverBox } from './styles';
import Tipografia from '~/../public/images/logo-montanha.png';
import MenuAvatar from '~/../public/svgs/menu-avatar';
import Notification from '~/../public/svgs/notification';

import Link from 'next/link';

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

  const handleGoToProfile = () => {
    router.push(process.env.NEXT_PUBLIC_BASE_URL + 'meu-perfil');
  };

  useEffect(() => {
    if (router.pathname.includes('mentorado'))
      router.prefetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/mentorado/bem-vindo`,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              marginLeft: '3.2rem',
            }}
            height={40}
            alt="some important man mentoring smart people"
            src={Tipografia}
            quality={85}
          />
          {router.pathname.includes('mentorado') && (
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/mentor/dashboard`}>
              Visualizar como mentor
            </Link>
          )}
          {!router.pathname.includes('mentorado') && (
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/mentorado/bem-vindo`}
            >
              Visualizar como mentorado
            </Link>
          )}
        </div>
        {/* <Search /> */}
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
          <MenuItem variant="caption" onClick={() => handleGoToProfile()}>
            Perfil
          </MenuItem>
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
