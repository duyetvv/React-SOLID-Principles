import { useGetUser } from './hooks/useGetUser';
import UserList from './user.list';
import Loading from './user.loading';
import UserErrors from './user.errors';
import EmptyData from './user.empty-data';

import './styles/index.scss';

function SingleResponsiblePrinciple() {
  const { loading, data, errors } = useGetUser();

  return (
    <div className="srp">
      {loading && <Loading />}

      {!loading && errors.length > 0 && <UserErrors errors={errors} />}

      {!loading && errors.length === 0 && data.length === 0 && <EmptyData />}

      {!loading && errors.length === 0 && data.length > 0 && (
        <UserList users={data} />
      )}
    </div>
  );
}

export default SingleResponsiblePrinciple;
