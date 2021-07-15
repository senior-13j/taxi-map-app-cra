import notification from "antd/lib/notification";
import { makeAutoObservable } from "mobx";
import { sendCoordinatesToGeoService } from "../services/geoService";

type MapState = {
  center: number[];
  zoom: number;
};
interface MapStore {
  defaultState: MapState;
  state: MapState;
  waypoints: number[][];
  routes: any;
  startAddress: string;
  finalAddress: string;
  apiKey: string;
  map: any;
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
  startAddress = '';
  finalAddress = '';
  apiKey = 'ead9f847-9d70-4b5b-a7e9-be39c3252170';
  routes = [] as any;

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
      notification.success({
        message: 'Geolocation detection is enabled',
      });
    };

    const geoError = (): void => {
      notification.warning({
        message: 'Geolocation detection is disabled',
        description: 'San Francisco region is set by default'
      });
    };

    const geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 600000
    };

    // check for Geolocation support
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    } else {
      notification.warning({
        message: 'Geolocation is not supported for this Browser/OS version yet.',
      });
    }
  }

  saveMapInstance(mapRef: any) {
    this.map = mapRef;
    if (!this.map) return;
    this.addHandlers();
  }

  addHandlers() {
    this.map.cursors.push('pointer');
  }

  async waypointClickHandler(event: any) {
    const coords = event.get('coords');
    const address = await sendCoordinatesToGeoService(coords);
    this.map.balloon.open(coords, `
    <div style="display: flex; flex-direction: column; justify-content: center">
      <span style="font-weight: 700; font-style: italic; margin: 5px">${address}</span>
    </div>
    `, {});
    this.goToPoint(coords);
  }

  addWaypoint(waypoint: number[], type: string) {
    this.checkWaypointCount(waypoint, type);
  }

  setStartAddress(value: string) {
    this.startAddress = value;
  }

  setFinalAddress(value: string) {
    this.finalAddress = value;
  }

  clearStartAddress() {
    this.startAddress = '';
  }

  clearFinalAddress() {
    this.finalAddress = '';
  }

  clearWaypoints() {
    this.waypoints = [];
  }

  clearState() {
    this.state = {} as MapState;
  }

  removeRoutes() {
    this.routes = [] as number[][];
  }

  removeData() {
    this.clearWaypoints();
    this.removeRoutes();
    this.clearAddressesForNewRoute();
  }

  clearAddressesForNewRoute() {
    this.startAddress = '';
    this.finalAddress = ''
  }

  addRoute() {
    this.routes.push([this.waypoints[0], this.waypoints[1]]);
  }

  backToUserCoords() {
    this.state = { ...this.defaultState, zoom: 8 };
    this.goToPoint([this.state.center[0] + 0.00000000001, this.state.center[1] + 0.00000000001]);
  }

  goToPoint(waypoint: number[]) {
    this.state = { ...this.state, center: waypoint };
  }

  checkWaypointCount(waypointToAdd: number[], type: string) {
    if (this.waypoints.length > 1) {
      this.removeData();
    }

    if (this.waypoints.length) {
      if (type === 'startAddress') {
        this.waypoints[0] = waypointToAdd;
      } else {
        this.waypoints[1] = waypointToAdd;
      }
    } else {
      this.waypoints.push(waypointToAdd);
    }

    if (this.waypoints.length === 2) {
      this.createRoute();
    }
  }

  createRoute() {
    this.addRoute();
    this.clearAddressesForNewRoute();
  }
}

export const mapStore = new MapStore();