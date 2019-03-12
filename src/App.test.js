import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";

describe("App components", () => {
  it("should update correct state", async () => {
    let wrapper = mount(<App />);

    await wrapper.instance().tester();
    wrapper = wrapper.update();
    console.log(wrapper.state().test);


  });
});





