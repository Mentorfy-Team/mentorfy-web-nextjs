import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { MentorMenu } from '~/consts/routes/routes.consts';
import { userStore } from '~/stores';
import { AnimatedBox, Drawer, DrawerHeader } from './styles';
import MenuItens from './components/MenuItens';

type props = {
  children?: JSX.Element;
};

const MiniDrawer: React.FC<props> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [open, setOpen] = React.useState(isMobile ? false : true);
  const router = useRouter();
  const { isLoading, setLoading } = userStore();
  const [selectedRoute, setSelectedRoute] = React.useState<string>(
    router.pathname,
  );

  const pathsList = React.useMemo(() => {
    // reduce root and children paths
    return Object.values(MentorMenu).reduce((acc, route) => {
      if (route.children) {
        return [
          ...acc,
          ...route.children.map((child) => child.path),
          route.path,
        ];
      }
      return [...acc, route.path];
    }, []);
  }, []);

  const ActivePaths = React.useMemo(() => {
    return pathsList.filter((route) => {
      if (selectedRoute.split('/')?.length < 4) return route === selectedRoute;
      const twoFirsts = selectedRoute.split('/').slice(0, 3).join('/');
      return route.includes(twoFirsts);
    });
  }, [pathsList, selectedRoute]);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        minHeight: 'inherit',
      }}
    >
      <Drawer
        id="Drawer"
        disabled={isMobile}
        variant="permanent"
        open={!isMobile && open}
      >
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
        <Box p="1rem 0" height="100%">
          <MenuItens
            selectedRoute={[...ActivePaths, selectedRoute]}
            onSelectedRoute={async (route) => {
              const hasChildren = Object.values(MentorMenu).find(
                (item) => item.path === route,
              )?.children;
              if (ActivePaths.includes(route) || hasChildren) {
                setSelectedRoute((old) => old);

                if (!hasChildren) {
                  await router.prefetch(route);
                  await router.push(route);
                }
                return;
              }
              setSelectedRoute(route);
              await router.prefetch(route);
              await router.push(route);
            }}
            routes={Object.keys(MentorMenu)}
            routesData={MentorMenu}
          />
        </Box>
        {/* {Object.keys(MentorMenu).map((route, index) => (
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
              {!MentorMenu[route].children && MenuItem({ route })}
              {MentorMenu[route].children && (
                <ColapseMenu
                  id="ColapseMenu"
                  label="ColapseMenu"
                  model={MenuItem({ route, rootWithLink: false })}
                  key={MentorMenu[route].name}
                >
                  {MentorMenu[route].children}
                </ColapseMenu>
              )}
            </ListItem>
          ))} */}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 1,
          marginTop: '50px',
          overflow: 'auto',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <AnimatedBox
          loading={false}
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
