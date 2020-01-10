import "reflect-metadata";
import { Module } from "@gqli/lib";
import module from "../package.json";
import { DataStoreService } from "./service";

export class DataStoreModule extends Module {
  constructor() {
    super();
    this.name = module.name;
  }

  dependencies() {
    return [];
  }

  async onInstall() {}

  export() {
    return {
      resolvers: []
    };
  }

  services() {
    return {
      services: [DataStoreService]
    };
  }
}
