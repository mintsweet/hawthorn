export const createRule = {
  username: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  nickname: {
    type: 'string',
    required: true,
  },
  role: {
    type: 'string',
    required: true,
  },
};

export const updateRule = {
  password: {
    type: 'string',
    required: false,
  },
  nickname: {
    type: 'string',
    required: false,
  },
  role: {
    type: 'string',
    required: false,
  },
};
