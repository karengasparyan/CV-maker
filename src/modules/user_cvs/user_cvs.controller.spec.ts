import { Test, TestingModule } from '@nestjs/testing';
import { UserCvsController } from './user_cvs.controller';

describe('UserCvsController', () => {
  let controller: UserCvsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCvsController],
    }).compile();

    controller = module.get<UserCvsController>(UserCvsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
