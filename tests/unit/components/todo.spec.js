import React from 'react';
import { spy } from 'sinon';
import { $render } from '../../helpers/rendering.js';
import { createSpy } from '../../helpers/chai-react.js';
import Todo from '../../../src/components/todo.jsx';
import Toggleable from '../../../src/components/toggleable.jsx';


describe('Todo', function() {
  let $component, Toggle, toggleTodoSpy;

  function renderTodo(todo) {
    return $render(<Todo
      Toggle={Toggle} {...todo} onSelect={toggleTodoSpy}
    />);
  }

  beforeEach(function() {
    Toggle = createSpy({ name: 'Toggle', Mock: Toggleable });
    toggleTodoSpy = spy();
  });

  describe('active', function() {
    const todo = {
      id: 42,
      title: 'buy milk',
      completed: false
    };

    beforeEach(function() {
      $component = renderTodo(todo);
    });

    it('should not visually mark active todos', function() {
      expect($component.hasClass('completed'),
            'Todo should not be marked as completed').to.be.false;
    });

    it('should not mark active todos', function() {
      expect(Toggle).to.not.have.been.renderedWith({ checked: true });
    });

    it('should call to toggle a todo when toggling it', function() {
      Toggle.lastProps.onToggle();

      expect(toggleTodoSpy).to.have.been.calledOnce;
    });
  });

  describe('completed', function() {
    const todo = {
      id: 21,
      title: 'buy eggs',
      completed: true
    };

    beforeEach(function() {
      $component = renderTodo(todo);
    });

    it('should visually mark a completed todo', function() {
      expect($component.hasClass('completed'),
            'Todo should be marked as completed').to.be.true;
    });

    it('should mark a completed todo', function() {
      expect(Toggle).to.have.been.renderedWith({ checked: true });
    });
  });
});
