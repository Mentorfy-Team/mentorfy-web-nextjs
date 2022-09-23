import { SxProps, Theme } from '@mui/material';
import { TabWrapper } from './styles';

type props = {
  withBorder?: boolean;
  children?: any;
  selected: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
};

const Tabbar: React.FC<props> = ({
  selected,
  children,
  onChange,
  withBorder,
}) => {
  return (
    <TabWrapper withBorder={withBorder} value={selected} onChange={onChange}>
      {children}
    </TabWrapper>
  );
};

export default Tabbar;
