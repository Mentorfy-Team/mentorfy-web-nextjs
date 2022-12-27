import SwitchMentoredModal from './SwitchModal';

const HandleToolModal = ({ open, setOpen, currentModal, area_id, inputs }) => {
  return (
    <SwitchMentoredModal
      open={open}
      setOpen={setOpen}
      onChange={currentModal.onChange}
      type={currentModal.type}
      refId={currentModal.refId}
      area_id={area_id}
      data={currentModal.data}
      userInput={inputs?.find(
        (inp) => inp.member_area_tool_id.toString() === currentModal.refId,
      )}
    />
  );
};

export default HandleToolModal;
