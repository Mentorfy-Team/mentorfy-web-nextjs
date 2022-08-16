import React, {FC} from 'react';
import {useHookstate} from '@hookstate/core';
import {LoadingPartialController} from './loading.partial.controller';
import {Animation, Wrapper} from './loading.partial.styles';

const LoadingPartial: FC = () => {
  const {requestCount} = useHookstate(LoadingPartialController.state);

  return (
    <Wrapper show={requestCount.get() > 0}>
      <Animation />
    </Wrapper>
  );
};

export default LoadingPartial;
