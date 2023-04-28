const response = {
  status: {
    type: "string"
  }
,
  message: {
    type: "string"
  }
}
const xAuthorization = {
  name: 'x-authorization',
  description: 'Authorization (if Google oAuth token is not needed)',
  required: false
}

const emptyResponse = (description: string) => ({
  description: description,
  schema: {
    properties: {
      ...response,
    }
  }
});

export {
  response,
  emptyResponse,
  xAuthorization,
}