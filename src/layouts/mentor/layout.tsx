import MiniDrawer from '~/components/partials/MiniDrawer';
import PageWrapper from '~/components/partials/PageWrapper';

export default function Layout({ children }) {
  return (
    <>
      <PageWrapper>
        <MiniDrawer>{children}</MiniDrawer>
      </PageWrapper>
    </>
  );
}
