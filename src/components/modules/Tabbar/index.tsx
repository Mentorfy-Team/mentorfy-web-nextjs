import { SxProps, Theme } from '@mui/material';
import { TabWrapper } from './styles';

type props = {
  withBorder?: boolean;
  forPage?: boolean;
  children?: any;
  selected: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
};

const Tabbar: React.FC<props> = ({
  selected,
  children,
  onChange,
  withBorder,
  forPage,
}) => {
  return (
    <TabWrapper
      forPage={forPage}
      withBorder={withBorder}
      value={selected}
      onChange={onChange}
    >
      {children}
    </TabWrapper>
  );
};

export default Tabbar;
