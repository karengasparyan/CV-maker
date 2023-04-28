import { Test, TestingModule } from '@nestjs/testing';
import { AddressesController } from './addresses.controller';
import {Response} from "express";
import {RequestType} from "../main.dto";

describe('AddressesController', () => {
  let controller: AddressesController;

  const requestMock = {
    body: {}
  } as unknown as RequestType;

  const statusResponseMock = {
    send: jest.fn(x => x)
  }

  const responseMock = {
    status: jest.fn(x => statusResponseMock),
    send: jest.fn(x => x)
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
    }).compile();

    controller = module.get<AddressesController>(AddressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('AddressesFunctions',() => {
    it('should return a status 422', () => {
      controller.create(requestMock, {
        address: '',
        city: '',
        country: '',
        zip: ''
      });
      expect(responseMock.status).toHaveBeenCalledWith(422);
    });
  })
});
