import { mapStore } from '../stores/mapStore';
import axios from "axios";
import { notification } from 'antd';

export const sendAddressToGeoService = () => {
  const URL = `https://geocode-maps.yandex.ru/1.x?&geocode=${mapStore.address}&results=1&format=json&sco=latlong&apikey=${mapStore.apiKey}`;

  axios.get(URL)
    .then(function (response: any) {
      // handle success
      const waypoint = response?.data?.response?.GeoObjectCollection?.featureMember[0].GeoObject?.Point?.pos?.split(' ').map((item: string) => +item);
      mapStore.clearAddress();
      const normalizedWaypoint = [waypoint[1], waypoint[0]];
      mapStore.addWaypoint(normalizedWaypoint);
      mapStore.goToPoint(normalizedWaypoint);
    })
    .catch(function (error) {
      // handle error
      notification.error({
        message: 'Некорректный адрес',
        description:
          'Вы ввели некорректный адрес. Не удалось отметить точку на карте. Попробуйте снова.',
      });

      mapStore.clearAddress();
      console.error(error);
    })
}

export const sendCoordinatesToGeoService = (waypoint: number[]) => {
  const URL = `https://geocode-maps.yandex.ru/1.x?apikey=${mapStore.apiKey}&geocode=${waypoint[0]},${waypoint[1]}&format=json&sco=latlong&results=1`;

  axios.get(URL)
    .then(function (response) {
      // handle success
      const waypoint = response?.data?.response?.GeoObjectCollection?.featureMember[0].GeoObject?.Point?.pos?.split(' ').map((item: string) => +item);
      console.log(waypoint);
    })
    .catch(function (error) {
      // handle error
      notification.error({
        message: 'Некорректный адрес',
        description:
          'Не удалось получить адрес. Попробуйте снова.',
      });
      console.error(error);
    })
}
