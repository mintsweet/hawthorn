export const createRule = {
  name: {
    type: 'string',
    required: true,
  },
  remark: {
    type: 'string',
  },
  permissions: {
    type: 'array',
  },
};

export const updateRule = {
  remark: {
    type: 'string',
  },
  permissions: {
    type: 'array',
  },
};
