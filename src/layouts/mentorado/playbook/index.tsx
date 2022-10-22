import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { DnDObject } from '~/components/modules/DragNDrop';
import { PublicRoutes } from '~/consts';
import { OrganizeTools } from '~/helpers/OrganizeTools';
import { useMemberAreaTools } from '~/hooks/useMemberAreaTools';
import SwitchMentoredModal, { ToolListNames } from '../helpers/SwitchModal';
import { UserInput } from '../kanban';
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
  const { steps: stepsData, mutate } = useMemberAreaTools(member_area_id);
  const [steps, setSteps] = useState<DnDObject[]>([]);
  const [userInput, setUserInput] = useState<UserInput[]>([]);
  const [open, setOpen] = useState(false);

  const [currentModal, setCurrentModal] = useState<{
    onChange: any;
    type: string;
    refId?: string;
    area_id?: string;
    data?: any;
  }>();

  useEffect(() => {
    setSteps((oldSteps) => {
      oldSteps = [...OrganizeTools(stepsData)];
      return [...oldSteps];
    });
  }, [stepsData]);

  const HandleModal = useCallback(() => {
    return (
      <SwitchMentoredModal
        open={open}
        setOpen={setOpen}
        onChange={currentModal.onChange}
        type={currentModal.type}
        refId={currentModal.refId}
        area_id={member_area_id}
        data={currentModal.data}
        userInput={
          userInput.find((inp) => inp.tool_id === currentModal.refId)?.data
        }
      />
    );
  }, [currentModal, open, member_area_id, userInput]);

  const GetTypeName = useCallback((type) => {
    return Object.values(ToolListNames).find((i) => {
      return i.id == parseInt(type);
    }).name;
  }, []);

  const handleSave = useCallback(async () => {
    // timout para dar tempo para as imagens se organizarem
    setTimeout(async function () {
      //await InputUserMemberArea(member_area_id, userInput);
      mutate();
    }, 1000);
  }, [mutate]);

  const GetOnChange = useCallback(
    async ({ refId, data }) => {
      setUserInput((oldInput) => {
        const index = oldInput.findIndex((i) => i.tool_id == refId);
        if (index > -1) {
          oldInput[index].data = data;
        } else {
          oldInput.push({ tool_id: refId, data });
        }
        return [...oldInput];
      });

      handleSave();
    },
    [handleSave],
  );

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
