"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientEventTypes;
(function (ClientEventTypes) {
    ClientEventTypes[ClientEventTypes["OPERATION_INVENTORY_BATCHES_SEARCH"] = 0] = "OPERATION_INVENTORY_BATCHES_SEARCH";
    ClientEventTypes[ClientEventTypes["OPERATION_INVENTORY_ITEMS_SEARCH"] = 1] = "OPERATION_INVENTORY_ITEMS_SEARCH";
    ClientEventTypes[ClientEventTypes["OPERATION_EXPLOITATION_BATCHES_SEARCH"] = 2] = "OPERATION_EXPLOITATION_BATCHES_SEARCH";
    ClientEventTypes[ClientEventTypes["EXPLOITATION_ITEMS_SEARCH"] = 3] = "EXPLOITATION_ITEMS_SEARCH";
    ClientEventTypes[ClientEventTypes["DISPATCH_DEVICE"] = 4] = "DISPATCH_DEVICE";
    ClientEventTypes[ClientEventTypes["DISPATCH_BATCH"] = 5] = "DISPATCH_BATCH";
    ClientEventTypes[ClientEventTypes["DISPATCH_OPERATION"] = 6] = "DISPATCH_OPERATION";
    ClientEventTypes[ClientEventTypes["SET_SNACK_BAR_MSG"] = 7] = "SET_SNACK_BAR_MSG";
    ClientEventTypes[ClientEventTypes["OTHER"] = 8] = "OTHER";
    ClientEventTypes[ClientEventTypes["BATCH_INVENTORY_TAB_SEARCH"] = 9] = "BATCH_INVENTORY_TAB_SEARCH";
    ClientEventTypes[ClientEventTypes["CLOSE_DIALOG_POPUP"] = 10] = "CLOSE_DIALOG_POPUP";
})(ClientEventTypes = exports.ClientEventTypes || (exports.ClientEventTypes = {}));
exports.ClientEvent = {
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
    events: {},
    /**
     * Adds the @listener function to the end of the listeners array
     * for the event named @eventName
     * Will ensure that only one time the listener added for the event
     *
     * @param event
     * @param instanceKey
     * @param {function} listener
     */
    on: function (event, instanceKey, listener) {
        if (!this.events[event])
            this.events[event] = [];
        var newEvents = [];
        this.events[event].forEach(function (event) {
            if (event['instance'] !== instanceKey)
                newEvents.push(event);
        });
        this.events[event] = newEvents;
        this.events[event].push({ listener: listener, instance: instanceKey });
    },
    /**
     * Will remove the specified @listener from @event list
     *
     * @param event
     * @param instanceKey
     * @param {function} listener
     */
    off: function (event, instanceKey) {
        if (!this.events[event])
            return;
        var newEvents = [];
        this.events[event].forEach(function (event) {
            if (event['instance'] !== instanceKey)
                newEvents.push(event);
        });
        this.events[event] = newEvents;
    },
    /**
     * Will emit the event on the evetn name with the @payload
     * and if its an error set the @error value
     *
     * @param {string} event
     * @param data
     */
    emit: function (event, data) {
        if (!this.events[event])
            return;
        this.events[event].forEach(function (callback) { return callback.listener(data); });
    },
    /**
     * Will clear the event list
     */
    clearAll: function () {
        this.events = {};
    }
};
