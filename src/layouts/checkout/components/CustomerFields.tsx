import FormInput from '~/components/atoms/FormInput';
import MaxCharacters from '~/helpers/MaxCharacters';
import { InputsWrapper } from '~/layouts/mentor/meu-perfil/style';

const CustomerFields = () => {
  return (
    <>
      <FormInput
        name="customer.name"
        type="text"
        required
        placeholder="João da Silva"
        label="Nome Completo"
      />
      <FormInput
        name="customer.email"
        type="email"
        required
        placeholder="abc@email.com"
        label="E-mail"
      />
      <FormInput
        name="customer.email_confirmation"
        type="email"
        placeholder="abc@email.com"
        label="Confirme seu e-mail"
      />
      <FormInput type="text" required label="CPF" name="customer.document" />
      <FormInput
        name="customer.address.neighborhood"
        type="text"
        required
        placeholder="Centro..."
        label="Bairro"
      />
      <FormInput
        name="customer.address.street"
        type="text"
        required
        label="Rua"
        placeholder="Av. Paulista..."
      />
      <InputsWrapper>
        <FormInput
          type="text"
          required
          label="Número"
          placeholder="000"
          name="customer.address.number"
        />

        <FormInput
          name="customer.address.zipcode"
          type="text"
          required
          label="CEP"
          placeholder="00000000"
          onInput={(e) => MaxCharacters(e, 8)}
        />
      </InputsWrapper>
      <InputsWrapper>
        <FormInput
          name="customer.phones.mobile_phone.area_code"
          type="text"
          required
          placeholder="00"
          label="DDD"
          style={{ width: '20%' }}
          onInput={(e) => MaxCharacters(e, 2)}
        />
        <FormInput
          name="customer.phones.mobile_phone.number"
          type="tel"
          required
          label="Número de telefone"
          placeholder="000000000"
          onInput={(e) => MaxCharacters(e, 9)}
        />
      </InputsWrapper>
    </>
  );
};

export default CustomerFields;
