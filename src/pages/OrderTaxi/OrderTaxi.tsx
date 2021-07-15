import Title from 'antd/lib/typography/Title';
import { sendAddressToGeoService } from '../../services/geoService';
import { mapStore } from '../../stores/mapStore';
import { tripsStore } from '../../stores/tripsStore';
import { MapComponent } from '../MapComponent/MapComponent';
import classes from './order-taxi.module.sass';
import { Button, Input, Form, Row, Col, Modal, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { useModalComponent } from './ModalComponentHook';
import { useEffect } from 'react';

export const OrderTaxi = observer((): JSX.Element => {

  const [form] = Form.useForm();

  const { isModalVisible, setIsModalVisible, handleOk } = useModalComponent();

  useEffect(() => {
    setTimeout(() => { setIsModalVisible(true) }, 1000)
  }, [setIsModalVisible]);

  const startAddressIsNotEmpty = mapStore.startAddress;
  const finalAddressIsNotEmpty = mapStore.finalAddress;

  const validationRules = [{ required: true, message: 'Input mask: country, region, city, street, house number' }];


  const removeAll = () => {
    form.resetFields(['startAddress', 'finalAddress']);
    mapStore.removeData();
  }

  const submitStartAddress = async () => {
    const address = form.getFieldValue('startAddress');
    //
    //
    mapStore.routes.length && mapStore.removeData();
    form.getFieldValue('finalAddress') && form.setFieldsValue({ finalAddress: mapStore.finalAddress });
    mapStore.setStartAddress(address);
    //
    //
    sendAddressToGeoService({ value: address, type: 'startAddress' });
  }

  const submitFinalAddress = async () => {
    const address = form.getFieldValue('finalAddress');
    mapStore.setFinalAddress(address);
    await sendAddressToGeoService({ value: address, type: 'finalAddress' });
    tripsStore.saveRouteInfo(mapStore.waypoints);
    form.resetFields(['startAddress', 'finalAddress']);
    mapStore.clearAddressesForNewRoute();
  }

  return (
    <div className={classes.orderTaxi}>
      <Title>Order a taxi</Title>
      <MapComponent />
      <div className={classes.forms}>
        <Form form={form} layout="horizontal">
          <Row>
            <Col className={classes.column}>
              <Form.Item name="startAddress" label="Start address" rules={validationRules}>
                <Input value={mapStore.startAddress} allowClear placeholder="Enter your address here" className={classes.input} onPressEnter={submitStartAddress} onChange={(event: any) => { mapStore.setStartAddress(event.target.value) }} />
              </Form.Item>
            </Col>
            <Col className={classes.column}>
              <Button disabled={!startAddressIsNotEmpty} type="primary" onClick={submitStartAddress} className={classes.button}>Add point to map</Button>
            </Col>
          </Row>
          {startAddressIsNotEmpty &&
            <Row>
              <Col className={classes.column}>
                <Form.Item name="finalAddress" label="Final Address" rules={validationRules}>
                  <Input value={mapStore.finalAddress} allowClear placeholder="Enter your address here" className={classes.input} onPressEnter={submitFinalAddress} onChange={(event: any) => { mapStore.setFinalAddress(event.target.value) }} />
                </Form.Item>
              </Col>
              <Col className={classes.column}>
                <Button disabled={!finalAddressIsNotEmpty || !mapStore.waypoints.length || mapStore.routes.length} type="primary" onClick={submitFinalAddress} className={classes.button}>Add point to map</Button>
              </Col>
            </Row>}
          <Button danger type="primary" onClick={() => {
            removeAll();
          }} className={classes.button}>Remove all points and route</Button>
          <Button type="default" onClick={() => {
            mapStore.backToUserCoords();
          }}>Show my location</Button>
        </Form>
      </div>
      <Modal title="Greetings" width={700} closable={false} centered visible={isModalVisible} onOk={handleOk} footer={
        <Button onClick={() => { setIsModalVisible(false) }}>
          Ok
        </Button>
      }>
        <div>
          <Typography.Title level={3}>
            Hello
          </Typography.Title>
          <Typography.Paragraph>
            Here's a little tip on how to use this application.
          </Typography.Paragraph>
          <Typography.Paragraph>
            The application uses information about your location. So you better enable geolocation detection for the best experience!
          </Typography.Paragraph>
          <Typography.Paragraph>
            You can use input fields to pick your start and final addresses. While picking your destinations will be displayed on the map.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Recommended format of input is: <code> country, region, city, street, house number</code>.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Of course, you can omit some parts of the address if you want to.
          </Typography.Paragraph>
          <Typography.Paragraph>
            The next step is to choose the date of your trip and the transport you want to use. You can choose between taxi and personal cars (if you have ones).
          </Typography.Paragraph>
          <Typography.Paragraph>
            The last step is to confirm your data and to start your trip. Enjoy it!
          </Typography.Paragraph>
          <Typography.Paragraph>
            Also, you can view the history of your trips in the section "my trips" at any time.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Good to have you here!
          </Typography.Paragraph>
        </div>
      </Modal>
    </div >
  )
});
