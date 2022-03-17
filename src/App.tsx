import React, { useEffect } from 'react';
import './App.css';
import { Users } from './interfaces/users';
import { useFetchUsers } from './useHooks/useFetchUsers';

function App() {
  const { users, loading, error, fetchUsers } = useFetchUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {users.map((user: Users) => (
        <div key={user.id}>
          <h1>
            {user.name.title} {user.name.first} {user.name.last}
          </h1>
          <img src={user.picture.thumbnail} alt={user.name.first} />
        </div>
      ))}
    </div>
  );
}

export default App;
