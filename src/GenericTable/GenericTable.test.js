import GenericTable from "./GenericTable";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { setupIntersectionObserverMock } from "../test.utils";
import {
  mockValues,
  mockHeaders,
  mockLoadDataFunction,
} from "./GenericTable.mock";

let container = null;

fdescribe("UserTableTest", () => {
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

  it("should display header information", () => {
    act(() => {
      render(
        <GenericTable
          headerNames={mockHeaders}
          loadDataFunction={mockLoadDataFunction()}
          values={[]}
          maxWidth={700}
        />,
        container
      );
    });
    expect(container.querySelector("#header0").textContent).toBe(
      mockHeaders[0].name + "⋮"
    );
    expect(container.querySelector("#header1").textContent).toBe(
      mockHeaders[1].name + "⋮"
    );
    expect(container.querySelector("#header2").textContent).toBe(
      mockHeaders[2].name
    );
  });

  it("should display sorted values in ascending order when header is clicked", () => {
    act(() => {
      render(
        <GenericTable
          headerNames={mockHeaders}
          loadDataFunction={mockLoadDataFunction()}
          values={mockValues}
          maxWidth={700}
        />,
        container
      );
    });
    const button = container.querySelector(".table-header");
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector("#title0").textContent).toBe(
      mockValues[1].columns[0]
    );
    expect(container.querySelector("#title1").textContent).toBe(
      mockValues[0].columns[0]
    );
    expect(container.querySelector("#title2").textContent).toBe(
      mockValues[2].columns[0]
    );
  });

  it("should display sorted values in descending order when header is clicked", () => {
    act(() => {
      render(
        <GenericTable
          headerNames={mockHeaders}
          loadDataFunction={mockLoadDataFunction()}
          values={mockValues}
          maxWidth={700}
        />,
        container
      );
    });
    const button = container.querySelector(".table-header");
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector("#title0").textContent).toBe(
      mockValues[2].columns[0]
    );
    expect(container.querySelector("#title1").textContent).toBe(
      mockValues[0].columns[0]
    );
    expect(container.querySelector("#title2").textContent).toBe(
      mockValues[1].columns[0]
    );
  });

  it("should display empty table when no values is passed", () => {
    act(() => {
      render(
        <GenericTable
          headerNames={mockHeaders}
          loadDataFunction={mockLoadDataFunction()}
          maxWidth={700}
        />,
        container
      );
    });

    expect(container.querySelector("#title0")).toBeUndefined();
  });

  
});
