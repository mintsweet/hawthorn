export const createRule = {
  name: {
    type: 'string',
    required: true,
  },
  remark: {
    type: 'string',
    required: false,
  },
  permissions: {
    type: 'array',
    required: true,
  },
};

export const updateRule = {
  remark: {
    type: 'string',
    required: false,
  },
  permissions: {
    type: 'array',
    required: false,
  },
};
