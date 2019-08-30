export const createRule = {
  username: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
};

export const updateRule = {
  username: {
    type: 'string',
    required: false,
  },
};
