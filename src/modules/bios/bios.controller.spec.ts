import { Test, TestingModule } from '@nestjs/testing';
import { BiosController } from './bios.controller';

describe('BiosController', () => {
  let controller: BiosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BiosController],
    }).compile();

    controller = module.get<BiosController>(BiosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
