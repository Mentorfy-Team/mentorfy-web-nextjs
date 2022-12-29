import { default as KanbanViewLayout } from '@app/layouts/mentorado/kanban';
import { getProps as getProps } from '@app/layouts/mentorado/kanban';

export default KanbanViewLayout;

export const getServerSideProps = getProps;
