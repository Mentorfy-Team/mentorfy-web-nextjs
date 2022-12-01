import React from 'react';

import { MentorsWrapper, TeamTitle, TeamWrapper } from './styles';

const TeamCard = ({ title, children }) => {
  return (
    <>
      <TeamWrapper>
        <TeamTitle>{title}</TeamTitle>

        <MentorsWrapper>{children}</MentorsWrapper>
      </TeamWrapper>
    </>
  );
};

export default TeamCard;
