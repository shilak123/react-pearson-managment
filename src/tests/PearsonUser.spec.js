import React from "react";
import { shallow } from "enzyme";
import  PearsonUser  from "../components/PearsonUser/PearsonUser";

describe('PearsonUser', () => {

  let PearsonComponent;
  let user;

  beforeEach(() => {
    user = {
      id: 1,
      first_name: "Eve",
      last_name: "Holt",
      avatar: "avatar/image/source",
    };
    PearsonComponent = shallow(<PearsonUser user={user}/>);

  });

  it("Renders an Image", () => {
    expect(
      PearsonComponent.find("img").prop("src")).toEqual("avatar/image/source");
  });

  it("Display first Name and last Name", () => { 
    const display_name = PearsonComponent.find("div.title");
    expect(display_name.text()).toEqual('Eve Holt');

  });

  it("Show delete button", () => {
    expect(PearsonComponent.find(".delete").text()).toEqual("Delete");
  });
  
  it("Trigger deleteUser function", () => {
    const mockFn = jest.fn();
    
    PearsonComponent.setProps({ deleteUser: mockFn });
    PearsonComponent
      .find("div.delete")
      .simulate("click");   
    expect(mockFn).toHaveBeenCalledTimes(1);    
  });

});