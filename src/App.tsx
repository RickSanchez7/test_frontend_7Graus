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
    <div className="container">
      {users.length > 0 &&
        users.map((user: Users, i: number) => (
          <div key={user.id} className="user-container">
            <h2 className="user-name" data-testid={`test-${i}`}>
              {user.name.title} {user.name.first} {user.name.last}
            </h2>
            <img src={user.picture.thumbnail} alt={user.name.first} />
          </div>
        ))}
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <button type="button" className="btn" onClick={fetchMoreUsers}>
        fetch more
      </button>
    </div>
  );
}

export default App;
