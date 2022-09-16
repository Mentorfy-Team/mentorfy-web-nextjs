import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { userStore } from '~/stores';
import { Animation, Wrapper } from './loading.partial.styles';

const LoadingPartial: FC = () => {
  const { isLoading, setLoading } = userStore();

  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      if (url !== router.asPath) {
        setLoading(true);
        console.log('set true');
      }
    };
    const handleComplete = (url) => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });
  return (
    <Wrapper onClick={(e) => e.stopPropagation()} show={isLoading}>
      <Animation />
    </Wrapper>
  );
};

export default LoadingPartial;
