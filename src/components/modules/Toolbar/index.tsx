import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Tabbar from '../Tabbar';
import { TabItem } from '../Tabbar/styles';

type Props = {
  onChange?: (value: number) => void;
  tabs?: string[] | number[];
};

const Toolbar: React.FC<Props> = ({ onChange = () => {}, tabs = [] }) => {
  const [tabindex, setTabindex] = React.useState(0);
  const hasmargintop = useRouter().pathname === '/mentorado/kanban';

  useEffect(() => {
    onChange(tabindex);
  }, [onChange, tabindex]);

  return (
    <Tabbar
      forpage
      hasmargintop={true}
      onChange={(_, value) => setTabindex(value)}
      selected={tabindex}
    >
      {tabs.map((tab, index) => (
        <TabItem
          style={{
            alignItems: 'center',
          }}
          key={index}
          value={index}
          label={tab}
        />
      ))}
    </Tabbar>
  );
};

export default Toolbar;
