import { Test, TestingModule } from '@nestjs/testing';
import { UserCvsService } from './user_cvs.service';

describe('UserCvsService', () => {
  let service: UserCvsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCvsService],
    }).compile();

    service = module.get<UserCvsService>(UserCvsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
