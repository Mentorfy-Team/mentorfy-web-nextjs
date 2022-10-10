import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Tabbar from '../Tabbar';
import { TabItem } from '../Tabbar/styles';

type Props = {
  onChange?: (value: number) => void;
  tabs?: string[] | number[];
};

const Toolbar: React.FC<Props> = ({ onChange = () => {}, tabs = [] }) => {
  const [tabindex, setTabindex] = React.useState(0);
  const [hasmargintop, setHasMarginTop] = useState(false);
  const route = useRouter();

  useEffect(() => {
    onChange(tabindex);
  }, [onChange, tabindex]);

  useEffect(() => {
    if (route.pathname.includes('mentorado')) {
      setHasMarginTop(true);
    }
  }, [route]);

  return (
    <Tabbar
      forpage
      hasmargintop={hasmargintop}
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
