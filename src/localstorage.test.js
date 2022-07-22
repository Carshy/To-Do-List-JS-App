import { JSDOM } from 'jsdom';
import localstorage from './__mocks__/localstorage.js';
import displayhtml from './htmldisplay.js';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

describe('Add Method', () => {
  test('Add to the list', () => {
    expect(localstorage.add({ target: { value: 'Collins' } })).toBe(1);
  });

  test('Add one new item to the list', () => {
    document.body.innerHTML = `<ul id="todo-list-group">
    <li class="todo-list-item1">Today's To Do<i class="fa fa-refresh" aria-hidden="true"></i></li>
    <li class="todo-list-item2"><input type="text" id="additem" placeholder="Add to your list ..."></li>
    <li class="btn"><a href="#">Clear all Completed</a></li>
    </ul>`

    displayhtml.addListItem({ description: 'First Item', completed: false, index: 1 });
    const list = document.querySelectorAll('#todo-list-group li');
    expect(list).toHaveLength(4);
  });
});

describe('Remove Method', () => {
  test('Remove from the list', () => {
    expect(localstorage.remove({ target: { index: '1' } })).toBe(2);
  });

  test('Removing a new task from the list', () => {
    document.body.innerHTML = `<ul id="todo-list-group">
    <li class="todo-list-item1">Today's To Do<i class="fa fa-refresh" aria-hidden="true"></i></li>
    <li class="todo-list-item2"><input type="text" id="additem" placeholder="Add to your list ..."></li>
    <li class="btn"><a href="#">Clear all Completed</a></li>
    </ul>`;

    localstorage.displayList();
    localstorage.remove({ target: { index: '1' } });
    const list = document.querySelectorAll('.todoItem');
    expect(list).toHaveLength(1);
  });
});