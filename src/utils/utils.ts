import { format } from 'mints-utils';
import relativeTime from 'dayjs/plugin/relativeTime';

format.date.extend(relativeTime);

export const formatDate = (val: any) =>
  format.date(val).format('YYYY-MM-DD HH:mm');
