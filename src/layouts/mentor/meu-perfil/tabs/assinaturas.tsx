import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {
  ActivePlan,
  DescriptionContainer,
  ExpiredPlan,
  ExpiresDate,
  ExpiresDateText,
  PlanContainer,
  PlanDescription,
  PlanText,
  PlanTitle,
  PlanWrapper,
  PlansWrapper,
  SignatureText,
  SignatureWrapper,
  TitleContainer,
} from '../style';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import PixModal from '../components/PixModal';
import LoadingButton from '@mui/lab/LoadingButton';
import PaymentChangeModal from '../components/ChangePayment';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import { SendPixPayment } from '~/services/checkout/pix.service';
import { isExpired } from '~/helpers/IsExpired';
import { Divider } from '@mui/material';
import { DeleteText } from '../../area-de-membros/components/GroupModal/styles';
import ModalComponent from '~/components/modules/Modal';
import { DeleteMentor } from '~/services/teams/teams.service';

type Props = {
  profile: ClientTypes.Profile;
  customer: Pagarme.Customer;
  plan: Pagarme.Plan;
  accesses: UserTypes.AccessType[];
};

const Signature = ({ profile, customer, plan, accesses }: Props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPix, setShowPix] = useState(false);
  const [openExitTeam, setOpenExitTeam] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pixQrCode, setPixQrCode] = useState('');

  const [seletedTeam, setSelectedTeam] = useState<any>();

  const router = useRouter();

  const FormatPrice = (price) => {
    // convert cents to reais
    const priceInReais = price / 100;
    // to readable format
    const priceInReaisReadable = priceInReais.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });

    return priceInReaisReadable;
  };

  const handlePixRequest = async () => {
    setIsLoading(true);
    const expiration_date = new Date();
    expiration_date.setDate(expiration_date.getDate() + 1);

    const response = await SendPixPayment({
      items: [
        {
          description: plan.id + '',
          amount: plan.items[0].pricing_scheme.price_brackets[0].price,
          quantity: 1,
          code: plan.id + '',
        },
      ],
      customer_id: customer.id,
      payments: [
        {
          payment_method: 'pix',
          pix: {
            expires_in: parseInt((86400 / 24).toFixed(0)),
          },
        },
      ],
    } as Pagarme.Pix.Request);
    setIsLoading(false);
    if (response.charges && response.charges[0].last_transaction.qr_code) {
      setOpen(true);
      // setShowPix(true);
      setPixQrCode(response.charges[0].last_transaction.qr_code);
    }
  };

  const isActive = (date) => {
    const expiration_date = new Date(date);
    const today = new Date();
    return expiration_date > today;
  };

  return (
    <>
      <SignatureWrapper>
        <SignatureText>Assinatura</SignatureText>
        <Divider sx={{ borderColor: '#272727', margin: '1rem -1.5rem' }} />
        {!plan && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {isExpired(profile.expiration_date) && (
              <Typography>
                Você ainda{' '}
                <b
                  style={{
                    color: theme.palette.accent.main,
                  }}
                >
                  não possui uma assinatura
                </b>{' '}
                ativa. Assine agora para não perdeu o seu acesso.
              </Typography>
            )}
            {!isExpired(profile.expiration_date) && (
              <Typography textAlign="center">
                Você possui um periodo de{' '}
                <b
                  style={{
                    color: theme.palette.success.main,
                  }}
                >
                  acesso livre
                </b>
                , com vencimento em{' '}
                <b
                  style={{
                    color: theme.palette.accent.main,
                  }}
                >
                  {new Date(profile.expiration_date).toLocaleDateString(
                    'pt-BR',
                    {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                    },
                  )}
                </b>
                . <p />
                Você pode assinar um novo plano clicando abaixo.
              </Typography>
            )}
            <PlansWrapper>
              <PlanContainer>
                <TitleContainer>
                  <PlanTitle>
                    Anual
                  </PlanTitle>
                </TitleContainer>
                <DescriptionContainer>
                  <PlanDescription>
                    Acesso ilimitado à Áreas de Membros
                  </PlanDescription>
                </DescriptionContainer>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    await router.prefetch('/checkout/plan_YPpMGKptgmIrM8gv');
                    await router.push('/checkout/plan_YPpMGKptgmIrM8gv');
                  }}
                >
                  Assinar agora
                </Button>
              </PlanContainer>

              <PlanContainer>
                <TitleContainer>
                  <PlanTitle>
                    Mensal
                  </PlanTitle>
                </TitleContainer>
                <DescriptionContainer>
                  <PlanDescription>
                    Acesso limitado à Áreas de Membros
                  </PlanDescription>
                </DescriptionContainer>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    await router.prefetch('/checkout/plan_YPpMGKptgmIrM8gv');
                    await router.push('/checkout/plan_YPpMGKptgmIrM8gv');
                  }}
                >
                  Assinar agora
                </Button>
              </PlanContainer>
            </PlansWrapper>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                await router.prefetch('/checkout/plan_YPpMGKptgmIrM8gv');
                await router.push('/checkout/plan_YPpMGKptgmIrM8gv');
              }}
            >
              Assinar agora
            </Button> */}
          </Box>
        )}
        {plan && (
          <>
            <PlanWrapper>
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <PlanText>{plan?.name}</PlanText>
                {isActive(profile.expiration_date) && (
                  <ActivePlan>Ativo</ActivePlan>
                )}
                {!isActive(profile.expiration_date) && (
                  <ExpiredPlan>Expirado</ExpiredPlan>
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <ExpiresDateText>Vencimento</ExpiresDateText>
                <ExpiresDate>
                  {new Date(profile.expiration_date).toLocaleDateString(
                    'pt-BR',
                    {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                    },
                  )}
                </ExpiresDate>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <ExpiresDateText>Valor Total</ExpiresDateText>
                <ExpiresDate>
                  {FormatPrice(
                    plan?.items[0].pricing_scheme.price_brackets[0].price,
                  )}
                </ExpiresDate>
              </Box>

              <Button
                sx={{ textTransfor: 'uppercase' }}
                onClick={() => setOpenPaymentModal(true)}
              >
                Alterar Pagamento
              </Button>

              {!profile.card_id && (
                <LoadingButton
                  loading={isLoading}
                  variant="outlined"
                  onClick={() => handlePixRequest()}
                  sx={{
                    background: 'none',
                    border: `1px solid ${theme.palette.accent.main}`,
                    textTransform: 'none',
                  }}
                >
                  Pagar Fatura
                </LoadingButton>
              )}
            </PlanWrapper>
          </>
        )}

        <Divider sx={{ borderColor: '#272727', margin: '1rem -1.5rem' }} />
        <SignatureText>Acessos de Time</SignatureText>

        {accesses.filter((a) => !!a.team?.id).length === 0 && (
          <Typography textAlign="center">
            Você ainda não possui acesso a nenhum time.
          </Typography>
        )}
        <Box height="1rem" />
        {accesses
          .filter((a) => !!a.team?.id)
          .map(({ team }) => (
            <PlanWrapper key={team.id}>
              <Box sx={{ display: 'flex', gap: '1rem' }}>
                <PlanText>{team?.name}</PlanText>
                {isActive(profile.expiration_date) && (
                  <ActivePlan>Ativo</ActivePlan>
                )}
                {!isActive(profile.expiration_date) && (
                  <ExpiredPlan>Expirado</ExpiredPlan>
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <ExpiresDateText>Produtos Vinculados</ExpiresDateText>
                <ExpiresDate>{team?.products?.length}</ExpiresDate>
              </Box>
              <Box />
              <Box />
              <Box />
              <Button
                sx={{ textTransfor: 'uppercase' }}
                onClick={() => {
                  setOpenExitTeam(true);
                  setSelectedTeam(team);
                }}
              >
                Sair do Time
              </Button>

              {!profile.card_id && (
                <LoadingButton
                  loading={isLoading}
                  variant="outlined"
                  onClick={() => handlePixRequest()}
                  sx={{
                    background: 'none',
                    border: `1px solid ${theme.palette.accent.main}`,
                    textTransform: 'none',
                  }}
                >
                  Pagar Fatura
                </LoadingButton>
              )}
            </PlanWrapper>
          ))}
      </SignatureWrapper>
      <PixModal open={open} setOpen={setOpen} qrCode={pixQrCode} />
      <PaymentChangeModal
        open={openPaymentModal}
        setOpen={setOpenPaymentModal}
        plan={plan}
        customer={customer}
        profile={profile}
      />
      <ModalComponent
        onDelete={async () => {
          await DeleteMentor({
            teams: [seletedTeam.id],
            reason: 'Optou por sair.',
            profile_id: profile.id,
          });
          setOpenExitTeam(false);
          // reload page
          router.reload();
        }}
        onSave={() => {
          setOpenExitTeam(false);
        }}
        open={openExitTeam}
        setOpen={setOpenExitTeam}
        title="Sair do Time"
        deleteMessage={true}
        deleteTitle="Sair"
      >
        <Box sx={{ textAlign: 'center' }}>
          <DeleteText>
            Ao sair, você perderá todos os acessos relacionados a esse time.
            Deseja continuar mesmo assim?
          </DeleteText>
        </Box>
      </ModalComponent>
    </>
  );
};

export default Signature;
