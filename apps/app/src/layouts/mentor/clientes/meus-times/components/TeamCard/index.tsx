import Tooltip from '@mui/material/Tooltip';
import React from 'react';

import { MentorsWrapper, TeamTitle, TeamWrapper } from './styles';

const TeamCard = ({ title, buttons = null, teamProducts = [], children }) => {
  return (
    <>
      <TeamWrapper>
        <TeamTitle>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '70%',
            }}
          >
            {title}
            <div
              style={{
                position: 'relative',
              }}
            >
              {teamProducts?.length > 0 && (
                <span
                  style={{
                    width: '100%',
                    top: '5px',
                    position: 'absolute',
                    color: '#99A7F5',
                    fontSize: '0.8rem',
                    fontWeight: '300',
                    marginTop: '0.2rem',
                    // max 30 characters
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {teamProducts.slice(0, 1).join(', ')}
                  <Tooltip
                    title={teamProducts
                      .slice(1, teamProducts.length)
                      .join(', ')}
                  >
                    <span
                      style={{
                        backgroundColor: '#5F6EC3',
                        color: '#fff',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        marginTop: '0.2rem',
                        borderRadius: '25%',
                        marginLeft: '0.5rem',
                        width: '54px',
                        padding: '3px 4px',
                      }}
                    >
                      +{teamProducts.length - 1}
                    </span>
                  </Tooltip>
                </span>
              )}
            </div>
          </div>
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
