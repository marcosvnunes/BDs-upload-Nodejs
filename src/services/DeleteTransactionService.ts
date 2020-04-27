import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);

    const transction = await transactionRepository.findOne(id);

    if (!transction) {
      throw new AppError('transaction do not exist');
    }

    await transactionRepository.remove(transction);
  }
}

export default DeleteTransactionService;
