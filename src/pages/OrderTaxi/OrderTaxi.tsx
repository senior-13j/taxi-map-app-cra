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
      <Title>Order a taxi</Title>
      <MapComponent />
      <div className={classes.forms}>
        <Form form={form} layout="horizontal" initialValues={{ address: mapStore.address }}>
          <Form.Item name="address" label="Address">
            <Input allowClear placeholder="Enter your address here" className={classes.input} onPressEnter={submit} />
          </Form.Item>
          <Button type="primary" onClick={submit} className={classes.button}>Add point to map</Button>
          <Button danger type="primary" onClick={() => {
            mapStore.clearWaypoints();
          }} className={classes.button}>Remove all points</Button>
          <Button type="default" onClick={() => {
            mapStore.backToUserCoords();
          }}>Show my location</Button>
        </Form>
      </div>
    </div>
  )
};
