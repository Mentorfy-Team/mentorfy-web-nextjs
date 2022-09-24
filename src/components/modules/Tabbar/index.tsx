import { TabWrapper } from './styles';

type props = {
  witborder?: boolean;
  forpage?: boolean;
  children?: any;
  selected: number;
  onChange: (event: React.ChangeEvent<any>, newValue: number) => void;
};

const Tabbar: React.FC<props> = ({
  selected,
  children,
  onChange,
  witborder,
  forpage,
}) => {
  return (
    <TabWrapper
      forpage={forpage}
      witborder={witborder}
      value={selected}
      onChange={onChange}
    >
      {children}
    </TabWrapper>
  );
};

export default Tabbar;
