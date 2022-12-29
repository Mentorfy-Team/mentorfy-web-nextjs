import { InputUserMemberArea } from '@app/services/member-area.service';
import { ToolListNames } from './SwitchModal';

const handleSave = async ({
  tool_id,
  client_input,
  member_area_id,
  mutate,
}) => {
  // timout para dar tempo para as imagens se organizarem
  setTimeout(async function () {
    await InputUserMemberArea(tool_id, client_input, member_area_id);
    mutate();
  }, 1000);
};

const SaveClientInput = ({
  member_area_id,
  data: { refId, data, extra, index, inputs },
  callbacks: { result, mutate },
}) => {
  result((oldInput) => {
    if (!oldInput) oldInput = [];
    if (index > -1) {
      if (data) oldInput[index].data = data;
      if (extra) oldInput[index].extra = extra;
    } else {
      oldInput?.push({
        member_area_tool_id: refId,
        data,
        extra,
      } as any);
    }
    return [...oldInput];
  });
  handleSave({
    tool_id: refId,
    client_input: {
      data: inputs[index] ? Object.assign(inputs[index].data, data) : data,
      extra: inputs[index] ? Object.assign(inputs[index].extra, extra) : extra,
      id: index > -1 ? inputs[index].id : '0',
      delete: data.delete,
    },
    member_area_id,
    mutate,
  });
};

export const GetTypeName = (type) => {
  return Object.values(ToolListNames).find((i) => {
    return i.id == parseInt(type);
  }).name;
};

export default SaveClientInput;
