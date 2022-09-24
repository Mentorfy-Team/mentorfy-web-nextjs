import React, { useEffect } from 'react';
import Tabbar from '../Tabbar';
import { TabItem } from '../Tabbar/styles';

type Props = {
  onChange?: (value: number) => void;
  tabs?: string[] | number[];
};

const Toolbar: React.FC<Props> = ({ onChange = () => {}, tabs = [] }) => {
  const [tabindex, setTabindex] = React.useState(0);
  useEffect(() => {
    onChange(tabindex);
  }, [onChange, tabindex]);

  return (
    <Tabbar
      forPage
      onChange={(_, value) => setTabindex(value)}
      selected={tabindex}
    >
      {tabs.map((tab, index) => (
        <TabItem key={index} value={index} label={tab} />
      ))}
    </Tabbar>
  );
};

export default Toolbar;
