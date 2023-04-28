import * as bcrypt from 'bcrypt'
import * as _ from "lodash";
import * as fs from "fs";
import * as path from "path";
import * as sharp from "sharp";
import * as ejs from "ejs";
import {HttpException, HttpStatus, UnprocessableEntityException} from "@nestjs/common";
import {AVATAR_IMAGE, IMAGE_MIME_TYPES} from "./constanst";
import {File, returnResponse} from "../modules/main.dto";
import {ValidationError} from "class-validator";
import messages from "./messages";
const {BASE_URL} = process.env;

const hashPassword = async (password: string) => await bcrypt.hash(password, 11);

const checkPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash)
}

const validateImage = (file) => {
  if (_.isEmpty(file)) throw new HttpException(messages.AVATAR_IS_MANDATORY, HttpStatus.UNPROCESSABLE_ENTITY);
  const extension = IMAGE_MIME_TYPES[file.mimetype];
  if (!extension) throw new HttpException(messages.IMAGE_TYPE_ERROR, HttpStatus.UNPROCESSABLE_ENTITY);
  return extension;
}
const writeImage = async (fileName: string, file: File) => {
  validateImage(file);
  const direction = path.resolve('public', AVATAR_IMAGE.folderName);
  if (!fs.existsSync(direction)) {
    fs.mkdirSync(direction, {recursive: true});
  }
  const writeDirection = path.join(direction, fileName) + AVATAR_IMAGE.extension;
  const image = path.join(AVATAR_IMAGE.folderName, fileName) + AVATAR_IMAGE.extension;
  fs.writeFileSync(writeDirection,file.buffer);
  await sharp(file.buffer)
    .resize(AVATAR_IMAGE.width, AVATAR_IMAGE.height)
    .toFormat(AVATAR_IMAGE.format)
    .toFile(writeDirection);
  return {image};
}

const buildErrorObject = (errors: ValidationError[]) => {
  const messagesGroup = {};
  errors.forEach(e => messagesGroup[e.property] = Object.values(e.constraints)[0]);
  return new UnprocessableEntityException({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Validation error',
    messagesGroup
  })
}

const renderHtmlFile = async (direction, options) => {
  return ejs.renderFile(direction, options);
}

const response = (params: returnResponse) => ({
  status: params?.status || HttpStatus.OK,
  ...params
});

const catchError = (e) => ({
  status: e.status || e.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
  message: e?.message,
  messagesGroup: e?.messagesGroup
})

const options = (email: string, token: string) => ({
  email,
  verification_url: `${BASE_URL}/user/email-verify/${token}`,
  facebook: 'https://imgur.com/pvqGGJp.png',
  instagram: 'https://imgur.com/U1rrvPD.png',
  twitter: 'https://imgur.com/dlxlYE5.png',
  verify: 'https://imgur.com/cEWqKLp.png'
})

export {
  hashPassword,
  checkPassword,
  writeImage,
  buildErrorObject,
  renderHtmlFile,
  response,
  catchError,
  options
}
