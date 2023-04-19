import type Connection from "../interaction/connection";
import type InputPayload from "./inputPayload";

export default interface Player {
    // _scene: Phaser.Scene;
    // _connection: Connection;
    // _playerEntities: { [sessionId: string]: any };
    // _playerNames: { [sessionId: string]: any };
    // _currentPlayer: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    // _inputPayload: InputPayload;

    get scene(): any;
    set scene(scene);

    get connection(): any;
    set connection(connection);

    get playerEntities(): any;
    set playerEntities(playerEntites);

    get playerNames(): any;
    set playerNames(playerNames);

    get currentPlayer(): any;
    set currentPlayer(currentPlayer);

    get inputPayload(): any;
    set inputPayload(inputPaylaod);
}