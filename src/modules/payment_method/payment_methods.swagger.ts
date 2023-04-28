import { response } from '../main.swagger';

const getPaymentMethodBody = {
    description: "Payment method body",
    schema: {
      properties: {
        id: {
          type: "string"
        }
      }
    }
}

const createPaymentMethodResponse = {
  description: 'Create Payment method response',
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
          pm_id: {
            type: 'string',
          },
          exp_month: {
            type: 'number',
          },
          exp_year: {
            type: 'number',
          },
        },
      },
    },
  },
};

const getPaymentMethodResponse = {
  description: 'Create Payment method response',
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
            pm_id: {
              type: 'string',
            },
            exp_month: {
              type: 'number',
            },
            exp_year: {
              type: 'number',
            },
          },
        },
      },
    },
  },
};

export {
  getPaymentMethodBody,
  createPaymentMethodResponse,
  getPaymentMethodResponse,
};
