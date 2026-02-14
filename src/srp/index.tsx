import { useQuery } from "./hooks/useQuery";
import { fetchUsers } from "./services/user";

import UserList from "./components";
import Loading from "./components/UserLoading";
import UserErrors from "./components/UserErrors";
import EmptyData from "./components/UserEmptyData";

import "./styles/index.scss";

function SingleResponsiblePrinciple() {
  const { loading, data, errors } = useQuery(fetchUsers);

  return (
    <div className="srp">
      {loading && <Loading />}

      {!loading && errors.length > 0 && <UserErrors errors={errors} />}

      {!loading && errors.length === 0 && (!data || data.length === 0) && (
        <EmptyData />
      )}

      {!loading && data && data.length > 0 && (
        <UserList users={data} />
      )}
    </div>
  );
}

export default SingleResponsiblePrinciple;
