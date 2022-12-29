import FormInput from '@app/components/atoms/FormInput';
import MaxCharacters from '@app/helpers/MaxCharacters';
import { InputsWrapper } from '@app/layouts/mentor/meu-perfil/style';
import { PaymentInfoWrapper } from '../../layouts/checkout/styles';

const CreditCardFields = ({ extra = null, errors = {} }) => {
  console.log(errors);

  return (
    <>
      <PaymentInfoWrapper>
        {extra}
        <FormInput
          name="card.number"
          type="number"
          label="Número do cartão"
          placeholder="0000000000000000"
          required
          onInput={(e) => MaxCharacters(e, 16)}
          error={
            errors['subscription.card.number'] || errors['subscription.card']
          }
        />
        <FormInput
          name="card.holder_name"
          type="text"
          label="Nome impresso no cartão"
          placeholder="João da Silva..."
          required
          error={
            errors['subscription.card.holder_name'] ||
            errors['subscription.card']
          }
        />
        <InputsWrapper>
          <FormInput
            type="number"
            name="card.exp_month"
            required
            label="Mês"
            placeholder="00"
            onInput={(e) => MaxCharacters(e, 2)}
            error={
              errors['subscription.card.exp_month'] ||
              errors['subscription.card']
            }
          />
          <FormInput
            name="card.exp_year"
            type="number"
            required
            label="Ano"
            placeholder="00"
            onInput={(e) => MaxCharacters(e, 2)}
            error={
              errors['subscription.card.exp_year'] ||
              errors['subscription.card']
            }
          />
          <FormInput
            name="card.cvv"
            type="number"
            placeholder="000"
            label="Cvv"
            required
            onInput={(e) => MaxCharacters(e, 4)}
            error={
              errors['subscription.card.cvv'] || errors['subscription.card']
            }
          />
        </InputsWrapper>
      </PaymentInfoWrapper>
    </>
  );
};

export default CreditCardFields;
