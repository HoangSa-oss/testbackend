import { Test, TestingModule } from '@nestjs/testing';
import { TransactionHookService } from './transaction-hook.service';

describe('TransactionHookService', () => {
  let service: TransactionHookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionHookService],
    }).compile();

    service = module.get<TransactionHookService>(TransactionHookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
