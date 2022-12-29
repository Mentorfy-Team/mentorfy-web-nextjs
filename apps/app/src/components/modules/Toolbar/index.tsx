import React, { useEffect, useState } from 'react';
import { ChevronRightSharp, WhatsApp } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Tabbar from '../Tabbar';
import { TabItem } from '../Tabbar/styles';
import Link from 'next/link';
import { ActionButton, LinkWrapper, WhatsAppButton } from './styles';

type Props = {
  onChange?: (value: number) => void;
  tabs?: string[] | number[];
  breadcrumbs?: string[];
  initialTab?: number;
  contact?: number | string;
  actionClick?: () => void;
  actionTitle?: string;
  actionIcon?: React.ReactNode;
  actionVisible?: boolean;
};

const Toolbar: React.FC<Props> = ({
  onChange = () => {},
  tabs = [],
  breadcrumbs = [],
  initialTab = 0,
  contact = null,
  actionClick,
  actionTitle,
  actionIcon,
  actionVisible,
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
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'row-reverse',
          gap: '1rem',
          top: 0,
          right: 0,
          paddingRight: '1rem',
        }}
      >
        {contact && (
          <LinkWrapper>
            <Link
              href={`https://api.whatsapp.com/send?phone=${(
                contact + ''
              ).replace('+', '')}`}
            >
              <WhatsAppButton>
                <WhatsApp fontSize="small" />
                Ajuda / Contato
              </WhatsAppButton>
            </Link>
          </LinkWrapper>
        )}
        {actionVisible && (
          <ActionButton onClick={actionClick}>
            {actionIcon}
            {actionTitle}
          </ActionButton>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
