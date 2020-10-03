import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

describe('ClientController', () => {
  let controller: ClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
    }).compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
