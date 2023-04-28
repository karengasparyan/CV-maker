import {response} from "../main.swagger";
const createEducationBody = {
  description: "Education body",
  schema: {
    properties: {
      title: {
        type: "string"
      } ,
      start_date: {
        type: "string"
      },
      end_date: {
        type: "string"
      }
    }
  }
};

const createEducationResponse = {
  description: "Education response",
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
          title: {
            type: "string"
          } ,
          start_date: {
            type: "string"
          },
          end_date: {
            type: "string"
          }
        }
      }
    }
  }
};

const getEducationResponse = {
  description: "Education response",
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
            title: {
              type: "string"
            } ,
            start_date: {
              type: "string"
            },
            end_date: {
              type: "string"
            }
          },
        }
      }
    }
  }
};

export {
  createEducationBody,
  createEducationResponse,
  getEducationResponse
}