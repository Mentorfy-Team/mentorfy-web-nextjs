import InputField from '~/components/atoms/InputField';
import FormGroup from '@mui/material/FormGroup';

const RenderNewMentorForm: React.FC<{
  onChange;
}> = ({ onChange }) => {
  return (
    <FormGroup row>
      <InputField label="Nome" name="name" onChange={onChange} />

      <InputField label="Email" name="email" onChange={onChange} />

      <InputField
        label="Telefone"
        name="phone"
        onChange={onChange}
        type={'tel'}
      />

      <InputField
        label="Limite de Clientes (opcional)"
        name="limit"
        onChange={onChange}
        placeholder="0 - Sem limites."
      />
    </FormGroup>
  );
};

export default RenderNewMentorForm;
