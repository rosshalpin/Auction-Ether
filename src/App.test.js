import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import {shallow, mount} from 'enzyme';


const wrapper = mount(<App />);


it('loads the data', async() => {
  var v = await wrapper.instance().handleExchangeRate();
  expect(v).toEqual(5);

});



