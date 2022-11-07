import React from 'react';
import { AreaField, AreaTitle, AreasBox, DeleteButton, SaveButton } from '../styles';
import MenuIcon from '@mui/icons-material/Menu';

type Props = {
    data: WheelAreasObject;
    onSaveArea: (_title: string, id: string) => void;
    onDeleteArea: (_area_id: string) => void;
}

export type WheelAreasObject = {
    id: string;
    title: string;
};
const WheelOfLifeAreas: React.FC<Props> = ({
    data: area,
    onSaveArea,
    onDeleteArea,
}) => {
    const [title, setTitle] = React.useState(area.title);
    const [canEdit, setCanEdit] = React.useState(false);
    const [error, setError] = React.useState(false);

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
                <MenuIcon/>
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
