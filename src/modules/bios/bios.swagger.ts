import {response} from "../main.swagger";

const createBioBody = {
  schema: {
    properties: {
      bio: {
        type: "string"
      }
    }
  }
};

const createBioResponse = {
  description: "Bios response",
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
          bio: {
            type: "string"
          }
        },
      }
    }
  }
};

const getBioResponse = {
  description: "Bios response",
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
            bio: {
              type: "string"
            }
          },
        }
      }
    }
  }
};

export {
  createBioBody,
  createBioResponse,
  getBioResponse
}