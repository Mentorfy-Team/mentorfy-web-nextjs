import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import SearchInput from '~/components/atoms/SearchInput';
import ContentWidthLimit from '~/components/modules/ContentWidthLimit';
import CompletedClientsTable from './components/Tabela-Clientes-Concluído';
import { Bundle, BundleAmount, BundleDescription, BundleHeader, Class, ClassDescription, ClassWrapper, ImageText, ImageWrapper, ScrollArea } from './styles';

type props = {
    id: string;
};

const ClientJourney: FC<props> = ({ id }) => {

    const isMobile = useMediaQuery('(max-width: 600px)');

    return (
        <ContentWidthLimit maxWidth={1200}>
            <ScrollArea>
                <Bundle>
                    <BundleHeader>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <ImageWrapper>
                                <Image alt='imagem-principal' width={40} height={40} src='/svgs/step-image.svg' />
                                <ImageText>Madrugada</ImageText>
                            </ImageWrapper>

                            <Box sx={{textAlign: 'right'}}>
                                <Typography sx={{fontWeight: '600'}}>Total de Mentorandos</Typography>
                                <BundleAmount>272</BundleAmount>
                            </Box>
                        </Box>

                        <BundleDescription>Lorem ipsum dolor aist devellum lorem ipsum.</BundleDescription>
                    </BundleHeader>

                    <ClassWrapper>
                        <Class>
                            <ClassDescription>Etapa 1 - Aula 1 Lorem Ipsum</ClassDescription>

                            <ClassDescription>100% <Image alt='imagem-principal' width={13} height={13} src='/svgs/done.svg' /></ClassDescription>
                        </Class>
                    </ClassWrapper>
                </Bundle>
                <Bundle>
                    <BundleHeader>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <ImageWrapper>
                                <Image alt='imagem-principal' width={40} height={40} src='/svgs/step-image.svg' />
                                <ImageText>Madrugada</ImageText>
                            </ImageWrapper>

                            <Box sx={{textAlign: 'right'}}>
                                <Typography sx={{fontWeight: '600'}}>Total de Mentorandos</Typography>
                                <BundleAmount>272</BundleAmount>
                            </Box>
                        </Box>

                        <BundleDescription>Lorem ipsum dolor aist devellum lorem ipsum.</BundleDescription>
                    </BundleHeader>

                    <ClassWrapper>
                        <Class>
                            <ClassDescription>Etapa 1 - Aula 1 Lorem Ipsum</ClassDescription>

                            <ClassDescription>100% <Image alt='imagem-principal' width={13} height={13} src='/svgs/done.svg' /></ClassDescription>
                        </Class>
                    </ClassWrapper>
                </Bundle>
                <Bundle>
                    <BundleHeader>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <ImageWrapper>
                                <Image alt='imagem-principal' width={40} height={40} src='/svgs/step-image.svg' />
                                <ImageText>Madrugada</ImageText>
                            </ImageWrapper>

                            <Box sx={{textAlign: 'right'}}>
                                <Typography sx={{fontWeight: '600'}}>Total de Mentorandos</Typography>
                                <BundleAmount>272</BundleAmount>
                            </Box>
                        </Box>

                        <BundleDescription>Lorem ipsum dolor aist devellum lorem ipsum.</BundleDescription>
                    </BundleHeader>

                    <ClassWrapper>
                        <Class>
                            <ClassDescription>Etapa 1 - Aula 1 Lorem Ipsum</ClassDescription>

                            <ClassDescription>100% <Image alt='imagem-principal' width={13} height={13} src='/svgs/done.svg' /></ClassDescription>
                        </Class>
                    </ClassWrapper>
                </Bundle>
                <Bundle>
                    <BundleHeader>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <ImageWrapper>
                                <Image alt='imagem-principal' width={40} height={40} src='/svgs/step-image.svg' />
                                <ImageText>Madrugada</ImageText>
                            </ImageWrapper>

                            <Box sx={{textAlign: 'right'}}>
                                <Typography sx={{fontWeight: '600'}}>Total de Mentorandos</Typography>
                                <BundleAmount>272</BundleAmount>
                            </Box>
                        </Box>

                        <BundleDescription>Lorem ipsum dolor aist devellum lorem ipsum.</BundleDescription>
                    </BundleHeader>

                    <ClassWrapper>
                        <Class>
                            <ClassDescription>Etapa 1 - Aula 1 Lorem Ipsum</ClassDescription>

                            <ClassDescription>100% <Image alt='imagem-principal' width={13} height={13} src='/svgs/done.svg' /></ClassDescription>
                        </Class>
                    </ClassWrapper>
                </Bundle>
            </ScrollArea>

            <SearchInput
                sx={{
                  width: isMobile ? '90vw' : '15vw',
                  margin: '1rem 0'
                }}
              />
              <CompletedClientsTable/>
        </ContentWidthLimit>
    );
};

export default ClientJourney;
