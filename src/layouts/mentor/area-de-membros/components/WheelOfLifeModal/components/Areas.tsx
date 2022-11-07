import React from 'react';
import { AreaField, AreaTitle, AreasBox, DeleteButton, SaveButton } from '../styles';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';

type Props = {
    data: WheelAreasObject;
    onSaveArea: (_title: string, id: string) => void;
    onDeleteArea: (_area_id: string) => void;
}

export type WheelAreasObject = {
    id: string;
    title: string;
    checked: boolean;
};
const WheelOfLifeAreas: React.FC<Props> = ({
    data: area,
    onSaveArea,
    onDeleteArea,
}) => {
    const theme = useTheme();
    const [checkWheel, setCheckWheel] = React.useState(area.checked);
    const [title, setTitle] = React.useState(area.title);
    const [canEdit, setCanEdit] = React.useState(false);
    const [error, setError] = React.useState(false);

    function BpCheckbox(props: CheckboxProps) {
        return (
            <Checkbox
                sx={{
                    padding: '0',
                    color: `${theme.palette.caption.dark}`,
                    '& .MuiSvgIcon-root': { fontSize: 18 },
                    '&.Mui-checked': {
                        color: 'green',
                    },
                }}
                disableRipple
                color="default"
                {...props}
            />
        );
    }
    return (
        <AreasBox>
            {canEdit ?
                <>
                    <AreaField
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        label="Título"
                        placeholder="Lorem ipsum in dolor win"
                        error={error && !title}
                    />
                    <>
                        <SaveButton
                            style={{ height: '24px' }}
                            onClick={() => {
                                if (!title) {
                                    setError(true);
                                } else {
                                    setCanEdit(false);
                                    onSaveArea(title, area.id);
                                }
                            }}
                        >
                            Salvar
                        </SaveButton>
                        <DeleteButton
                            style={{ height: '24px' }}
                            onClick={() => {
                                setCanEdit(false);
                                onDeleteArea(area.id);
                            }}
                        >Deletar</DeleteButton>
                    </>

                </>
                :
                <>
                    <BpCheckbox
                        checked={area.checked}
                        onChange={(e) => {
                            setCheckWheel(!checkWheel);
                            // const newCheckWheel = [...checkWheel];
                            // newCheckWheel[index.id].checked = e.target.checked;
                            // setCheckWheel(newCheckWheel);
                        }}
                    />
                    <AreaTitle>
                        {title}
                    </AreaTitle>
                    <SaveButton
                        style={{ height: '24px' }}
                        onClick={() => {
                            setCanEdit(true);
                        }}
                    >
                        Editar
                    </SaveButton>
                </>
            }

        </AreasBox>

    );
};

export default WheelOfLifeAreas;
