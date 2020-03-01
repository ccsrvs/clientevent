export declare enum ClientEventTypes {
    OPERATION_INVENTORY_BATCHES_SEARCH = 0,
    OPERATION_INVENTORY_ITEMS_SEARCH = 1,
    OPERATION_EXPLOITATION_BATCHES_SEARCH = 2,
    EXPLOITATION_ITEMS_SEARCH = 3,
    DISPATCH_DEVICE = 4,
    DISPATCH_BATCH = 5,
    DISPATCH_OPERATION = 6,
    SET_SNACK_BAR_MSG = 7,
    OTHER = 8,
    BATCH_INVENTORY_TAB_SEARCH = 9,
    CLOSE_DIALOG_POPUP = 10
}
declare type ClientEventEvents = {
    [key: number]: ClientEventEvent[];
    [key: string]: ClientEventEvent[];
};
declare type ClientEventEvent = {
    listener: (payload: any) => void;
    instance: string;
};
export declare const ClientEvent: {
    /**
     * USAGE:
     *
     * In Client:
     * import {EventClient} from "../../util/eventClient";
     * EventClient.emit("type", payload);
     *
     * In Component that you wish to fire an event in:
     * import {EventClient} from "../../../util/eventClient";
     * componentWillMount() {
     *   EventClient.on(EventClientTypes, instanceKey, () => this.saveExternal());
     * }
     *
     * componentWillUnmount() {
     *   EventClient.off(EventClientTypes, instanceKey, () => this.saveExternal());
     * }
     */
    events: ClientEventEvents;
    /**
     * Adds the @listener function to the end of the listeners array
     * for the event named @eventName
     * Will ensure that only one time the listener added for the event
     *
     * @param event
     * @param instanceKey
     * @param {function} listener
     */
    on(event: string | number, instanceKey: string, listener: (payload?: any) => void): void;
    /**
     * Will remove the specified @listener from @event list
     *
     * @param event
     * @param instanceKey
     * @param {function} listener
     */
    off(event: string | number, instanceKey: string): void;
    /**
     * Will emit the event on the evetn name with the @payload
     * and if its an error set the @error value
     *
     * @param {string} event
     * @param data
     */
    emit(event: string | number, data?: any): void;
    /**
     * Will clear the event list
     */
    clearAll(): void;
};
export {};
