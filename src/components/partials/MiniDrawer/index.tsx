import * as React from 'react';
import { Avatar, Box, SvgIcon, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { routes } from '~/consts/routes/routes.consts';
import AdjustName from './helper/AdjustName';
import {
  AppBar,
  Drawer,
  DrawerHeader,
  Kind,
  ProFree,
  UserField,
  UserName,
  WrapperSupportHeader,
} from './styles';

const drawerWidth = 240;

type props = {
  children?: JSX.Element;
  supportHeader?: JSX.Element;
  header?: JSX.Element;
};

const MiniDrawer: React.FC<props> = ({ children, header, supportHeader }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:500px)');
  const router = useRouter();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getIcon = (component, path) => {
    const props: any = {};

    if (router.pathname.includes(path)) props.fill = theme.palette.accent.main;

    return component(props);
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
              marginRight: 5,
              marginLeft: -1,
            }}
          >
            <Image
              alt="menu"
              width="18"
              height="18"
              src={open ? '/svgs/arrows-left.svg' : '/svgs/menu.svg'}
            />
          </IconButton>
          {header}
        </Toolbar>
        {supportHeader && (
          <WrapperSupportHeader open={open}>
            {supportHeader}
          </WrapperSupportHeader>
        )}
      </AppBar>
      <Drawer id="Drawer" variant="permanent" open={open}>
        <DrawerHeader id="DrawerHeader" />
        <UserField pl={1.5} display="flex">
          <Avatar src="/images/avatar.png" />
          <Box pl={2.5}>
            <UserName variant="body2" noWrap>
              {AdjustName('Débora Fernandes Rodrigues Soares')}
            </UserName>
            <Box display="flex">
              <Kind variant="caption">Mentor</Kind>
              <ProFree>PRO</ProFree>
            </Box>
          </Box>
        </UserField>
        <List>
          {Object.keys(routes).map((route, index) => (
            <ListItem
              key={routes[route].name}
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
                onClick={() => router.push(routes[route].path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {getIcon(routes[route].component, routes[route].path)}
                </ListItemIcon>
                <ListItemText
                  primary={routes[route].name}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: router.pathname.includes(routes[route].path)
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
