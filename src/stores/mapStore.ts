import { makeAutoObservable } from "mobx";

type Position = {
  lat: number;
  lng: number;
};

interface MapStore {
  userCords: {
    center: {
      lat: number;
      lng: number;
    }, zoom: number;
  }
}


class MapStore implements MapStore {

  constructor() {
    makeAutoObservable(this)
  }

  // San Francisco by default
  userCords = { center: { lat: 37.7, lng: -122.4 }, zoom: 11 };

  setUserCoordsCenter(position: Position) {
    this.userCords.center = position;
  }

  setUserCoordsZoom(zoom: number) {
    this.userCords.zoom = zoom;
  }
}

export const mapStore = new MapStore();