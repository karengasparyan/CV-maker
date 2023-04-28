import {response} from "../main.swagger";

const createSkillBody = {
  schema: {
    properties: {
      skill: {
        type: "string"
      }
    }
  }
};

const createSkillResponse = {
  description: "Skill response",
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
          skill: {
            type: "string"
          }
        },
      }
    }
  }
};

const getSkillResponse = {
  description: "Skill response",
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
            skill: {
              type: "string"
            }
          },
        }
      }
    }
  }
};

export {
  createSkillBody,
  createSkillResponse,
  getSkillResponse,
}