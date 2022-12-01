import React from 'react';
import Image from 'next/image';
import {
  ActiveClients,
  ClientsNumber,
  Mentor,
  MentorEmail,
  MentorInfo,
  MentorName,
} from './styles';

const MentorCard = ({ name, email, activeClients, avatar }) => {
  return (
    <Mentor>
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
        <MentorEmail>
          {email}
          {email}
        </MentorEmail>
        <ActiveClients>Clientes Ativos</ActiveClients>
        <ClientsNumber>{activeClients}</ClientsNumber>
      </MentorInfo>
    </Mentor>
  );
};

export default MentorCard;
