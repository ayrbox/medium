const data = [
  { id: 1, name: 'Bob', email: 'bob@hotmail.com' },
  { id: 2, name: 'John Doe', email: 'john@hotmail.com' },
  { id: 3, name: 'Mary', email: 'mary@hotmail.com' },
  { id: 4, name: 'Cherry', email: 'cherry@hotmail.com' },
  { id: 5, name: 'Madalyn', email: 'madalyn@hotmail.com' },
];


const users = async () => {
  return data;
}

const user = async ({ id }) => {
  return data.find(u => u.id === id);
}


const addUser = async (newUser) => {
  const u = {
    ...newUser,
    id: data.length,
  };
  data.push(u);
  return data;
}

export {
  users,
  user,
  addUser,
};


