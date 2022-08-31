import { faker } from '@faker-js/faker/locale/en';
export function mockUsers(length) {
  const createRowData = (rowIndex) => {
    const status = 'active';
    const name = faker.name.fullName();
    const price = faker.finance.amount(0, 1000, 2);

    return {
      id: rowIndex + 1,
      name,
      status,
      price,
    };
  };

  return Array.from({ length }).map((_, index) => {
    return createRowData(index);
  });
}

export function mockTreeData(options) {
  const { limits, labels, getRowData } = options;
  const depth = limits.length;

  const data = [];
  const mock = (list, parentValue?, layer = 0) => {
    const length = limits[layer];
    Array.from({ length }).forEach((_, index) => {
      const value = parentValue
        ? parentValue + '-' + (index + 1)
        : index + 1 + '';
      const children = [];
      const label = Array.isArray(labels) ? labels[layer] : labels;
      let row: any = {
        label:
          typeof label === 'function'
            ? label(layer, value, faker)
            : label + ' ' + value,
        value,
      };

      if (getRowData) {
        row = {
          ...row,
          ...getRowData(layer, value),
        };
      }

      list.push(row);

      if (layer < depth - 1) {
        row.children = children;
        mock(children, value, layer + 1);
      }
    });
  };

  mock(data);

  return data;
}
