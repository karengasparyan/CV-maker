import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectSqlModel } from 'src/database/inject-model-sql';
import { phone_numbers } from './phone_numbers.model';
import messages from "../../utils/messages";

@Injectable()
export class PhoneNumbersService {
  constructor(
    @InjectSqlModel(phone_numbers) private PhoneNumbers: typeof phone_numbers,
  ) {}

  async create(id, data) {
    data.user_id = id;
    return this.PhoneNumbers.create(data);
  }

  async getList(user_id) {
    return this.PhoneNumbers.findAll({ where: { user_id } });
  }

  async getById(user_id, id) {
    const data = await this.PhoneNumbers.findOne({ where: { user_id, id } });
    if (!data) throw new HttpException(messages.PHONE_NUMBER_NOT_FOUND, HttpStatus.NOT_FOUND);
    return data;
  }

  async update(user_id, id, dataUpdate) {
    await this.PhoneNumbers.update(dataUpdate, { where: { user_id, id } });
    return this.getById(user_id, id);
  }

  async destroy(user_id, id) {
    const data = await this.getById(user_id, id);
    await this.PhoneNumbers.destroy({ where: { user_id, id } });
    return data;
  }
}
