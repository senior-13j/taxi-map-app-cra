import { mapStore } from '../stores/mapStore';
import axios from "axios";
import { notification } from 'antd';

export const sendAddressToGeoService = async () => {

  const URL = `https://geocode-maps.yandex.ru/1.x?&geocode=
  ${mapStore.address}&results=1&format=json&sco=latlong&apikey=${mapStore.apiKey}`;

  try {
    let response = await axios.get(URL);
    // handle success
    const waypoint = response?.data?.response?.GeoObjectCollection?.featureMember[0].GeoObject?.Point?.pos?.split(' ').map((item: string) => +item);
    mapStore.clearAddress();
    const normalizedWaypoint = [waypoint[1], waypoint[0]];
    mapStore.addWaypoint(normalizedWaypoint);
    mapStore.goToPoint(normalizedWaypoint);
  } catch (error) {
    // handle error
    notification.error({
      message: 'Incorrect address',
      description:
        'You entered an incorrect address. Failed to add a point to the map. Try again.',
    });
    mapStore.clearAddress();
    console.error(error);
  }
}

export const sendCoordinatesToGeoService = async (waypoint: number[]) => {

  const URL = `https://geocode-maps.yandex.ru/1.x?apikey=
  ${mapStore.apiKey}&geocode=${waypoint[0]},${waypoint[1]}&format=json&sco=latlong&results=1`;

  try {
    let response = await axios.get(URL)
    // handle success
    const waypoint = response?.data?.response?.GeoObjectCollection?.
      featureMember[0].GeoObject?.Point?.pos?.split(' ').map((item: string) => +item);
    console.log(waypoint);
  } catch (error) {
    // handle error
    notification.error({
      message: 'Incorrect address',
      description:
        'Failed to receive an address. Try again.',
    });
    console.error(error);
  }
}
