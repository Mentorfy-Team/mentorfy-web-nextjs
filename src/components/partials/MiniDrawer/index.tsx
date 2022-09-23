import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { MentorMenu, MentoredMenu } from '~/consts/routes/routes.consts';
import { GetProfile } from '~/services/profile.service';
import { userStore } from '~/stores';
import { AnimatedBox, Drawer, DrawerHeader } from './styles';
import menu from '~/../public/images/menu.png';

type props = {
  children?: JSX.Element;
  supportHeader?: JSX.Element;
  header?: JSX.Element;
  profile?: UserClient.Profile;
};

const MiniDrawer: React.FC<props> = ({ children, supportHeader, profile }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:500px)');
  const [open, setOpen] = React.useState(isMobile ? false : true);
  const router = useRouter();
  const { isLoading, setLoading } = userStore();
  const [_profile, setProfile] = React.useState<UserClient.Profile>(profile);

  const getIcon = (component, path, subpaths = []) => {
    const props: any = {};

    if (IsActiveValidator(path, subpaths))
      props.fill = theme.palette.accent.main;

    return component(props);
  };

  const IsActiveValidator = (path, subpaths = []) => {
    if (router.pathname.includes(path)) return true;

    if (subpaths.find((subpath) => router.pathname.includes(subpath)))
      return true;

    return false;
  };

  const loadProfile = React.useCallback(async () => {
    const response = await GetProfile();
    setProfile(response.profile);
  }, []);

  React.useEffect(() => {
    if (!profile) loadProfile();
  }, [loadProfile, profile, router]);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        minHeight: 'inherit',
      }}
    >
      <Drawer id="Drawer" variant="permanent" open={open}>
        <DrawerHeader id="DrawerHeader" />
        {/* <UserField pl={1.5} display="flex">
          <Avatar
            src={_profile?.avatar}
            sx={{ backgroundColor: 'gray !important' }}
          />
          <Box pl={2.5}>
            <UserName variant="body2" noWrap>
              {AdjustName(_profile?.name || 'Bem-vindo')}
            </UserName>
            <Box display="flex">
              <Kind variant="caption">Mentor</Kind>
              <ProFree type={_profile?.plan}>
                {(_profile?.plan || 'Free').toUpperCase()}
              </ProFree>
            </Box>
          </Box>
        </UserField> */}
        <List>
          {Object.keys(MentorMenu).map((route, index) => (
            <ListItem
              key={MentorMenu[route].name}
              disablePadding
              sx={{
                display: 'block',
                backgroundColor: IsActiveValidator(MentorMenu[route].path)
                  ? 'rgba(0, 0, 0, 0.15)'
                  : 'transparent',
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 40,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  router.push(MentorMenu[route].path);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {getIcon(
                    MentorMenu[route].component,
                    MentorMenu[route].path,
                    MentorMenu[route].subpaths,
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={MentorMenu[route].name}
                  sx={{
                    opacity: open ? 1 : 0,
                    paddingTop: 0.5,
                    color: IsActiveValidator(
                      MentorMenu[route].path,
                      MentorMenu[route].subpaths,
                    )
                      ? theme.palette.accent.main
                      : theme.palette.text.primary,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 3,
          marginTop: supportHeader ? '114px' : '60px',
          overflow: 'auto',
        }}
      >
        <AnimatedBox
          loading={isLoading}
          sx={{
            height: '0vh',
          }}
        >
          {children}
          <Image
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            style={{
              position: 'absolute',
              top: '4rem',
              left: open ? '174px' : '38px',
              zIndex: 2000,
              cursor: 'pointer',
              transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
            alt="menu"
            src={menu}
            height={20}
          />
        </AnimatedBox>
      </Box>
    </Box>
  );
};

export default MiniDrawer;
