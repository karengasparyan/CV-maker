import {response} from "../main.swagger";

const createPlanBody = {
  schema: {
    properties: {
      name: {
        type: "string"
      },
      number: {
        type: "number"
      },
      disabled: {
        type: "boolean",
        require: "false"
      },
      price: {
        type: "number"
      },
    }
  }
};

const createPlanResponse = {
  description: "Plan response",
  schema: {
    properties: {
      ...response,
      data: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          name: {
            type: "string"
          },
          number: {
            type: "number"
          },
          disabled: {
            type: "boolean",
          },
          price: {
            type: "number"
          },
          product_id: {
            type: "string",
          },
          price_id: {
            type: "string",
          }
        },
      }
    }
  }
};

const getPlanResponse = {
  description: "Plan response",
  schema: {
    properties: {
      ...response,
      data: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string"
            },
            name: {
              type: "string"
            },
            number: {
              type: "number"
            },
            disabled: {
              type: "boolean",
            },
            price: {
              type: "number"
            },
            product_id: {
              type: "string",
            },
            price_id: {
              type: "string",
            }
          },
        }
      }
    }
  }
};

const connectPlanResponse = {
  description: "Connect plan response",
  schema: {
    properties: {
      ...response,
      data: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          name: {
            type: "string"
          },
          number: {
            type: "string"
          },
          disabled: {
            type: "string"
          },
          price: {
            type: "string"
          },
          product_id: {
            type: "string",
          },
          price_id: {
            type: "string"
          }
        },
      }
    }
  }
};

const subscribeResponse = {
  description: "Plan subscribe response by payment method id",
  schema: {
    properties: {
      ...response,
      data: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          plan_id: {
            type: "string"
          },
          sub_id: {
            type: "string"
          },
          pm_id: {
            type: "string",
          }
        },
      }
    }
  }
};

const subscribeBody = {
  schema: {
    properties: {
      id: {
        type: "string"
      }
    }
  }
};
const subscribeToggleBody = {
  schema: {
    properties: {
      cancel_at: {
        type: "boolean"
      }
    }
  }
};

export {
  createPlanBody,
  createPlanResponse,
  getPlanResponse,
  connectPlanResponse,
  subscribeResponse,
  subscribeBody,
  subscribeToggleBody
}