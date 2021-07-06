
import classes from './map.module.sass';
import { observer } from 'mobx-react-lite';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { mapStore } from '../../stores/mapStore';

export const MapComponent = observer((): JSX.Element => {

  const getPointOptions = () => {
    return {
      preset: "islands#redIcon"
    };
  };

  return (
    <div className={classes.map}>
      <YMaps>
        <Map state={mapStore.state} width={900} height={500} >
          {mapStore?.waypoints?.map((waypoint, i) => <Placemark key={i} geometry={waypoint} options={getPointOptions()} />)}
        </Map>
      </YMaps >
    </div >
  );
});
