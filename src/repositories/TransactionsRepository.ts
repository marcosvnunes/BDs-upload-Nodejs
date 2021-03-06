import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    const income = transactions.reduce((sum, current) => {
      if (current.type === 'income') return sum + Number(current.value);
      return sum;
    }, 0);

    const outcome = transactions.reduce((acumulated, current) => {
      if (current.type === 'outcome') return acumulated + Number(current.value);
      return acumulated;
    }, 0);

    const total = income - outcome;
    return {
      income,
      outcome,
      total,
    };
  }
}

export default TransactionsRepository;
