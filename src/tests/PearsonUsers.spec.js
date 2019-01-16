import React from "react";
import { shallow } from "enzyme";
import { PearsonUsers } from "../components/PearsonUsers/PearsonUsers";
import PearsonUser from "../components/PearsonUser/PearsonUser";

describe("PearsonUsers", () => {
  let component;
const users = [
  {
    id: 4,
    first_name: "Eve",
    last_name: "Holt",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
  },
  {
    id: 5,
    first_name: "Charles",
    last_name: "Morris",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
  },
  {
    id: 6,
    first_name: "Tracey",
    last_name: "Ramos",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
  }
];
const dummyData = [
  {
    id: 4,
    first_name: "Eve",
    last_name: "Holt",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
  }
];
  beforeEach(() => {
    component = shallow(<PearsonUsers />);
    component.setState({
      isLoading: true,
      error: null
    });
  });


  it("renders a h1", () => {
    const h1 = component.find("h1");
    expect(h1.text()).toEqual("Pearson User Management");
  });

  it("renders PearsonUser component", () => {
    component.setState({ isLoading: false });
    const usersCount = component.state().users.length;
   expect(component.find(PearsonUser)).toHaveLength(usersCount);
  });

  it('Trigger deleteUser to delete user by id', () => {
    component.setState({ users: users,isLoading: false });
    const userId = component.state().users[0].id;
    component.instance().deleteUser(userId);
    const delUser = component.state().users.some((user) => user.id === userId);
    expect(!delUser).toEqual(true);
  });

  it('trigger removeDuplicates to remove duplicate users', () => {
    const users = [...component.state().users, ...dummyData];
    const getUsers = component.instance().removeDuplicates(users, 'id');

    const ids = getUsers.map((user) => user.id);
    const duplicate = ids.some((id, index) => ids.indexOf(id) != index);

    expect(getUsers.length).toEqual(3);
    expect(!duplicate).toEqual(true);
  });

});
