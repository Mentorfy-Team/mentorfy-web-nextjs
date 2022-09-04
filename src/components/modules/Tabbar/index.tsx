import { TabItem, TabWrapper } from './styles';

type props = {
  children?: any;
  selected: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const Tabbar: React.FC<props> = ({ selected, children, onChange }) => {
  return (<TabWrapper value={selected} onChange={onChange} >
    {children}
  </TabWrapper>);
};

export default Tabbar;
