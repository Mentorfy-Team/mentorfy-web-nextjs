import * as React from 'react';
import { useMediaQuery } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { MentorMenu, MentoredMenu } from '~/consts/routes/routes.consts';
import { userStore } from '~/stores';
import AdjustName from './helper/AdjustName';
import { Drawer, Kind, ProFree, UserField, UserName } from './styles';

type props = {
  children?: JSX.Element;
  supportHeader?: JSX.Element;
  header?: JSX.Element;
  profile?: UserClient.Profile;
};

const MiniDrawer: React.FC<props> = ({ children }) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = React.useState(!desktop);
  const router = useRouter();
  const { profile: _profile } = userStore();
  const [profile, setProfile] = React.useState<UserClient.Profile>();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setProfile(_profile);
  }, [_profile]);

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

  return (
    <Box sx={{ display: 'flex', overflow: 'hidden', minHeight: 'inherit' }}>
      <Drawer id="Drawer" variant="permanent" open={open}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={open ? handleDrawerClose : handleDrawerOpen}
          edge="start"
          sx={{
            justifyContent: open ? 'right' : 'center',
            margin: '0px',
          }}
        >
          <Image
            alt="menu"
            width="18"
            height="18"
            src={open ? '/svgs/arrows-left.svg' : '/svgs/menu.svg'}
          />
        </IconButton>
        <UserField pl={1.5} display="flex">
          <Avatar sx={{ backgroundColor: 'orange !important' }}></Avatar>
          <Box pl={2.5}>
            <UserName variant="body2" noWrap>
              {profile?.name && AdjustName(profile?.name)}
            </UserName>
            <Box display="flex">
              <Kind variant="caption">Mentor</Kind>
              <ProFree>{profile?.plan?.toUpperCase()}</ProFree>
            </Box>
          </Box>
        </UserField>
        <List>
          {Object.keys(MentorMenu).map((route, index) => (
            <ListItem
              key={MentorMenu[route].name}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 70,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2,
                  cursor: 'pointer',
                }}
                onClick={() => router.push(MentorMenu[route].path)}
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
          overflow: 'auto',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Box
          sx={{
            height: '0vh',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MiniDrawer;
