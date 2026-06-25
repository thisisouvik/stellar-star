import { validateExpenseFormFields } from "@/hooks/useExpenseForm";
import type { Member } from "@/types/expense";

describe("validateExpenseFormFields", () => {
  it("requires a title, valid amount, member names, and Stellar addresses", () => {
    const errors = validateExpenseFormFields({
      title: "",
      totalAmount: "0",
      members: [
        { id: "member-1", name: "", walletAddress: "" },
        { id: "member-2", name: "Ravi", walletAddress: "bad-address" },
      ],
    });

    expect(errors.title).toBe("Title is required.");
    expect(errors.totalAmount).toMatch(/valid XLM amount/);
    expect(errors.member_name_0).toBe("Name is required.");
    expect(errors.member_addr_0).toMatch(/required/);
    expect(errors.member_addr_1).toMatch(/Invalid Stellar address/);
  });

  it("passes when required fields are valid", () => {
    const errors = validateExpenseFormFields({
      title: "Dinner",
      totalAmount: "12.5",
      members: validMembers,
    });

    expect(errors).toEqual({});
  });
});

const validMembers: Member[] = [
  { id: "member-1", name: "Asha", walletAddress: "G".padEnd(56, "A") },
  { id: "member-2", name: "Ravi", walletAddress: "G".padEnd(56, "B") },
];
