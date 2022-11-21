import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import { FC, useState } from 'react';
import Plus from '~/../public/svgs/plus';
import NewMentorModal from './components/AddMentorModal';
import AssignClientsModal from './components/AssignClientsModal';
import {
  ActiveClients,
  ButtonsWrapper,
  ClientsNumber,
  DeleteMentorButtons,
  Mentor,
  MentorButtons,
  MentorEmail,
  MentorInfo,
  MentorName,
  MentorsWrapper,
  NewTeamButton,
  TeamTitle,
  TeamWrapper,
} from './styles';

const Teams: FC<{ user }> = ({ user }) => {
  const isMobile = useMediaQuery('(max-width: 500px)');
  const [openAddMentor, setOpenAddMentor] = useState(false);
  const [openAssingClients, setOpenAssingClients] = useState(false);

  // Consts to controll buttons text
  const deleteMentorText = isMobile ? '' : 'Excluir Mentor';
  const addMentorText = isMobile ? '' : 'Cadastrar Mentor';
  const assignClientsText = isMobile ? '' : 'Atribuir Clientes';
  return (
    <>
      <ButtonsWrapper>
        <DeleteMentorButtons variant="text">
          {deleteMentorText}
        </DeleteMentorButtons>
        <MentorButtons
          variant="outlined"
          onClick={() => setOpenAddMentor(true)}
        >
          <Plus height={16} width={16} fill="#FE7D22" />
          {addMentorText}
        </MentorButtons>
        <MentorButtons
          variant="outlined"
          onClick={() => setOpenAssingClients(true)}
        >
          <Plus height={16} width={16} fill="#FE7D22" />
          {assignClientsText}
        </MentorButtons>
      </ButtonsWrapper>

      <TeamWrapper>
        <TeamTitle>Mentorfy Team</TeamTitle>

        <MentorsWrapper>
          <Mentor>
            <Image
              alt="imagem-do-mentor"
              src="/images/area-de-membros.png"
              width={130}
              height={115}
            />
            <MentorInfo>
              <MentorName>Antônio Salvior</MentorName>
              <MentorEmail>antonio_salvior@gmail.com</MentorEmail>
              <ActiveClients>Clientes Ativos</ActiveClients>
              <ClientsNumber>259</ClientsNumber>
            </MentorInfo>
          </Mentor>
          <Mentor>
            <Image
              alt="imagem-do-mentor"
              src="/images/area-de-membros.png"
              width={130}
              height={115}
            />
            <MentorInfo>
              <MentorName>Antônio Salvior</MentorName>
              <MentorEmail>antonio_salvior@gmail.com</MentorEmail>
              <ActiveClients>Clientes Ativos</ActiveClients>
              <ClientsNumber>259</ClientsNumber>
            </MentorInfo>
          </Mentor>
          <Mentor>
            <Image
              alt="imagem-do-mentor"
              src="/images/area-de-membros.png"
              width={130}
              height={115}
            />
            <MentorInfo>
              <MentorName>Antônio Salvior</MentorName>
              <MentorEmail>antonio_salvior@gmail.com</MentorEmail>
              <ActiveClients>Clientes Ativos</ActiveClients>
              <ClientsNumber>259</ClientsNumber>
            </MentorInfo>
          </Mentor>
        </MentorsWrapper>
      </TeamWrapper>
      <NewTeamButton variant="outlined">
        <Plus height={16} width={16} fill="#7586EC" />
        Criar Novo Time
      </NewTeamButton>
      <NewMentorModal open={openAddMentor} setOpen={openAddMentor} />
      <AssignClientsModal open={openAssingClients} setOpen={openAddMentor} />
    </>
  );
};

export default Teams;
