import { response } from '../main.swagger';

const createCvResponse = {
  description: 'Create User Cv response',
  schema: {
    properties: {
      ...response,
      data: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          user_id: {
            type: 'string',
          },
        },
      },
    },
  },
};

const getCvResponse = {
  description: 'Get CVs response',
  schema: {
    properties: {
      ...response,
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            user_id: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};

export { createCvResponse, getCvResponse };
