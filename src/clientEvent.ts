type ClientEventEvents = {
  [key: number]: ClientEventEvent[];
  [key: string]: ClientEventEvent[];
}

type ClientEventEvent = {
  listener: (payload: any) => void;
  instance: string;
}

export const ClientEvent = {
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
  events: {} as ClientEventEvents,
  /**
   * Adds the @listener function to the end of the listeners array
   * for the event named @eventName
   * Will ensure that only one time the listener added for the event
   *
   * @param event
   * @param instanceKey
   * @param {function} listener
   */
  on(event: string | number, instanceKey: string, listener: (payload?: any) => void) {
    if (!this.events[event]) this.events[event] = [];
    const newEvents = [] as ClientEventEvent[];
    this.events[event].forEach((event: ClientEventEvent) => {
      if (event['instance'] !== instanceKey) newEvents.push(event);
    });
    this.events[event] = newEvents;
    this.events[event].push({listener: listener, instance: instanceKey});
  },
  /**
   * Will remove the specified @listener from @event list
   *
   * @param event
   * @param instanceKey
   * @param {function} listener
   */
  off(event: string | number, instanceKey: string) {
    if (!this.events[event]) return;
    const newEvents = [] as ClientEventEvent[];
    this.events[event].forEach((event: ClientEventEvent) => {
      if (event['instance'] !== instanceKey) newEvents.push(event);
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
  emit(event: string | number, data?: any) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback.listener(data));
  },

  /**
   * Will clear the event list
   */
  clearAll() {
    this.events = {}
  }
}