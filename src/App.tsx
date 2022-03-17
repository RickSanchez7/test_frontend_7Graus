import React, { useEffect } from 'react';
import './App.css';
import { Users } from './interfaces/users';
import { useFetchUsers } from './useHooks/useFetchUsers';

function App() {
  const { users, loading, error, fetchUsers } = useFetchUsers(
    'https://randomuser.me/api/?results=10'
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchMoreUsers = () => {
    fetchUsers();
  };

  return (
    <div>
      {users.length > 0 &&
        users.map((user: Users, i: number) => (
          <div key={user.id}>
            <h1 data-testid={`test-${i}`}>
              {user.name.title} {user.name.first} {user.name.last}
            </h1>
            <img src={user.picture.thumbnail} alt={user.name.first} />
          </div>
        ))}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <button type="button" onClick={fetchMoreUsers}>
        fetch more
      </button>
    </div>
  );
}

export default App;
