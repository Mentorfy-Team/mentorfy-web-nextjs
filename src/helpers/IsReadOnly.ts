import { isExpired } from './IsExpired';

const isReadOnly = (accesses: UserTypes.AccessType[]) => {
  const isMentor = accesses.find(
    (x) => !isExpired(x.expiration_date) && x.type === 'mentor',
  );
  const isTeam = accesses.find(
    (x) => !isExpired(x.expiration_date) && x.type === 'team',
  );

  if (isMentor) {
    return false;
  }
  if (isTeam) {
    return false;
  }

  return true;
};

export default isReadOnly;
