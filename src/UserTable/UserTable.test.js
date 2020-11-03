import UserTable from "./UserTable";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {setupIntersectionObserverMock} from "../test.utils";

let container = null;

describe("UserTableTest", () => {
  beforeEach(() => {
    setupIntersectionObserverMock();
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("should render user data", async () => {
    const fakeUsers = {
      results: [
        {
          gender: "male",
          name: {
            title: "Mr",
            first: "Vincent",
            last: "Moldestad",
          },
        },
      ],
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeUsers),
      })
    );

    await act(async () => {
      render(<UserTable />, container);
    });
    expect(container.querySelector("#title0").textContent).toBe(
      fakeUsers.results[0].name.title
    );
    expect(container.querySelector("#first0").textContent).toBe(
      fakeUsers.results[0].name.first
    );
    expect(container.querySelector("#last0").textContent).toBe(
      fakeUsers.results[0].name.last
    );
  });

});
