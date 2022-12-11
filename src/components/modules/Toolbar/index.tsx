import React, { useEffect, useState } from 'react';
import { ChevronRightSharp, WhatsApp } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Tabbar from '../Tabbar';
import { TabItem } from '../Tabbar/styles';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { LinkWrapper } from './styles';

type Props = {
  onChange?: (value: number) => void;
  tabs?: string[] | number[];
  breadcrumbs?: string[];
  initialTab?: number;
  contact?: number | string;
};

const Toolbar: React.FC<Props> = ({
  onChange = () => {},
  tabs = [],
  breadcrumbs = [],
  initialTab = 0,
  contact = null,
}) => {
  const [tabindex, setTabindex] = React.useState(initialTab);
  const [hasmargintop, setHasMarginTop] = useState<boolean | null>(null);
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
    <div
      style={{
        position: 'relative',
      }}
    >
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
                marginRight: theme.spacing(4),
              }}
              key={index}
              value={index}
              label={tab}
            />
          ))}
        {tabs.length === 0 &&
          breadcrumbs.length > 0 &&
          breadcrumbs.map((tab, index) => [
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
            />,
            <div
              key={index + 'sub'}
              style={{ alignSelf: 'center', marginBottom: '-0.3rem' }}
            >
              {index === 0 && breadcrumbs.length > 1 && (
                <ChevronRightSharp
                  sx={{
                    alignSelf: 'center',
                    margin: '0rem 1rem',
                  }}
                  fontSize="small"
                />
              )}
            </div>,
          ])}
      </Tabbar>
      {contact && (
        <LinkWrapper>
          <Link
            href={`https://api.whatsapp.com/send?phone=${(contact + '').replace(
              '+',
              '',
            )}`}
          >
            <Box
              sx={{
                position: 'absolute',
                right: 35,
                top: 6,
                cursor: 'pointer',
                backgroundColor: '#098624',
                color: '#fff',
                padding: '0.3rem 0.8rem',
                borderRadius: '0.5rem',
                '&:hover': {
                  backgroundColor: '#076b1d',
                },
                // center
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <WhatsApp fontSize="small" />
              Ajuda / Contato
            </Box>
          </Link>
        </LinkWrapper>
      )}
    </div>
  );
};

export default Toolbar;
