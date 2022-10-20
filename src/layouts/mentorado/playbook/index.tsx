import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { PublicRoutes } from '~/consts';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
import {
  Banner,
  Content,
  DescriptionText,
  SideBar,
  SideBarTitle,
  Tips,
  Wrapper,
} from './styles';

export const Playbook = ({ member_area_id }) => {
  const { steps: stepsData } = useMemberAreaTools(member_area_id);
  return (
    <ContentWidthLimit maxWidth={1400}>
      <Wrapper>
        <SideBar>
          <SideBarTitle>Playbook de Vendas</SideBarTitle>
        </SideBar>
        <Box>
          <Banner>Olá</Banner>

          <Tips>
            <Content>
              <Typography variant="h6">Dica importante</Typography>
              <DescriptionText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                natus eligendi repudiandae, tempora sunt eum fugit voluptatibus
                debitis. Omnis odio beatae inventore. Earum maxime perspiciatis
                atque, inventore veritatis ea aspernatur!
              </DescriptionText>
            </Content>
            <Content>
              <Typography variant="h6">Dica importante</Typography>
              <DescriptionText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                natus eligendi repudiandae, tempora sunt eum fugit voluptatibus
                debitis. Omnis odio beatae inventore. Earum maxime perspiciatis
                atque, inventore veritatis ea aspernatur!
              </DescriptionText>
            </Content>
            <Content>
              <Typography variant="h6">Dica importante</Typography>
              <DescriptionText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                natus eligendi repudiandae, tempora sunt eum fugit voluptatibus
                debitis. Omnis odio beatae inventore. Earum maxime perspiciatis
                atque, inventore veritatis ea aspernatur!
              </DescriptionText>
            </Content>
            <Content>
              <Typography variant="h6">Dica importante</Typography>
              <DescriptionText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                natus eligendi repudiandae, tempora sunt eum fugit voluptatibus
                debitis. Omnis odio beatae inventore. Earum maxime perspiciatis
                atque, inventore veritatis ea aspernatur!
              </DescriptionText>
            </Content>
            <Content>
              <Typography variant="h6">Dica importante</Typography>
              <DescriptionText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                natus eligendi repudiandae, tempora sunt eum fugit voluptatibus
                debitis. Omnis odio beatae inventore. Earum maxime perspiciatis
                atque, inventore veritatis ea aspernatur!
              </DescriptionText>
            </Content>
            <Content>
              <Typography variant="h6">Dica importante</Typography>
              <DescriptionText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                natus eligendi repudiandae, tempora sunt eum fugit voluptatibus
                debitis. Omnis odio beatae inventore. Earum maxime perspiciatis
                atque, inventore veritatis ea aspernatur!
              </DescriptionText>
            </Content>
          </Tips>
        </Box>
      </Wrapper>
    </ContentWidthLimit>
  );
};

// * ServerSideRender (SSR)
export const getProps = withPageAuth({
  authRequired: true,
  redirectTo: PublicRoutes.login,
  async getServerSideProps(ctx) {
    const id = ctx.query.id as string;
    return {
      props: {
        member_area_id: id,
      },
    };
  },
});
export default Playbook;
