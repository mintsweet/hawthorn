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
  avatar: {
    type: 'string',
    required: false,
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
  avatar: {
    type: 'string',
    required: false,
  },
};
