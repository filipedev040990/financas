# Calcular o status de uma conta

> ## Caso de sucesso

1. ✅ Se um id de conta paga/recebida for fornecido,lança uma excessão se não encontrar uma conta com o id fornecido
2. ✅ Atribui os dados dessa conta à propriedade bill
3. ✅ Calcula e retorna o status da conta


## Calculo de status da conta
✅ Open
  ✅ Se não possui registro de pagamento/recebimento e/ou a data de vencimento é menor ou igual a data atual

✅ Paid
  ✅ Se possui registro de pagamento/recebimento e o valor é maior ou igual ao valor da conta ou se o valor for menor ao valor da conta mas possui desconto

✅ Parcial paid/received
  ✅ Se possui registro de pagamento/recebimento e o valor é menor ao valor da conta e não possui desconto

✅ Overdue
  ✅ Se não possui registro de pagamento/recebimento e a data de vencimento é menor que a data atual


> ## Exceções

✅
⛔