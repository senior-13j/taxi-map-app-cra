import { makeAutoObservable } from "mobx";

type MapState = {
  center: number[];
  zoom: number;
};
interface MapStore {
  defaultState: MapState;
  state: MapState;
  waypoints: number[][];
  address: string;
  apiKey: string;
}

class MapStore implements MapStore {

  constructor() {
    makeAutoObservable(this);
    this.detectUserPosition();
  }

  // San Francisco by default
  defaultState = { center: [37.7, -122.4], zoom: 11 };
  state = { ...this.defaultState };
  waypoints = [] as number[][];
  address = '';
  apiKey = 'ead9f847-9d70-4b5b-a7e9-be39c3252170';

  setUserCoordsCenter(position: number[]) {
    this.state = { ...this.state, center: position };
    this.defaultState = { ...this.defaultState, center: position };
  }

  setUserCoordsZoom(zoom: number) {
    this.state = { ...this.state, zoom };
  }

  detectUserPosition() {
    const geoSuccess = (position: any): void => {
      this.setUserCoordsCenter([position.coords.latitude, position.coords.longitude]);
    };

    const geoError = (error: any): void => {
      console.error('Error occurred. Error code: ' + error.code);
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
  }

  addWaypoint(waypoint: number[]) {
    this.waypoints.push(waypoint);
  }

  setAddress(value: string) {
    this.address = value;
  }

  clearAddress() {
    this.address = '';
  }

  clearWaypoints() {
    this.waypoints = [];
  }

  clearState() {
    this.state = {} as MapState;
  }

  backToUserCoords() {
    this.state = { ...this.defaultState };
    this.goToPoint([this.state.center[0] + 0.00000000001, this.state.center[1] + 0.00000000001]);
  }

  goToPoint(waypoint: number[]) {
    this.state = { ...this.state, center: waypoint, zoom: 8 };
  }
}

export const mapStore = new MapStore();