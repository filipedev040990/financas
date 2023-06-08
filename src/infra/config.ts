export = {
  payment: {
    types: ['pay', 'receive'],
    methods: ['money', 'credit_card', 'debit_card', 'billet'],
    ocurrences: ['daily', 'weekly', 'bimonthly', 'quarterly', 'semiannual', 'annual'],
    status: {
      open: 'open',
      totalPaid: 'totalPaid',
      parcialPaid: 'parcialPaid',
      expired: 'expired',
      reversed: 'reversed'
    }
  },
  jwt: {
    secretkey: 'b39311c63373f445534e3e8677f8d4c3',
    expiresInMs: 24 * 60 * 60
  },
  bcrypt: {
    salt: 12
  }
}
