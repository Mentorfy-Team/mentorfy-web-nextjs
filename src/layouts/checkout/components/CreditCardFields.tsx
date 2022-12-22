import FormInput from '~/components/atoms/FormInput';
import { InputsWrapper } from '~/layouts/mentor/meu-perfil/style';
import { PaymentInfoWrapper } from '../styles';

const CreditCardFields = () => {
  return (
    <>
      <PaymentInfoWrapper>
        <FormInput
          name="card.number"
          type="number"
          label="Número do cartão"
          placeholder="0000000000000000"
          required
        />
        <FormInput
          name="card.name"
          type="text"
          label="Nome impresso no cartão"
          placeholder="João da Silva..."
          required
        />
        <InputsWrapper>
          <FormInput
            type="number"
            name="card.exp_month"
            required
            label="Mês"
            placeholder="00"
          />
          <FormInput
            name="card.exp_year"
            type="number"
            required
            label="Ano"
            placeholder="00"
          />
          <FormInput
            name="card.cvv"
            type="number"
            placeholder="000"
            label="CVV"
            required
          />
        </InputsWrapper>
      </PaymentInfoWrapper>
    </>
  );
};

export default CreditCardFields;
