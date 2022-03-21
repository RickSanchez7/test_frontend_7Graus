import React, { useState } from 'react';
import { FetchedUsers, Users } from '../interfaces/users';

export const useFetchUsers = (url: string) => {
  const [users, setUsers] = useState<Users[] | []>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    setError('');
    setTimeout(async () => {
      try {
        const response = await fetch(url);

        const json = await response.json();

        const results = json.results.map((user: FetchedUsers) => {
          return {
            name: user.name,
            picture: user.picture,
            id: user.login.uuid,
          };
        });

        setUsers((prev: Users[]) => [...prev, ...results]);
      } catch (err) {
        console.error(err);
        setError('Something went wrong, try again please.');
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return { users, error, loading, fetchUsers };
};
