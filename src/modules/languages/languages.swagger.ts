import {response} from "../main.swagger";

const createLanguageBody = {
  schema: {
    properties: {
      language: {
        type: "string"
      } ,
      level: {
        type: "string"
      }
    }
  }
};

const createLanguageResponse = {
  description: "Language response",
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
          language: {
            type: "string"
          },
          level: {
            type: "string"
          }
        },
      }
    }
  }
};

const getLanguageResponse = {
  description: "Languages response",
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
            language: {
              type: "string"
            },
            level: {
              type: "string"
            }
          },
        }
      }
    }
  }
};

export {
  createLanguageBody,
  createLanguageResponse,
  getLanguageResponse
}