import {
  Add,
  Airplay,
  DeleteForever,
  Group,
  School,
  SettingsSuggest,
  Widgets,
} from '@mui/icons-material';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FC, useCallback, useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import MenuDropdown from '~/components/modules/MenuDropdown';
import TipBar from '~/components/modules/TipBar';
import { ApiRoutes } from '~/consts/routes/api.routes';
import { useClients } from '~/hooks/useClients';
import { useProducts } from '~/hooks/useProducts';
import { useTeams } from '~/hooks/useTeams';
import {
  AddMentor,
  AddProductAttr,
  AssignClients,
  CreateTeam,
  DeleteAttr,
  DeleteMentor,
  DeleteTeam,
} from '~/services/teams/teams.service';
import { userStore } from '~/stores';
import NewMentorModal from './components/AddMentorModal';
import AssignClientsModal from './components/AssignClientsModal';
import AssignProductsModal from './components/AssignProductsModal';
import DeleteAttrModal from './components/DeleteAttrModal';
import DeleteMentorModal from './components/DeleteMentorModal';
import DeleteTeamModal from './components/DeleteTeamModal';
import MentorCard from './components/MentorCard';
import NewTeamModal from './components/NewTeamModal';
import TeamCard from './components/TeamCard';
import { ButtonsWrapper } from './styles';

type Props = {
  open: boolean;
  refId: string;
};

type TeamType = {
  teams: TeamTypes.TeamTree[];
  onAddMentor: (props: Props) => void;
  onDeleteMentor: (props: Props) => void;
  onAddProductAttr: (props: { team; open }) => void;
};

