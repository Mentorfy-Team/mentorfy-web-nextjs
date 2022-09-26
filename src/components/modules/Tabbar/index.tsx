import { TabWrapper } from './styles';

type props = {
  withborder?: boolean;
  forpage?: boolean;
  children?: any;
  selected: number;
  onChange: (event: React.ChangeEvent<any>, newValue: number) => void;
};

const Tabbar: React.FC<props> = ({
  selected,
  children,
  onChange,
  withborder,
  forpage,
}) => {
  return (
    <TabWrapper
      forpage={forpage}
      withborder={withborder}
      value={selected}
      onChange={onChange}
    >
      {children}
    </TabWrapper>
  );
};

export default Tabbar;
