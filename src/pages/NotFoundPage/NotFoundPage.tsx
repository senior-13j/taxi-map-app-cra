import { Alert } from 'antd';
import styles from './not-found-page.module.sass';

export const NotFoundPage = (): JSX.Element => (
  <Alert
    message="Ошибка 404"
    description="Страница не найдена!"
    type="error"
    showIcon
  />
);
