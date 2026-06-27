import { computeNetPayments, type RawDebt } from "@/lib/settlement/netBalance";

describe("computeNetPayments", () => {
  // ─── Basic single debt ─────────────────────────────────────────────────────

  it("produces one payment for a simple single debt", () => {
    const debts: RawDebt[] = [{ expenseId: "exp1", fromId: "u1", toId: "u2", from: "Alice", to: "Bob", amount: 100 }];
    const result = computeNetPayments(debts);
    expect(result).toHaveLength(1);
    expect(result[0].from).toBe("Alice");
    expect(result[0].to).toBe("Bob");
    expect(parseFloat(result[0].amount)).toBeCloseTo(100, 5);
    expect(result[0].settledDebts).toHaveLength(1);
    expect(result[0].settledDebts[0].expenseId).toBe("exp1");
  });

  // ─── Empty debts ──────────────────────────────────────────────────────────

  it("returns empty array when there are no debts", () => {
    expect(computeNetPayments([])).toHaveLength(0);
  });

  // ─── Netting ──────────────────────────────────────────────────────────────

  it("groups debts directionally without netting opposing balances", () => {
    // Alice owes Bob 100, Bob owes Alice 40 
    // They should stay as two separate payments to preserve exact share tracking
    const debts: RawDebt[] = [
      { expenseId: "exp1", fromId: "u1", toId: "u2", from: "Alice", to: "Bob", amount: 100 },
      { expenseId: "exp2", fromId: "u2", toId: "u1", from: "Bob",   to: "Alice", amount: 40 },
    ];
    const result = computeNetPayments(debts);
    expect(result).toHaveLength(2);
    
    const p1 = result.find(p => p.from === "Alice" && p.to === "Bob");
    expect(parseFloat(p1!.amount)).toBeCloseTo(100, 5);
    
    const p2 = result.find(p => p.from === "Bob" && p.to === "Alice");
    expect(parseFloat(p2!.amount)).toBeCloseTo(40, 5);
  });

  it("consolidates multiple debts in the same direction exactly", () => {
    const debts: RawDebt[] = [
      { expenseId: "exp1", fromId: "u1", toId: "u2", from: "Alice", to: "Bob", amount: 50 },
      { expenseId: "exp2", fromId: "u1", toId: "u2", from: "Alice", to: "Bob", amount: 50 },
    ];
    const result = computeNetPayments(debts);
    expect(result).toHaveLength(1);
    expect(parseFloat(result[0].amount)).toBeCloseTo(100, 5);
    expect(result[0].settledDebts).toHaveLength(2);
  });

  // ─── Three-person settlement ───────────────────────────────────────────────

  it("preserves chains without multi-hop optimization", () => {
    // A owes B 100, B owes C 100 
    // Does NOT simplify to A pays C. Stays A->B, B->C to preserve shares
    const debts: RawDebt[] = [
      { expenseId: "exp1", fromId: "u1", toId: "u2", from: "A", to: "B", amount: 100 },
      { expenseId: "exp2", fromId: "u2", toId: "u3", from: "B", to: "C", amount: 100 },
    ];
    const result = computeNetPayments(debts);
    expect(result).toHaveLength(2);
    
    expect(result[0].from).toBe("A");
    expect(result[0].to).toBe("B");
    
    expect(result[1].from).toBe("B");
    expect(result[1].to).toBe("C");
  });

  it("works with multiple creditors/debtors", () => {
    // Alice paid for everyone: Bob owes 30, Carol owes 70
    const debts: RawDebt[] = [
      { expenseId: "exp1", fromId: "u2", toId: "u1", from: "Bob",   to: "Alice", amount: 30 },
      { expenseId: "exp1", fromId: "u3", toId: "u1", from: "Carol", to: "Alice", amount: 70 },
    ];
    const result = computeNetPayments(debts);
    const total = result.reduce((s, p) => s + parseFloat(p.amount), 0);
    expect(total).toBeCloseTo(100, 5);
    result.forEach((p) => expect(p.to).toBe("Alice"));
  });
  
  it("differentiates duplicate names using fromId and toId", () => {
    const debts: RawDebt[] = [
      { expenseId: "exp1", fromId: "userA1", toId: "userB1", from: "John", to: "Jane", amount: 30 },
      { expenseId: "exp2", fromId: "userA2", toId: "userB1", from: "John", to: "Jane", amount: 70 },
    ];
    const result = computeNetPayments(debts);
    // Two different Johns paying Jane, should remain separate payments
    expect(result).toHaveLength(2);
    expect(result[0].from).toBe("John");
    expect(result[1].from).toBe("John");
  });

  // ─── Wallet passthrough ────────────────────────────────────────────────────

  it("propagates wallet addresses to the result", () => {
    const debts: RawDebt[] = [
      {
        expenseId: "exp1",
        fromId: "u1",
        toId: "u2",
        from:       "Alice",
        to:         "Bob",
        amount:     50,
        fromWallet: "GABC",
        toWallet:   "GXYZ",
      },
    ];
    const result = computeNetPayments(debts);
    expect(result[0].fromWallet).toBe("GABC");
    expect(result[0].toWallet).toBe("GXYZ");
  });

  // ─── Amount format ─────────────────────────────────────────────────────────

  it("amounts in the result are strings with 7 decimal places", () => {
    const debts: RawDebt[] = [{ expenseId: "exp1", fromId: "u1", toId: "u2", from: "A", to: "B", amount: 33.3333333 }];
    const result = computeNetPayments(debts);
    expect(result[0].amount).toMatch(/^\d+\.\d{7}$/);
  });
});
