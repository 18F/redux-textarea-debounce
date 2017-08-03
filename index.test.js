import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import TextArea from './index.js';

// Jest globals
/* global jest test expect */

test('everything works fine WITH a handler attached', () => {
  jest.useFakeTimers();

  let persistCallCount = 0;
  const persist = () => {
    persistCallCount += 1;
  };

  let changeHandlerCallCount = 0;
  let changeHandlerCalledWith = null;
  const changeHandler = (e) => {
    changeHandlerCallCount += 1;
    changeHandlerCalledWith = e;
  };

  const component = mount(
    <TextArea value="test string" onChange={changeHandler} />
  );

  expect(toJson(component)).toMatchSnapshot();

  const textArea = component.find('textarea');

  textArea.simulate('change', { target: { value: 'first' }, persist });
  expect(changeHandlerCallCount).toBe(0);
  expect(component.state().value).toBe('first');
  expect(persistCallCount).toBe(1);

  textArea.simulate('change', { target: { value: 'second' }, persist });
  expect(changeHandlerCallCount).toBe(0);
  expect(component.state().value).toBe('second');
  expect(persistCallCount).toBe(2);

  textArea.simulate('change', { target: { value: 'third' }, persist });
  expect(changeHandlerCallCount).toBe(0);
  expect(component.state().value).toBe('third');
  expect(persistCallCount).toBe(3);

  textArea.simulate('change', { target: { value: 'fourth' }, persist });
  expect(changeHandlerCallCount).toBe(0);
  expect(component.state().value).toBe('fourth');
  expect(persistCallCount).toBe(4);

  textArea.simulate('change', { target: { value: 'fifth' }, persist });
  expect(changeHandlerCallCount).toBe(0);
  expect(component.state().value).toBe('fifth');
  expect(persistCallCount).toBe(5);

  jest.runAllTimers();

  expect(changeHandlerCallCount).toBe(1);
  expect(changeHandlerCalledWith.target.value).toBe('fifth');
});

test('everything works fine WITHOUT a handler attached', () => {
  let persistCallCount = 0;
  const persist = () => {
    persistCallCount += 1;
  };

  const component = mount(
    <TextArea value="test string" />
  );

  expect(toJson(component)).toMatchSnapshot();

  const textArea = component.find('textarea');

  textArea.simulate('change', { target: { value: 'first' }, persist });
  expect(persistCallCount).toBe(1);
});
