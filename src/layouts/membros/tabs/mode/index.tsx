import { FC } from 'react';
import { Box, Button, SvgIcon } from '@mui/material';
import { useRouter } from 'next/router';
import { InputField } from '~/components';
import { Routes } from '~/consts';
import SelectActiveProduct from '../../components/SelectActiveProduct';
import { ActionButton } from '../../styles';
import { chavron_left_svg } from '~/../public/svgs';

const Links: FC = () => {
  const route = useRouter();
  return <></>;
};

export default Links;
