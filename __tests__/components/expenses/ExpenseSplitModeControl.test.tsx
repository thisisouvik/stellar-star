/**
 * @jest-environment jsdom
 */

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ExpenseSplitModeControl } from "@/components/expenses/ExpenseSplitModeControl";

describe("ExpenseSplitModeControl", () => {
  it("notifies when the user selects custom split mode", () => {
    const onChange = jest.fn();
    render(<ExpenseSplitModeControl value="equal" onChange={onChange} />);

    fireEvent.click(screen.getByRole("button", { name: "custom" }));

    expect(onChange).toHaveBeenCalledWith("custom");
  });
});
