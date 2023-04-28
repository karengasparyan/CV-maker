import {response} from "../main.swagger";

const createAddressBody = {
  schema: {
    properties: {
      address: {
        type: "string"
      },
      city: {
        type: "string"
      },
      country: {
        type: "string"
      },
      zip: {
        type: "string"
      }
    }
  }
};

const createAddressResponse = {
  description: "Address response",
  schema: {
    properties: {
      ...response,
      data: {
        type: "object",
        properties: {
          id: {
            type: "string"
          },
          user_id: {
            type: "string"
          },
          address: {
            type: "string"
          },
          city: {
            type: "string"
          },
          country: {
            type: "string"
          },
          zip: {
            type: "string"
          }
        },
      }
    }
  }
};



const getAddressesResponse = {
  description: "Get addresses",
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
            user_id: {
              type: "string"
            },
            address: {
              type: "string"
            },
            city: {
              type: "string"
            },
            country: {
              type: "string"
            },
            zip: {
              type: "string"
            }
          }
        }
      }
    }
  }
};

export {
  createAddressBody,
  createAddressResponse,
  getAddressesResponse,
}