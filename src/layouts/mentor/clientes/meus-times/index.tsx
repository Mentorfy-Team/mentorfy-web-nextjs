import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FC, useCallback, useEffect, useState } from 'react';
import Plus from '~/../public/svgs/plus';
import TipBar from '~/components/modules/TipBar';
import { useTeams } from '~/hooks/useTeams';
import { CreateTeam } from '~/services/teams/teams.service';
import { userStore } from '~/stores';
import NewMentorModal from './components/AddMentorModal';
import AssignClientsModal from './components/AssignClientsModal';
import DeleteMentorModal from './components/DeleteMentorModal';
import MentorCard from './components/MentorCard';
import NewTeamModal from './components/NewTeamModal';
import TeamCard from './components/TeamCard';
import {
  ButtonsWrapper,
  DeleteMentorButtons,
  MentorButtons,
  NewTeamButton,
} from './styles';

const Teams: FC<{ user; initialTeams }> = ({ user }) => {
  const { setLoading } = userStore();
  const isMobile = useMediaQuery('(max-width: 500px)');
  const [openAddMentor, setOpenAddMentor] = useState(false);
  const [openAssingClients, setOpenAssingClients] = useState(false);
  const [openDeleteMentor, setDeleteMentor] = useState(false);
  const { data: teamsData, mutate, isError } = useTeams(user.id);
  // Consts to controll buttons text
  const deleteMentorText = isMobile ? '' : 'Excluir Mentor';
  const addMentorText = isMobile ? '' : 'Cadastrar Mentor';
  const assignClientsText = isMobile ? '' : 'Atribuir Clientes';

  const [openNewTeam, setOpenNewTeam] = useState(false);

  const [myTeams, setMyTeams] = useState<typeof teamsData>([]);

  useEffect(() => {
    if (teamsData.length) setMyTeams(teamsData);
  }, [teamsData]);

  useEffect(() => {
    setLoading(!isError && !teamsData);
  }, [isError, setLoading, teamsData]);

  const TeamsSection = useCallback(
    ({ teams }: { teams: TeamTypes.TeamTree[] }) => {
      console.log('teams', teams);
      return (
        <Box gap={2}>
          {teams?.map((team) => (
            <TeamCard key={team.id} title={team.title}>
              {team.team_member?.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  name={mentor.profile.name}
                  email={mentor.profile.email}
                  activeClients={mentor.team_member_client.length}
                  avatar=""
                />
              ))}
              {(!team.team_member || team.team_member.length == 0) && (
                <TipBar
                  sx={{
                    marginBottom: '0px',
                    width: '100%',
                  }}
                >
                  Você <span>ainda não adicionou mentores</span> ao seu time.
                  Cadastre um novo mentor.
                </TipBar>
              )}
            </TeamCard>
          ))}
        </Box>
      );
    },
    [],
  );

  const handleNewTeam = useCallback(
    async (title) => {
      await CreateTeam(title);
      await mutate();
    },
    [mutate],
  );

  return (
    <>
      <ButtonsWrapper>
        <DeleteMentorButtons
          disabled={!myTeams || myTeams.length == 0}
          variant="text"
          onClick={() => setDeleteMentor(true)}
        >
          {deleteMentorText}
        </DeleteMentorButtons>
        <MentorButtons
          disabled={!myTeams || myTeams.length == 0}
          variant="outlined"
          onClick={() => setOpenAddMentor(true)}
        >
          <Plus height={16} width={16} fill="#FE7D22" />
          {addMentorText}
        </MentorButtons>
        <MentorButtons
          variant="outlined"
          disabled={!myTeams || myTeams.length == 0}
          onClick={() => setOpenAssingClients(true)}
        >
          <Plus height={16} width={16} fill="#FE7D22" />
          {assignClientsText}
        </MentorButtons>
      </ButtonsWrapper>

      {(!myTeams || myTeams.length == 0) && (
        <TipBar sx={{ marginTop: '1.5rem' }}>
          Você <span>ainda não criou nenhum time</span> para atribuir mentores à
          clientes. Para começar, crie um novo time.
        </TipBar>
      )}

      <TeamsSection teams={myTeams} />
      <NewTeamButton variant="outlined" onClick={() => setOpenNewTeam(true)}>
        <Plus height={16} width={16} />
        Criar Novo Time
      </NewTeamButton>

      <NewMentorModal open={openAddMentor} setOpen={setOpenAddMentor} />
      <AssignClientsModal
        open={openAssingClients}
        setOpen={setOpenAssingClients}
      />

      <NewTeamModal
        onSubmit={(values) => handleNewTeam(values)}
        open={openNewTeam}
        setOpen={setOpenNewTeam}
      />
      <DeleteMentorModal open={openDeleteMentor} setOpen={setDeleteMentor} />
    </>
  );
};

export default Teams;
