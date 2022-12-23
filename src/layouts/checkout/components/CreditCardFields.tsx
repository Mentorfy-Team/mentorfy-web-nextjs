import FormInput from '~/components/atoms/FormInput';
import MaxCharacters from '~/helpers/MaxCharacters';
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
          onInput={(e) => MaxCharacters(e, 16)}
        />
        <FormInput
          name="card.holder_name"
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
            onInput={(e) => MaxCharacters(e, 2)}
          />
          <FormInput
            name="card.exp_year"
            type="number"
            required
            label="Ano"
            placeholder="00"
            onInput={(e) => MaxCharacters(e, 2)}
          />
          <FormInput
            name="card.cvv"
            type="number"
            placeholder="000"
            label="CVV"
            required
            onInput={(e) => MaxCharacters(e, 4)}
          />
        </InputsWrapper>
      </PaymentInfoWrapper>
    </>
  );
};

export default CreditCardFields;
