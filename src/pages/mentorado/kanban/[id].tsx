import { default as KanbanViewLayout } from '~/layouts/mentorado/kanban';
import { getProps as getProps } from '~/layouts/mentorado/kanban';

export default KanbanViewLayout;

export const getServerSideProps = getProps;
