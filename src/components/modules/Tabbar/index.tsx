import { TabItem, TabWrapper } from './styles';

type props = {
  children?: JSX.Element;
}

const Tabbar: React.FC<props> = () => {
  return (<TabWrapper value={0} >
    <TabItem label="Desempenho" />
    <TabItem label="Notificações" />
  </TabWrapper>);
};

export default Tabbar;
