import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectSqlModel} from "src/database/inject-model-sql";
import {skills} from "./skills.model";
import messages from "../../utils/messages";

@Injectable()
export class SkillsService {
  constructor(
    @InjectSqlModel(skills) private Skills: typeof skills
  ) {}
  async create(id, data) {
    data.user_id = id;
    return this.Skills.create(data);
  }
  async getById(user_id, id) {
    const data = await this.Skills.findOne({where: {user_id, id}});
    if (!data) throw new HttpException(messages.SKILL_NOT_FOUND, HttpStatus.NOT_FOUND)
    return data;
  }
  async getList(user_id) {
    return this.Skills.findAll({where: {user_id}});
  }

  async update(user_id, id, dataUpdate) {
    await this.Skills.update(dataUpdate,{where: {user_id, id}});
    return this.getById(user_id, id);
  }
  
  async destroy(user_id, id) {
    const data = await this.getById(user_id, id);
    await this.Skills.destroy({where: {user_id, id}});
    return data;
  }
}
