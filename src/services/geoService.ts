import { mapStore } from '../stores/mapStore';
import axios from "axios";
import { notification } from 'antd';

type GeoRequest = {
  value: string;
  type: string;
};

export const sendAddressToGeoService = async ({ value, type }: GeoRequest) => {
  const URL = `https://geocode-maps.yandex.ru/1.x?&geocode=${value}&results=1&format=json&lang=en_US&sco=latlong&apikey=${mapStore.apiKey}`;

  try {
    let response = await axios.get(URL);
    // handle success
    const waypoint = response?.data?.response?.GeoObjectCollection?.featureMember[0].GeoObject?.Point?.pos?.split(' ').map((item: string) => +item);
    const normalizedWaypoint = [waypoint[1], waypoint[0]];
    mapStore.addWaypoint(normalizedWaypoint, type);
    mapStore.goToPoint(normalizedWaypoint);
  } catch (error) {
    // handle error
    notification.error({
      message: 'Incorrect address',
      description:
        'You entered an incorrect address. Failed to add a point to the map. Try again.',
    });
    mapStore.removeData();
    console.error(error);
  }
}

export const sendCoordinatesToGeoService = async (waypoint: number[]) => {

  const URL = `https://geocode-maps.yandex.ru/1.x?apikey=${mapStore.apiKey}&geocode=${waypoint[0]},${waypoint[1]}&format=json&sco=latlong&lang=en_US&results=1`;

  try {
    let response = await axios.get(URL)
    // handle success
    const address = `${response?.data?.response?.GeoObjectCollection?.featureMember[0].GeoObject?.description}, ${response?.data?.response?.GeoObjectCollection?.featureMember[0].GeoObject?.name}`;
    return address;
  } catch (error) {
    // handle error
    notification.error({
      message: 'Incorrect data',
      description:
        'Failed to receive an address. Try again.',
    });
    mapStore.removeData();
    console.error(error);
  }
}
