import { format } from 'mints-utils';

export const formatDate = (val) => format.date(val).format('YYYY-MM-DD HH:mm');
