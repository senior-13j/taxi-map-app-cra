import { makeAutoObservable } from "mobx";

interface TripsStore {
  routeInfo: number[][];
}

class TripsStore implements TripsStore {

  constructor() {
    makeAutoObservable(this);
  }

  routeInfo = [] as number[][];


  saveRouteInfo(routeInfo: number[][]) {
    this.routeInfo = routeInfo;
  }
}

export const tripsStore = new TripsStore();