const Teams: FC<{ user }> = ({ user }) => {
  const { setLoading } = userStore();
  const isMobile = useMediaQuery('(max-width: 500px)');
  const { products } = useProducts(user.id);
  const [openAssingClients, setOpenAssingClients] = useState(false);
  const [openDeleteAttr, setDeleteAttr] = useState(false);
  const [openDeleteTeam, setDeleteTeam] = useState(false);
  const [openAddMentor, setOpenAddMentor] = useState({
    open: false,
    refId: '',
  });
  const [openDeleteMentor, setDeleteMentor] = useState({
    open: false,
    refId: '',
  });
  const [openProductAttr, setOpenProductAttr] = useState<{
    open;
    team: TeamTypes.TeamTree;
  }>({
    open: false,
    team: null,
  });
  const [deleteProductAttr, setDeleteProductAttr] = useState({
    open: false,
    refId: '',
  });

  const {
    data: teamsData,
    mutate,
    isLoading: isLoadingTeams,
  } = useTeams(user.id);
  const { clients } = useClients(user.id);
  const { mutate: fnMutate } = useSWRConfig();

  const deleteMentorText = isMobile ? '' : 'Excluir Mentor';
  const addMentorText = isMobile ? '' : 'Adicionar Mentor';
  const assignClientsText = isMobile ? '' : 'Atribuir Clientes';
  const deAssignClientsText = isMobile ? '' : 'Remover Atribuição';
  const AssignProductsText = isMobile ? '' : 'Gerenciar Produtos';

  const [openNewTeam, setOpenNewTeam] = useState(false);

  const [myTeams, setMyTeams] = useState<typeof teamsData>([]);

  const [hasMentors, setHasMentors] = useState(false);

  useEffect(() => {
    setMyTeams(teamsData || []);
    setHasMentors(
      teamsData?.some((team) => team.team_member?.length > 0) || false,
    );
  }, [teamsData]);

  useEffect(() => {
    setLoading(isLoadingTeams);
  }, [isLoadingTeams, setLoading]);

  const TeamsSection = useCallback(
    ({ teams, onAddMentor, onDeleteMentor, onAddProductAttr }: TeamType) => {
      return (
        <Box gap={2}>
          {teams?.map((team) => (
            <TeamCard
              key={team.id}
              teamProducts={products
                .filter((p) => team.products.includes(p.id))
                .map((p) => p.title)}
              buttons={
                <>
                  <MenuDropdown
                    title="Gerenciar Mentores"
                    disabled={!myTeams || myTeams.length == 0}
                    icon={<School fontSize="small" fill="#FE7D22" />}
                    itens={[
                      {
                        label: addMentorText,
                        icon: <Add fontSize="small" fill="#FE7D22" />,
                        onClick: () =>
                          onAddMentor({ refId: team.id, open: true }),
                      },
                      {
                        label: deleteMentorText,
                        disabled: hasMentors,
                        icon: <DeleteForever fontSize="small" fill="#FE7D22" />,
                        onClick: () =>
                          onDeleteMentor({ refId: team.id, open: true }),
                      },
                    ]}
                  />
                  <MenuDropdown
                    title="Gerenciar Produtos"
                    disabled={!products || products.length == 0}
                    icon={<Airplay fontSize="small" fill="#FE7D22" />}
                    itens={[
                      {
                        label: 'Alterar Acessos',
                        icon: (
                          <SettingsSuggest fontSize="small" fill="#FE7D22" />
                        ),
                        onClick: () => onAddProductAttr({ team, open: true }),
                      },
                    ]}
                  />
                </>
              }
              title={team.title}
            >
              {team.team_member?.map((mentor) => (
                <MentorCard
                  id={mentor.profile.id}
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
    [addMentorText, deleteMentorText, hasMentors, myTeams, products],
  );

  const handleNewTeam = useCallback(
    async (title) => {
      await CreateTeam(title);
      await mutate();
    },
    [mutate],
  );

  const handleUpdateProducts = useCallback(
    async (formData) => {
      const mteam = myTeams.map((team) => {
        if (team.id == formData.team_id) {
          return {
            ...team,
            products: formData.products,
          };
        }
        return team;
      });
      await fnMutate(ApiRoutes.teams, AddProductAttr(formData), {
        optimisticData: {
          myTeams: mteam,
        },
      });
    },
    [fnMutate, myTeams],
  );

  const handleNewMentor = useCallback(
    async (formData) => {
      await AddMentor(formData);
      await mutate();
    },
    [mutate],
  );

  const handleAssignClients = useCallback(
    async (formData) => {
      await AssignClients(formData);
      await mutate();
    },
    [mutate],
  );

  const handleDeleteMentor = useCallback(
    async (formData) => {
      await DeleteMentor(formData);
      await mutate();
    },
    [mutate],
  );

  const handleDeleteTeam = useCallback(
    async (formData) => {
      await DeleteTeam(formData);
      await mutate([]);
    },
    [mutate],
  );

  const handleDeleteAttr = useCallback(
    async (formData) => {
      await DeleteAttr(formData);
      await mutate();
    },
    [mutate],
  );

  return (
    <>
      <ButtonsWrapper>
        <MenuDropdown
          title="Gerenciar Clientes"
          disabled={!myTeams || myTeams.length == 0}
          icon={<Group fontSize="small" fill="#FE7D22" />}
          itens={[
            {
              label: assignClientsText,
              icon: <Add fontSize="small" fill="#FE7D22" />,
              onClick: () => setOpenAssingClients(true),
            },
            {
              label: deAssignClientsText,
              icon: <DeleteForever fontSize="small" fill="#FE7D22" />,
              onClick: () => setDeleteAttr(true),
            },
          ]}
        />
      </ButtonsWrapper>

      {(!myTeams || myTeams.length == 0) && (
        <TipBar sx={{ marginTop: '1.5rem' }}>
          Você <span>ainda não criou nenhum time</span> para atribuir mentores à
          clientes. Para começar, crie um novo time.
        </TipBar>
      )}

      <TeamsSection
        teams={myTeams}
        onAddMentor={(values) => setOpenAddMentor(values)}
        onDeleteMentor={(values) => setDeleteMentor(values)}
        onAddProductAttr={(values) => setOpenProductAttr(values)}
      />
      <Box alignSelf="self-end" display="flex">
        <MenuDropdown
          title="Gerenciar Times"
          icon={<Widgets fontSize="small" fill="#FE7D22" />}
          itens={[
            {
              label: 'Criar Novo Time',
              icon: <Add fontSize="small" fill="#FE7D22" />,
              onClick: () => setOpenNewTeam(true),
            },
            {
              label: 'Remover Time',
              icon: <DeleteForever fontSize="small" fill="#FE7D22" />,
              onClick: () => setDeleteTeam(true),
              disabled: !myTeams || myTeams.length == 0,
            },
          ]}
        />
      </Box>
      <NewMentorModal
        onSubmit={(formData) => {
          handleNewMentor(formData);
        }}
        refData={openAddMentor.refId}
        open={openAddMentor.open}
        setOpen={(open) => setOpenAddMentor((old) => ({ ...old, open }))}
      />
      <DeleteMentorModal
        onSubmit={(formData) => handleDeleteMentor(formData)}
        refData={openDeleteMentor.refId}
        teams={myTeams}
        open={openDeleteMentor.open}
        setOpen={() => setDeleteMentor((old) => ({ ...old, open: false }))}
      />
      <AssignClientsModal
        open={openAssingClients}
        setOpen={(open) => setOpenAssingClients(false)}
        teams={myTeams}
        clients={clients}
        onSubmit={(formData) => {
          handleAssignClients(formData);
        }}
      />
      <DeleteAttrModal
        onSubmit={(formData) => handleDeleteAttr(formData)}
        teams={myTeams}
        open={openDeleteAttr}
        setOpen={() => setDeleteAttr(false)}
      />
      <NewTeamModal
        onSubmit={(values) => handleNewTeam(values)}
        open={openNewTeam}
        setOpen={setOpenNewTeam}
      />
      <DeleteTeamModal
        onSubmit={(formData) => handleDeleteTeam(formData)}
        teams={myTeams}
        open={openDeleteTeam}
        setOpen={setDeleteTeam}
      />
      <AssignProductsModal
        open={openProductAttr.open}
        setOpen={(open) =>
          setOpenProductAttr((old) => ({ open: false, team: null }))
        }
        team={openProductAttr.team}
        products={products}
        title={AssignProductsText}
        onSubmit={(formData) => {
          handleUpdateProducts(formData);
        }}
      />
    </>
  );
};

export default Teams;
