
import {FC, useCallback} from 'react';
import {useHookstate} from '@hookstate/core';
import {useRouter} from 'next/router';
import {Routes} from '~/consts';
import {UserDataStore} from '~/stores';
import Brand from './brand/brand';
import {
Link, LinkWrapper, Wrapper,
} from './header.partial.styles';

const Header: FC = () => {

  const router = useRouter();

  const navigate = useCallback((route: string) => {
    router.push(route);
  }, [ router ]);

  const logout = useCallback(() => {
    UserDataStore.signOut();
  }, [ ]);

  const {sessionStatus} = useHookstate(UserDataStore.state);

  return (
    <Wrapper>
      <Brand onClick={() => {
        if(sessionStatus.get()) {
          navigate(Routes.home);
        } else {
          navigate(Routes.login);
        }
      }} />
      <LinkWrapper>
        {sessionStatus.get() && (
          <Link onClick={() => navigate(Routes.home)}>
            Home
          </Link>
        )}
        <Link onClick={() => navigate(Routes.about)}>
          About
        </Link>
        {!sessionStatus.get() && (
          <Link onClick={() => navigate(Routes.login)}>
            Login
          </Link>
        )}
        {sessionStatus.get() && (
          <Link onClick={logout}>
            Logout
          </Link>
        )}
      </LinkWrapper>
    </Wrapper>
  );
};

export default Header;
