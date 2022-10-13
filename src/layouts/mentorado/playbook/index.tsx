import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import { Banner, Content, DescriptionText, SideBar, SideBarTitle, Tips, Wrapper } from './styles';

export const Playbook = () => {
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
                            <Typography variant='h6'>Dica importante</Typography>
                            <DescriptionText>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Nobis natus eligendi repudiandae, tempora sunt eum fugit voluptatibus debitis.
                                Omnis odio beatae inventore. Earum maxime perspiciatis atque, inventore veritatis ea aspernatur!
                            </DescriptionText>
                        </Content>
                        <Content>
                            <Typography variant='h6'>Dica importante</Typography>
                            <DescriptionText>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Nobis natus eligendi repudiandae, tempora sunt eum fugit voluptatibus debitis.
                                Omnis odio beatae inventore. Earum maxime perspiciatis atque, inventore veritatis ea aspernatur!
                            </DescriptionText>
                        </Content>
                        <Content>
                            <Typography variant='h6'>Dica importante</Typography>
                            <DescriptionText>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Nobis natus eligendi repudiandae, tempora sunt eum fugit voluptatibus debitis.
                                Omnis odio beatae inventore. Earum maxime perspiciatis atque, inventore veritatis ea aspernatur!
                            </DescriptionText>
                        </Content>
                        <Content>
                            <Typography variant='h6'>Dica importante</Typography>
                            <DescriptionText>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Nobis natus eligendi repudiandae, tempora sunt eum fugit voluptatibus debitis.
                                Omnis odio beatae inventore. Earum maxime perspiciatis atque, inventore veritatis ea aspernatur!
                            </DescriptionText>
                        </Content>
                        <Content>
                            <Typography variant='h6'>Dica importante</Typography>
                            <DescriptionText>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Nobis natus eligendi repudiandae, tempora sunt eum fugit voluptatibus debitis.
                                Omnis odio beatae inventore. Earum maxime perspiciatis atque, inventore veritatis ea aspernatur!
                            </DescriptionText>
                        </Content>
                        <Content>
                            <Typography variant='h6'>Dica importante</Typography>
                            <DescriptionText>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Nobis natus eligendi repudiandae, tempora sunt eum fugit voluptatibus debitis.
                                Omnis odio beatae inventore. Earum maxime perspiciatis atque, inventore veritatis ea aspernatur!
                            </DescriptionText>
                        </Content>
                    </Tips>
                </Box>
            </Wrapper>
        </ContentWidthLimit>
    );
};

export async function getProps() {
    return {
        props: {},
    };
}
export default Playbook;
