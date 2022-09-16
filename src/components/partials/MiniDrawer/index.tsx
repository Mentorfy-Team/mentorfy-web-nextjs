import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { MentorMenu, MentoredMenu } from '~/consts/routes/routes.consts';
import { userStore } from '~/stores';
import LoadingPartial from '../loading/loading.partial';
import AdjustName from './helper/AdjustName';
import {
  AnimatedBox,
  AppBar,
  Drawer,
  DrawerHeader,
  Kind,
  ProFree,
  UserField,
  UserName,
  WrapperSupportHeader,
} from './styles';

type props = {
  children?: JSX.Element;
  supportHeader?: JSX.Element;
  header?: JSX.Element;
  profile?: UserClient.Profile;
};

const MiniDrawer: React.FC<props> = ({
  children,
  header,
  supportHeader,
  profile,
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const isMobile = useMediaQuery('(max-width:500px)');
  const router = useRouter();
  const { isLoading, setLoading } = userStore();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
      <AppBar id="AppBar" position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: isMobile ? 2 : 5,
              marginLeft: open ? -9.3 : -1,
            }}
          >
            <Image
              alt="menu"
              width="18"
              height="18"
              src={open ? '/svgs/arrows-left.svg' : '/svgs/menu.svg'}
            />
          </IconButton>
          <AnimatedBox isLoading={isLoading}>{header}</AnimatedBox>
        </Toolbar>
        {supportHeader && (
          <WrapperSupportHeader open={open}>
            <AnimatedBox isLoading={isLoading}>{supportHeader}</AnimatedBox>
          </WrapperSupportHeader>
        )}
      </AppBar>
      <Drawer id="Drawer" variant="permanent" open={open}>
        <DrawerHeader id="DrawerHeader" />
        <UserField pl={1.5} display="flex">
          <Avatar sx={{ backgroundColor: 'orange !important' }}>{`${
            profile?.name[0]
          }${
            profile?.name.split(' ').length > 1 &&
            profile?.name.split(' ')[1][0]
          }`}</Avatar>
          <Box pl={2.5}>
            <UserName variant="body2" noWrap>
              {profile?.name && AdjustName(profile?.name)}
            </UserName>
            <Box display="flex">
              <Kind variant="caption">Mentor</Kind>
              <ProFree>{profile?.plan.toUpperCase()}</ProFree>
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
          isLoading={isLoading}
          sx={{
            height: '0vh',
          }}
        >
          {children}
        </AnimatedBox>
      </Box>
    </Box>
  );
};

export default MiniDrawer;
