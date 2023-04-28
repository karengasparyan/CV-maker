import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectSqlModel} from 'src/database/inject-model-sql';
import {user_cvs} from './user_cvs.model';
import {Op} from "sequelize";
import messages from "../../utils/messages";

@Injectable()
export class UserCvsService {
  constructor(
    @InjectSqlModel(user_cvs) private UserCvs: typeof user_cvs
  ) {
  }

  async create(id) {
    return this.UserCvs.create({user_id: id});
  }

  async getById(user_id, id) {
    const data = await this.UserCvs.findOne({where: {user_id, id}});
    if (!data) throw new HttpException(messages.CV_NOT_FOUND, HttpStatus.NOT_FOUND)
    return data;
  }

  async getList(user_id) {
    return this.UserCvs.findAll({where: {user_id}});
  }

  async update(user_id, id, dataUpdate) {
    await this.UserCvs.update(dataUpdate, {where: {user_id, id}});
    return this.getById(user_id, id);
  }

  async destroy(user_id, id) {
    const data = await this.getById(user_id, id);
    await this.UserCvs.destroy({where: {user_id, id}});
    return data;
  }

  async getBetween(id, start?, end?) {
    let where = {};
    if (start && end) {
      where = {
        where: {
          created_at: {
            [Op.between]: [start, end]
          }
        }
      };
    }
    return this.UserCvs.findAll(where);
  }
}
