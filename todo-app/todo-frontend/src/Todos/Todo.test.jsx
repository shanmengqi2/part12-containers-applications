import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Todo from './Todo'

describe('Todo Component', () => {
  const mockDeleteTodo = vi.fn()
  const mockCompleteTodo = vi.fn()

  it('renders todo text correctly', () => {
    const todo = { _id: '1', text: 'Test todo', done: false }
    render(<Todo todo={todo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />)

    expect(screen.getByText('Test todo')).toBeDefined()
  })

  it('shows "not done" status for incomplete todo', () => {
    const todo = { _id: '1', text: 'Test todo', done: false }
    render(<Todo todo={todo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />)

    expect(screen.getByText('This todo is not done')).toBeDefined()
  })

  it('shows "done" status for completed todo', () => {
    const todo = { _id: '1', text: 'Test todo', done: true }
    render(<Todo todo={todo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />)

    expect(screen.getByText('This todo is done')).toBeDefined()
  })

  it('shows "Set as done" button for incomplete todo', () => {
    const todo = { _id: '1', text: 'Test todo', done: false }
    render(<Todo todo={todo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />)

    expect(screen.getByText('Set as done')).toBeDefined()
  })

  it('does not show "Set as done" button for completed todo', () => {
    const todo = { _id: '1', text: 'Test todo', done: true }
    render(<Todo todo={todo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />)

    expect(screen.queryByText('Set as done')).toBeNull()
  })

  it('calls deleteTodo when Delete button is clicked', () => {
    const todo = { _id: '1', text: 'Test todo', done: false }
    render(<Todo todo={todo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />)

    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)

    expect(mockDeleteTodo).toHaveBeenCalledWith(todo)
  })

  it('calls completeTodo when Set as done button is clicked', () => {
    const todo = { _id: '1', text: 'Test todo', done: false }
    render(<Todo todo={todo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />)

    const completeButton = screen.getByText('Set as done')
    fireEvent.click(completeButton)

    expect(mockCompleteTodo).toHaveBeenCalledWith(todo)
  })
})
