import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectSqlModel} from "../../database/inject-model-sql";
import {certificates} from "./certificates.model";
import messages from "../../utils/messages";

@Injectable()
export class CertificatesService {
  constructor(
    @InjectSqlModel(certificates) private Certificates: typeof certificates
  ) {}

  async create(id, data) {
    data.user_id = id;
    return this.Certificates.create(data);
  }
  async getById(user_id, id) {
    const data = await this.Certificates.findOne({where: {user_id, id}});
    if (!data) throw new HttpException(messages.CERTIFICATE_NOT_FOUND, HttpStatus.NOT_FOUND)
    return data;
  }
  async getList(user_id) {
    return this.Certificates.findAll({where: {user_id}});
  }

  async update(user_id, id, dataUpdate) {
    await this.Certificates.update(dataUpdate,{where: {user_id, id}});
    return this.getById(user_id, id);
  }
  async destroy(user_id, id) {
    const data = await this.getById(user_id, id);
    if (!data) throw new HttpException(messages.CERTIFICATE_NOT_FOUND, HttpStatus.NOT_FOUND)
    await this.Certificates.destroy({where: {user_id, id}});
    return data;
  }
}
