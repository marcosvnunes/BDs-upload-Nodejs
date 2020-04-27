import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TrasactionRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const trasactionRepository = getCustomRepository(TrasactionRepository);

    const { total } = await trasactionRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('you do not have enough balance');
    }

    const categoryRepository = getRepository(Category);

    let transactionsCategory = await categoryRepository.findOne({
      where: {
        title: category,
      },
    });

    if (!transactionsCategory) {
      transactionsCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(transactionsCategory);
    }

    const transaction = trasactionRepository.create({
      title,
      value,
      type,
      category: transactionsCategory,
    });

    await trasactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
