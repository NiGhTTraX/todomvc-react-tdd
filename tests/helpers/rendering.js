/**
 * @fileoverview Test helpers for mounting/unmounting components.
 *
 * This module has side effects.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const _container = document.createElement('div');


/**
 * Render the given component.
 *
 * @param {ReactElement} element
 *
 * @returns {Object} The component instance.
 */
export function render(element) {
  let component;

  ReactDOM.render(
    React.cloneElement(element, { ref: inst => { component = inst; } }),
    _container
  );

  return component;
}


/**
 * Render the given component.
 *
 * @param {ReactElement} element
 *
 * @returns {jQuery} The component's root DOM node wrapped in jQuery.
 */
export function $render(element) {
  render(element);

  // Return the first (and only) child in the container wrapped in jQuery.
  return $(_container).children().eq(0);
}


/**
 * Unmount the currently mounted component.
 */
export function unmount() {
  // unmountComponentAtNode will return `false` if there was no component
  // mounted at the given node. That can happen when the component was
  // unmounted inside a test i.e. to test cleanup logic.
  ReactDOM.unmountComponentAtNode(_container);
}


/**
 * Unmount the currently mounted component after each test.
 */
afterEach(function() {
  unmount();
});
