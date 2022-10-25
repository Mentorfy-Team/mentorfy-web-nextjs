import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { userStore } from '~/stores';
import { Animation, LoadingWrapper } from './loading.partial.styles';

export const LoadingComponent = ({ isLoading = false }) => {
  return (
    <LoadingWrapper onClick={(e) => e.stopPropagation()} show={isLoading}>
      <Animation />
    </LoadingWrapper>
  );
};

const LoadingPartial: FC = () => {
  const { isLoading, setLoading } = userStore();

  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      if (url !== router.asPath) {
        setLoading(true);
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
  return <LoadingComponent isLoading={isLoading} />;
};

export default LoadingPartial;
