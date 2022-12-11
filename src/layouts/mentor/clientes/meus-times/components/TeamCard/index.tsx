import React from 'react';

import { MentorsWrapper, TeamTitle, TeamWrapper } from './styles';

const TeamCard = ({ title, buttons = null, children }) => {
  return (
    <>
      <TeamWrapper>
        <TeamTitle>
          {title}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
            }}
          >
            {buttons}
          </div>
        </TeamTitle>

        <MentorsWrapper>{children}</MentorsWrapper>
      </TeamWrapper>
    </>
  );
};

export default TeamCard;
