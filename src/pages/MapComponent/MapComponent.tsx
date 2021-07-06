
import GoogleMapReact from 'google-map-react';
import classes from './map.module.sass';
import { mapStore } from '../../stores/mapStore';
import { observer } from 'mobx-react-lite';

// type MarkerProps = {
//   text: string;
//   lat: number;
//   lng: number;
// }

// const AnyReactComponent = ({ text }: MarkerProps): JSX.Element => <div>{text}</div>;

export const MapComponent = observer((): JSX.Element => {
  const geoSuccess = (position: any): void => {
    mapStore.setUserCoordsCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
  };

  const geoError = (error: any): void => {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  const geoOptions = {
    enableHighAccuracy: true,
  };

  // check for Geolocation support
  if (navigator.geolocation) {
    console.log('Geolocation is supported!');
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  } else {
    console.log('Geolocation is not supported for this Browser/OS version yet.');
  }

  const defaultProps = mapStore.userCords;

  return (
    <div className={classes.map} style={{ height: '500px', width: '60%' }}>
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: 'AIzaSyDrA2pB--fUX7FvxXAqRIHGudXTMrnxasM' }}
      >
        {/* <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" /> */}
      </GoogleMapReact>
    </div>
  );
});
