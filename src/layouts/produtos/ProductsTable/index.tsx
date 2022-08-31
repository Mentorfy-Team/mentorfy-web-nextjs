import MoreIcon from '@rsuite/icons/legacy/More';
import { Dropdown, IconButton, Popover, Table, Whisper } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;
const NameCell = ({ rowData, dataKey, ...props }) => {
  const speaker = (
    <Popover title="Description">
      <p>
        <b>Name:</b> {rowData.name}
      </p>
      <p>
        <b>Gender:</b> {rowData.gender}
      </p>
      <p>
        <b>City:</b> {rowData.city}
      </p>
      <p>
        <b>Street:</b> {rowData.street}
      </p>
    </Popover>
  );

  return (
    <Cell {...props}>
      <Whisper placement="top" speaker={speaker}>
        <a>{rowData[dataKey]}</a>
      </Whisper>
    </Cell>
  );
};

const ImageCell = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: '#f5f5f5',
        borderRadius: 6,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block',
      }}
    >
      <img src={rowData.avatar} width="40" />
    </div>
  </Cell>
);

const renderMenu = ({ onClose, left, top, className }, ref) => {
  const handleSelect = (eventKey) => {
    onClose();
    console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item eventKey={1}>Follow</Dropdown.Item>
        <Dropdown.Item eventKey={2}>Sponsor</Dropdown.Item>
        <Dropdown.Item eventKey={3}>Add to friends</Dropdown.Item>
        <Dropdown.Item eventKey={4}>View Profile</Dropdown.Item>
        <Dropdown.Item eventKey={5}>Block</Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const ActionCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props} className="link-group">
      <Whisper
        placement="autoVerticalStart"
        trigger="click"
        speaker={renderMenu as any}
      >
        <IconButton appearance="subtle" icon={<MoreIcon />} />
      </Whisper>
    </Cell>
  );
};

const ProductsTable = () => {
  return (
    <>
      <Column width={80} align="center">
        <HeaderCell>NOME</HeaderCell>
        <NameCell dataKey="name" rowData={undefined} />
      </Column>

      <Column width={160}>
        <HeaderCell>PREÇO</HeaderCell>
        <NameCell dataKey="price" rowData={undefined} />
      </Column>

      <Column width={160}>
        <HeaderCell>STATUS</HeaderCell>
        <NameCell dataKey="status" rowData={undefined} />
      </Column>

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

      <Column width={120}>
        <HeaderCell>
          <MoreIcon />
        </HeaderCell>
        <ActionCell dataKey="id" rowData={undefined} />
      </Column>
    </>
  );
};

export default ProductsTable;
