export const loginRule = {
  username: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
};

export const updateUserInfoRule = {
  nickname: {
    type: 'string',
    required: false,
  },
};
