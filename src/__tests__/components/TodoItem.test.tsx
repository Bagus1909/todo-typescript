import { it, expect, describe, vi, beforeEach } from "vitest";
import { queryByDisplayValue, render, screen } from "@testing-library/react";
import TodoItem from "../../components/TodoItem";
import { Todo } from "../../types/components";
import userEvent from "@testing-library/user-event";

describe("Todo Item", () => {
  const mockTodo: Todo = {
    id: 1,
    title: "Test Todo",
  };

  const mockSetTodos = vi.fn();

  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render list of todos", () => {
    render(
      <TodoItem
        todos={mockTodo}
        setTodos={mockSetTodos}
      />
    );

    const list = screen.getByText("Test Todo");
    expect(list).toBeInTheDocument();
  });

  it("shows Edit and Delete buttons initially", () => {
    render(
      <TodoItem
        todos={mockTodo}
        setTodos={mockSetTodos}
      />
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it("should switch to edit mode while edit button clicked", async () => {
    const user = userEvent.setup();
    render(
      <TodoItem
        todos={mockTodo}
        setTodos={mockSetTodos}
      />
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    await user.click(editButton);

    const inputElement = screen.getByDisplayValue("Test Todo");
    const updateButton = screen.getByRole("button", { name: /update/i });

    expect(inputElement).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
  });

  it("should exit edit mode when Update button is clicked", async () => {
    render(
      <TodoItem
        todos={mockTodo}
        setTodos={mockSetTodos}
      />
    );

    // Enter edit mode
    const editButton = screen.getByRole("button", { name: /edit/i });
    await user.click(editButton);

    // Click update
    const updateButton = screen.getByText("Update");
    await user.click(updateButton);

    expect(editButton).toBeInTheDocument();
  });
});
