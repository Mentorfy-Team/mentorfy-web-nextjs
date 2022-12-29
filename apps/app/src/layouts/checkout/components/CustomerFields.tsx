import FormInput from '@app/components/atoms/FormInput';
import MaxCharacters from '@app/helpers/MaxCharacters';
import { InputsWrapper } from '@app/layouts/mentor/meu-perfil/style';

const CustomerFields = ({ onlyAddress = false, errors = {} }) => {
  return (
    <>
      {!onlyAddress && (
        <>
          <FormInput
            name="customer.name"
            type="text"
            required
            placeholder="João da Silva"
            label="Nome Completo"
            error={errors['customer.name']}
          />
          <FormInput
            name="customer.email"
            type="email"
            required
            placeholder="abc@email.com"
            label="E-mail"
            error={errors['customer.email']}
          />
          <FormInput
            name="customer.email_confirmation"
            type="email"
            required
            placeholder="abc@email.com"
            label="Confirme seu e-mail"
            error={errors['customer.email_confirmation']}
          />
        </>
      )}
      <FormInput
        type="text"
        required
        label="CPF/CNPJ"
        name="customer.document"
        error={errors['customer.document']}
      />
      <FormInput
        name="customer.address.line_1"
        type="text"
        required
        placeholder="Centro..."
        label="Endereço"
        error={errors['customer.address.line_1']}
      />
      <FormInput
        name="customer.address.state"
        type="text"
        required
        placeholder="SP"
        label="Estado"
        onInput={(e) => MaxCharacters(e, 2)}
        error={errors['customer.address.state']}
      />
      <InputsWrapper>
        <FormInput
          type="text"
          required
          label="Cidade"
          placeholder="São Paulo"
          name="customer.address.city"
          error={errors['customer.address.city']}
        />

        <FormInput
          name="customer.address.zip_code"
          type="text"
          required
          label="CEP"
          placeholder="00000000"
          onInput={(e) => MaxCharacters(e, 8)}
          error={errors['customer.address.zip_code']}
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
          error={errors['customer.phones.mobile_phone.area_code']}
        />
        <FormInput
          name="customer.phones.mobile_phone.number"
          type="tel"
          required
          label="Número de telefone"
          placeholder="000000000"
          onInput={(e) => MaxCharacters(e, 9)}
          error={errors['customer.phones.mobile_phone.number']}
        />
      </InputsWrapper>
    </>
  );
};

export default CustomerFields;
