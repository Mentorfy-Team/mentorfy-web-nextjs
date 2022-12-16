import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

type MenuTree = {
  id: string;
  label: string;
  model: JSX.Element;
  children?: MenuTree[];
};

export const ColapseMenu = (menu: MenuTree) => {
  return (
    <TreeView
      aria-label={menu.label}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {
        <TreeItem key={menu.id} nodeId={menu.id} label={menu.label}>
          {menu.children.map((child) => (
            <TreeItem key={child.id} nodeId={child.id} label={child.label} />
          ))}
        </TreeItem>
      }
    </TreeView>
  );
};

export default ColapseMenu;
