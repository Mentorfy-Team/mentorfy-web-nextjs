import { FC } from 'react';
import { Text } from './styles';

// import { Container } from './styles';

const TextSuccess: FC<{ children: any; success: boolean }> = ({
  children,
  success,
}) => (
  <Text
    fontSize={'small'}
    width="100%"
    color={({ palette }) =>
      success ? palette.success.main : palette.caption.main
    }
  >
    {children}
  </Text>
);

export default TextSuccess;
