import { FC, useCallback, useEffect, useState } from 'react';
import Save from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import InputField from '~/components/atoms/InputField';
import { CustomTypograpy, SaveButton, SvgWrapper } from './styles';
import { userStore } from '~/stores';
import { InputAdornment } from '@mui/material';
import { KeyRounded, LockOpenRounded } from '@mui/icons-material';
import { UpdateIntegrations } from '~/services/member-area/integration/index.service';
import { useIntegrations } from '~/hooks/useIntegrations';
type props = {
  id: string;
  readOnly?: boolean;
  product?: ProductTypes.Product;
};
const Integrations: FC<props> = ({ id, readOnly, product }) => {
  const { handleSubmit } = useForm<ProductClient.Product>();
  const { data: integrationData } = useIntegrations(id);
  const [integrations, setIntegrations] = useState<
    { type: string; token: string }[]
  >([]);
  const theme = useTheme();

  const { setLoading, isLoading } = userStore();

  useEffect(() => {
    if (integrationData) {
      setIntegrations(integrationData);
    }
  }, [integrationData]);

  const onSubmit: SubmitHandler<ProductClient.CreateProduct> =
    useCallback(async () => {
      setLoading(true);
      await UpdateIntegrations({
        product_id: id,
        list: integrations,
      });
      toast.success('Alterações salvas com sucesso', { autoClose: 2000 });
      setLoading(false);
    }, [id, integrations, setLoading]);

  const Accent = useCallback(
    (props: any) => (
      <span
        style={{
          color: `${theme.palette.accent.main}`,
          fontWeight: 'bold',
        }}
        {...props}
      />
    ),
    [theme.palette.accent.main],
  );

  const onChangeIntegration = useCallback((value: string, type: string) => {
    setIntegrations((state) => {
      const newState = [...state];
      const index = newState.findIndex((i) => i.type === type);

      // if doesn't exist, create
      if (index === -1) {
        newState.push({ type, token: value });
      } else {
        newState[index].token = value;
      }

      return newState;
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        pb={4}
      >
        <div />
        <SaveButton
          sx={{
            float: 'right',
            marginLeft: '2rem',
          }}
          variant="outlined"
          color="primary"
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          <SvgWrapper>
            <Save />
          </SvgWrapper>
          Salvar alterações
        </SaveButton>
      </Box>
      <CustomTypograpy>
        • Para integrar você precisa fornecer o <Accent>token</Accent> de
        identificação fornecida pela plataforma que deseja integrar. Você pode
        encontrar o token em sua plataforma pelo nome &quot;
        <Accent>integrações</Accent>&quot; e ou &quot;<Accent>webhooks</Accent>
        &quot;.
      </CustomTypograpy>
      <Divider
        sx={{
          borderColor: `${theme.palette.tertiary.light}`,
          marginBottom: '1.8rem',
        }}
      />
      <InputField
        color="secondary"
        value={'https://app.mentorfy.io/api/webhooks/' + product.refeerer}
        label="URL de integração MentorFy"
        InputLabelProps={{
          shrink: true,
          'aria-readonly': true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOpenRounded color="info" />
            </InputAdornment>
          ),
        }}
        disabled
      />
      <InputField
        color="secondary"
        value={integrations.find((i) => i.type === 'kiwify')?.token}
        label="Token de integração Kiwify"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyRounded color="info" />
            </InputAdornment>
          ),
        }}
        onChange={(e) => onChangeIntegration(e.target.value, 'kiwify')}
      />
      <InputField
        color="secondary"
        value={integrations.find((i) => i.type === 'eduzz')?.token}
        label="Token de integração Eduzz"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyRounded color="info" />
            </InputAdornment>
          ),
        }}
        placeholder="..."
        onChange={(e) => onChangeIntegration(e.target.value, 'eduzz')}
      />
      <InputField
        color="secondary"
        value={integrations.find((i) => i.type === 'hotmart')?.token}
        label="Token de integração Hotmart"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyRounded color="info" />
            </InputAdornment>
          ),
        }}
        placeholder="..."
        onChange={(e) => onChangeIntegration(e.target.value, 'hotmart')}
      />
      <InputField
        color="secondary"
        value={integrations.find((i) => i.type === 'green')?.token}
        label="Token de integração Green"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyRounded color="info" />
            </InputAdornment>
          ),
        }}
        placeholder="..."
        onChange={(e) => onChangeIntegration(e.target.value, 'green')}
      />
    </form>
  );
};

export default Integrations;
