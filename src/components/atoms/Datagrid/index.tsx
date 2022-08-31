<<<<<<< HEAD
import MoreIcon from '@rsuite/icons/legacy/More';
import { Checkbox, Dropdown, IconButton, Popover, Progress, Table, Whisper } from 'rsuite';
import { mockUsers } from './mock';

=======
import { useState } from 'react';
import { Checkbox, Table } from 'rsuite';
import { mockUsers } from '../../../layouts/produtos/ProductsTable/mock';
>>>>>>> 945a4dbf2d3ac48c0725e572e3e139a1598299ed
const { Column, HeaderCell, Cell } = Table;

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: '46px' }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys.some((item) => item === rowData[dataKey])}
      />
    </div>
  </Cell>
);

const Datagrid = ({
  data,
  columns,
  height = 300,
  maxWidth = 900,
  withCheck = false,
}) => {
  const [checkedKeys, setCheckedKeys] = useState([]);
  let checked = false;
  let indeterminate = false;

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };
  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  return (
    <Table
      style={{ maxWidth: maxWidth }}
      height={height}
      data={data}
      id="table"
    >
      {withCheck && (
        <Column width={50} align="center">
          <HeaderCell style={{ padding: 0 }}>
            <div style={{ lineHeight: '40px' }}>
              <Checkbox
                inline
                checked={checked}
                indeterminate={indeterminate}
                onChange={handleCheckAll}
              />
            </div>
          </HeaderCell>
          <CheckCell
            dataKey="id"
            checkedKeys={checkedKeys}
            onChange={handleCheck}
            rowData={undefined}
          />
        </Column>
      )}
      {columns}

      {/* Exemplo de progresso */}
      {/* <Column width={230}>
        <HeaderCell>Skill Proficiency</HeaderCell>
        <Cell style={{ padding: '10px 0' }}>
          {(rowData) => (
            <Progress percent={rowData.progress} showInfo={false} />
          )}
        </Cell>
      </Column> */}

      {/* <Column width={100}>
        <HeaderCell>Rating</HeaderCell>
        <Cell>
          {(rowData) =>
            Array.from({ length: rowData.rating }).map((_, i) => (
              <span key={i}>⭐️</span>
            ))
          }
        </Cell>
      </Column> */}
    </Table>
  );
};

export default Datagrid;
