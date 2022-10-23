import React, { useEffect, useState } from 'react';
import { ChevronRightSharp } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Tabbar from '../Tabbar';
import { TabItem } from '../Tabbar/styles';

type Props = {
  onChange?: (value: number) => void;
  tabs?: string[] | number[];
  breadcrumbs?: string[];
};

const Toolbar: React.FC<Props> = ({
  onChange = () => {},
  tabs = [],
  breadcrumbs = [],
}) => {
  const [tabindex, setTabindex] = React.useState(0);
  const [hasmargintop, setHasMarginTop] = useState(false);
  const route = useRouter();
  const theme = useTheme();

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
      {tabs.length > 0 &&
        tabs.map((tab, index) => (
          <TabItem
            style={{
              alignItems: 'center',
            }}
            key={index}
            value={index}
            label={tab}
          />
        ))}
      {tabs.length === 0 &&
        breadcrumbs.length > 0 &&
        breadcrumbs.map((tab, index) => (
          <>
            <TabItem
              style={{
                alignItems: 'center',
                cursor: index === 0 ? 'pointer' : 'default',
              }}
              onClick={() => {
                if (index === 0) {
                  route.push('/mentorado/bem-vindo');
                }
              }}
              key={index}
              value={index}
              label={tab}
            />
            {index === 0 && breadcrumbs.length > 1 && (
              <ChevronRightSharp
                sx={{
                  alignSelf: 'center',
                  margin: '0 1rem',
                }}
                fontSize="small"
              />
            )}
          </>
        ))}
    </Tabbar>
  );
};

export default Toolbar;
