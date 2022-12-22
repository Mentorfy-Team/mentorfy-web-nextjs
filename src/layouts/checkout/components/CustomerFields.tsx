import FormInput from '~/components/atoms/FormInput';
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
      <FormInput
        type="text"
        required
        placeholder="CPF/CNPJ"
        label="CPF/CNPJ"
        name="customer.document"
      />
      <FormInput
        name="address.neighborhood"
        type="text"
        required
        placeholder="Centro..."
        label="Bairro"
      />
      <FormInput
        name="address.street"
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
          name="address.number"
        />

        <FormInput
          name="address.cep"
          type="number"
          required
          label="CEP"
          placeholder="00000000"
        />
      </InputsWrapper>
      <InputsWrapper>
        <FormInput
          name="customer.phone.ddd"
          type="number"
          required
          placeholder="00"
          label="DDD"
          sx={{ width: '20%' }}
        />
        <FormInput
          name="customer.phone.number"
          type="number"
          required
          label="Número de telefone"
          placeholder="000000000"
        />
      </InputsWrapper>
    </>
  );
};

export default CustomerFields;
