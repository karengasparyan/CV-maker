export default class HttpError extends Error {
  status: number;
  messagesGroup: object;

  constructor(props: { status: number, message: string, messagesGroup?: object }) {
    super()
    const {status, message, messagesGroup} = props;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError)
    }
    this.status = status;
    this.message = message;
    this.messagesGroup = messagesGroup;
    this.name = 'Http error';
  }
}