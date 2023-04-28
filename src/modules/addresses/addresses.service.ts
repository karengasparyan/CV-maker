import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectSqlModel} from "../../database/inject-model-sql";
import {addresses} from "./addresses.model";
import messages from "../../utils/messages";

@Injectable()
export class AddressesService {
  constructor(
    @InjectSqlModel(addresses) private Addresses: typeof addresses
  ) {}
  async create(id, data) {
    data.user_id = id;
    return this.Addresses.create(data);
  }
  async update(user_id, id, data) {
    await this.Addresses.update(data, {where: {user_id, id}});
    const res = this.getById(user_id, id);
    if (!res) throw new HttpException(messages.ADDRESS_NOT_FOUND, HttpStatus.NOT_FOUND);
    return res;
  }
  async getById(user_id, id) {
    const data = await this.Addresses.findOne({where: {user_id, id}});
    if (!data) throw new HttpException(messages.ADDRESS_NOT_FOUND, HttpStatus.NOT_FOUND)
    return data;
  }
  async getList(user_id) {
    return this.Addresses.findAll({where: {user_id}});
  }
  async destroy(user_id, id) {
    const data = await this.getById(user_id, id);
    if (!data) throw new HttpException(messages.ADDRESS_NOT_FOUND, HttpStatus.NOT_FOUND)
    await this.Addresses.destroy({where: {user_id, id}});
    return data;
  }
}
