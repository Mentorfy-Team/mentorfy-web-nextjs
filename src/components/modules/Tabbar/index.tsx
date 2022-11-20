import { TabWrapper } from './styles';

type props = {
  withborder?: boolean;
  forpage?: boolean;
  hasmargintop?: boolean;
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
  hasmargintop,
}) => {
  return (
    <TabWrapper
      forpage={forpage ? `${forpage}` : undefined}
      withborder={withborder ? `${withborder}` : undefined}
      value={selected}
      onChange={onChange}
      hasmargintop={hasmargintop ? `${hasmargintop}` : undefined}
    >
      {children}
    </TabWrapper>
  );
};

export default Tabbar;
