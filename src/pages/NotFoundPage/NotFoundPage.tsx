import { Alert } from 'antd';

export const NotFoundPage = (): JSX.Element => (
  <Alert
    message="Error 404"
    description="Page not found"
    type="error"
    showIcon
  />
);
