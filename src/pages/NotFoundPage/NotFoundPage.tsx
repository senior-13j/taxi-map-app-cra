import { Alert } from 'antd';

export const NotFoundPage = (): JSX.Element => (
  <Alert
    message="Ошибка 404"
    description="Страница не найдена!"
    type="error"
    showIcon
  />
);
