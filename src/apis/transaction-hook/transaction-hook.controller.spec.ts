import { Test, TestingModule } from '@nestjs/testing';
import { TransactionHookController } from './transaction-hook.controller';
import { TransactionHookService } from './transaction-hook.service';

describe('TransactionHookController', () => {
  let controller: TransactionHookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionHookController],
      providers: [TransactionHookService],
    }).compile();

    controller = module.get<TransactionHookController>(TransactionHookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
