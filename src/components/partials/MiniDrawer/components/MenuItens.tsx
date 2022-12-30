import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
  count?: string;
  hasChildren?: boolean;
};

const StyledTreeItemRoot = styled(TreeItem)<{ hasChildren }>(
  ({ theme, hasChildren }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
      color: 'white',
      paddingRight: theme.spacing(1),
      heigth: '100px',
      flexDirection: 'row-reverse',
      '&.Mui-expanded': {},
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
        color: 'var(--tree-view-color)',
        '*': {
          fill: !hasChildren && theme.palette.accent.main,
        },
      },
      [`& .${treeItemClasses.label}`]: {
        fontWeight: 'inherit',
        color: 'inherit',
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 0,
      [`& .${treeItemClasses.content}`]: {
        paddingLeft: theme.spacing(2),
      },
    },
  }),
);

function StyledTreeItem(props: StyledTreeItemProps) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    count,
    hasChildren,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      hasChildren={hasChildren}
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 0.5,
            pr: 0,
            gap: 2,
            height: '45px',
            width: '200px',
          }}
        >
          {LabelIcon ? (
            <LabelIcon width={24} height={24} />
          ) : (
            <Box sx={{ mr: 1 }} />
          )}
          <Typography
            variant="body2"
            sx={{ fontWeight: 'inherit', flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}

export default function MenuItens({
  routes,
  routesData,
  selectedRoute,
  onSelectedRoute,
  blockedUser,
  freeRoutes,
}) {
  const theme = useTheme();
  const router = useRouter();
  const LoadSubMenu = React.useCallback(
    (route) => {
      return routesData[route].children?.map(
        ({
          name,
          component,
          count = '',
          bgColor,
          color,
          path,
          inDevelopment,
        }) => {
          const disable =
            inDevelopment || (blockedUser && !freeRoutes.includes(path));
          return (
            <StyledTreeItem
              key={name}
              nodeId={path + ''}
              labelText={name}
              labelIcon={component}
              labelInfo={count}
              bgColor={bgColor || '#00000044'}
              color={color || theme.palette.accent.main}
              count={count}
              onClick={() => {
                onSelectedRoute(path);
              }}
              hasChildren={false}
              disabled={disable}
              sx={{
                pointerEvents: disable ? 'none' : 'auto',
              }}
            />
          );
        },
      );
    },
    [
      blockedUser,
      freeRoutes,
      onSelectedRoute,
      routesData,
      theme.palette.accent.main,
    ],
  );

  return (
    <TreeView
      selected={selectedRoute}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{
        flexGrow: 1,
        maxWidth: 400,
      }}
      multiSelect
      defaultExpanded={selectedRoute}
    >
      {routes.map((route) => {
        const {
          children,
          path,
          name,
          component,
          count,
          inDevelopment,
          bgColor,
          color,
        } = routesData[route];
        const hasChildren = children;
        const disabled =
          inDevelopment || (blockedUser && !freeRoutes.includes(path));
        return (
          <StyledTreeItem
            key={name}
            nodeId={path}
            hasChildren={hasChildren}
            labelText={name}
            labelIcon={component}
            count={count}
            bgColor={!hasChildren ? bgColor || '#00000044' : 'transparent'}
            color={!hasChildren ? color || theme.palette.accent.main : 'white'}
            collapseIcon={<ArrowDropDownIcon />}
            onClick={() => {
              onSelectedRoute(path);
            }}
            disabled={disabled}
            sx={{
              pointerEvents: disabled ? 'none' : 'auto',
            }}
          >
            {LoadSubMenu(route)}
          </StyledTreeItem>
        );
      })}
    </TreeView>
  );
}
