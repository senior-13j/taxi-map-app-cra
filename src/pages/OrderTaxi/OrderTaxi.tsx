import Title from 'antd/lib/typography/Title';
import { sendAddressToGeoService } from '../../services/geoService';
import { mapStore } from '../../stores/mapStore';
import { MapComponent } from '../MapComponent/MapComponent';
import classes from './order-taxi.module.sass';
import { Button, Input, Form } from 'antd';

export const OrderTaxi = (): JSX.Element => {

  const [form] = Form.useForm();

  const submit = () => {
    mapStore.address = form.getFieldsValue().address;
    form.resetFields();
    sendAddressToGeoService();
  }

  return (
    <div className={classes.orderTaxi}>
      <Title>Заказать такси</Title>
      <MapComponent />
      <div className={classes.forms}>
        <Form form={form} layout="horizontal" initialValues={{ address: mapStore.address }}>
          <Form.Item name="address" label="Адрес">
            <Input allowClear placeholder="Введите адрес здесь" className={classes.input} onPressEnter={submit} />
          </Form.Item>
          <Button type="primary" onClick={submit} className={classes.button}>Отметить точку</Button>
          <Button danger type="primary" onClick={() => {
            mapStore.clearWaypoints();
          }} className={classes.button}>Удалить все точки</Button>
          <Button type="default" onClick={() => {
            mapStore.backToUserCoords();
          }}>Показать мое местоположение</Button>
        </Form>
      </div>
    </div>
  )
};
