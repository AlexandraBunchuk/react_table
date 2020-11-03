export const mockValues = [
  {
    columns: ["Mrs", "Emma", "Walker"],
  },
  {
    columns: ["Mr", "Fernando", "Griffin"],
  },
  {
    columns: ["Ms", "Lena", "Carpenter"],
  },
];

export const mockHeaders = [
    { id: 0, name: "Title", key: "title" },
    { id: 1, name: "First Name", key: "first" },
    { id: 2, name: "Last Name", key: "last" },
  ];

export function mockLoadDataFunction() {
    return {
        "columns": [
          "Mrs",
          "Emma",
          "Walker"
        ]
      }
}

