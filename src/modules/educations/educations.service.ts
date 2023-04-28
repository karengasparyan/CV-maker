import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectSqlModel} from "../../database/inject-model-sql";
import {educations} from "./educations.model";
import messages from "../../utils/messages";

@Injectable()
export class EducationsService {
  constructor(
    @InjectSqlModel(educations) private Educations: typeof educations
  ) {}

  async create(id, data) {
    data.user_id = id;
    return this.Educations.create(data);
  }
  async getById(user_id, id) {
    const data = await this.Educations.findOne({where: {user_id, id}});
    if (!data) throw new HttpException(messages.EDUCTION_NOT_FOUND, HttpStatus.NOT_FOUND)
    return data;
  }
  async getList(user_id) {
    return this.Educations.findAll({where: {user_id}});
  }

  async update(user_id, id, dataUpdate) {
    await this.Educations.update(dataUpdate,{where: {user_id, id}});
    return this.getById(user_id, id);
  }
  async destroy(user_id, id) {
    const data = await this.getById(user_id, id);
    if (!data) throw new HttpException(messages.EDUCTION_NOT_FOUND, HttpStatus.NOT_FOUND)
    await this.Educations.destroy({where: {user_id, id}});
    return data;
  }
}
