import { Schema, Context, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("string") name: string;
  @type("string") currentScene: string;
  @type("number") x: number;
  @type("number") y: number;
  @type("boolean") left: boolean;
  @type("boolean") right: boolean;
  @type("boolean") up: boolean;
  @type("boolean") down: boolean;
}

export class MetaverseState extends Schema {
  // 이게 non-primitive type => client에서 onChange 사용 x
  @type({ map: Player }) players = new MapSchema<Player>();

  // 이건 primitive type => client에서 onChange 사용 O
  // @type("string") field: string;
}
