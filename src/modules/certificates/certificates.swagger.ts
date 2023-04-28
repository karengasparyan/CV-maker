import {response} from "../main.swagger";

const createCertificateBody = {
  description: "Certificate body",
  schema: {
    properties: {
      name: {
        type: "string"
      } ,
      url: {
        type: "string"
      },
      expaire_date: {
        type: "string"
      }
    }
  }
};

const createCertificateResponse = {
  description: "Certificate response",
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
          name: {
            type: "string"
          } ,
          url: {
            type: "string"
          },
          expaire_date: {
            type: "string"
          }
        }
      }
    }
  }
};

const getCertificateResponse = {
  description: "Certificates response",
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
            name: {
              type: "string"
            } ,
            url: {
              type: "string"
            },
            expaire_date: {
              type: "string"
            }
          },
        }
      }
    }
  }
};

export {
  createCertificateBody,
  createCertificateResponse,
  getCertificateResponse
}