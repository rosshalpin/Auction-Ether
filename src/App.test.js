import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import exchangeAPI from './api/exchangeAPI';

describe("App components", () => {
  it("should update correct state", async () => {
    let wrapper = shallow(<App exchangeAPI={102} />);
    //var t = await wrapper.instance().componentDidMount();
    const spy = jest.spyOn(App.prototype, 'constructor');
    console.log(spy);
  });
});