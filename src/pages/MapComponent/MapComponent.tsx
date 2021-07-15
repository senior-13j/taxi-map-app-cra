
import classes from './map.module.sass';
import { observer } from 'mobx-react-lite';
import { YMaps, Map, Placemark, GeoObject } from 'react-yandex-maps';
import { mapStore } from '../../stores/mapStore';
import React, { Ref, useCallback } from 'react';

export const MapComponent = observer((): JSX.Element => {

  const getPointOptions = (index: number) => {
    return {
      preset: index === 0 ? "islands#redIcon" : "islands#blueIcon"
    };
  };

  const mapRef = React.useRef<any>(null);
  const setMapRef = useCallback((instance: Ref<any>) => {
    mapRef.current = instance;
    mapStore.saveMapInstance(mapRef.current);
  }, []);

  return (
    <div className={classes.map}>
      <YMaps query={{ lang: 'en_US' }}>
        <Map state={mapStore.state} width={900} height={500} instanceRef={setMapRef}>
          {mapStore?.waypoints?.map((waypoint, i) =>
            <Placemark
              key={waypoint.join(",")}
              geometry={waypoint}
              options={getPointOptions(i)}
              onClick={(event: any) => { mapStore.waypointClickHandler(event) }}
            />)}
          {mapStore?.routes?.map((route: any, i: any) => <GeoObject
            key={i}
            geometry={{ type: "LineString", coordinates: route }}
            options={{
              geodesic: true,
              strokeWidth: 4,
              strokeColor: '#242425'
            }}
          />
          )}
        </Map>
      </YMaps >
    </div >
  );
});
