import React, { useCallback } from 'react';
import Image from 'next/image';
import {
  ActiveClients,
  ClientsNumber,
  Mentor,
  MentorEmail,
  MentorInfo,
  MentorName,
} from './styles';
import { useRouter } from 'next/router';

const MentorCard = ({ name, email, activeClients, avatar, id }) => {
  const route = useRouter();
  const handleGoToProfile = useCallback(() => {
    route.push(route.asPath + '/perfil?altId=' + id);
  }, [id, route]);

  return (
    <Mentor onClick={() => handleGoToProfile()}>
      <Image
        alt="imagem-do-mentor"
        src={avatar || '/images/avatar.png'}
        width={120}
        height={120}
        style={{
          borderRadius: '50%',
          padding: '0.8rem',
        }}
      />
      <MentorInfo>
        <MentorName>{name}</MentorName>
        <MentorEmail>{email}</MentorEmail>
        <ActiveClients>Clientes Ativos</ActiveClients>
        <ClientsNumber>{activeClients}</ClientsNumber>
      </MentorInfo>
    </Mentor>
  );
};

export default MentorCard;
