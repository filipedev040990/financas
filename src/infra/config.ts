export = {
  payment: {
    types: ['pay', 'receive'],
    methods: ['money', 'credit_card', 'debit_card', 'billet'],
    ocurrences: ['daily', 'weekly', 'bimonthly', 'quarterly', 'semiannual', 'annual'],
    status: {
      open: 'open',
      paid: 'paid',
      parcialPaid: 'parcialPaid',
      overdue: 'overdue'
    }
  }
}
