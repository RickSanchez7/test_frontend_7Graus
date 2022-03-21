export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  id: string;
}

export interface FetchedUser extends User {
  login: {
    uuid: string;
  };
}
