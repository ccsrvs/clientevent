import {ClientEvent, ClientEventTypes} from "../src/clientEvent";

describe('eventClient', () => {

  afterEach(() => ClientEvent.clearAll());

  describe('on', function () {
    it("Adds method to events object", () => {
      expect(Object.keys(ClientEvent.events).length).toBe(0);
      const testFunction = () => undefined;

      ClientEvent.on(ClientEventTypes.SET_SNACK_BAR_MSG, "test", testFunction);

      expect(Object.keys(ClientEvent.events).length).toBe(1);
      expect(ClientEvent.events[ClientEventTypes.SET_SNACK_BAR_MSG].length).toBe(1);

      expect(ClientEvent.events[ClientEventTypes.SET_SNACK_BAR_MSG]).toEqual([{
        instance: "test",
        listener: testFunction
      }]);
    });
    it("Adds two methods to events object", () => {
      expect(Object.keys(ClientEvent.events).length).toBe(0);
      const testFunction1 = () => undefined;
      const testFunction2 = () => undefined;

      ClientEvent.on(ClientEventTypes.SET_SNACK_BAR_MSG, "test1", testFunction1);
      ClientEvent.on(ClientEventTypes.SET_SNACK_BAR_MSG, "test2", testFunction2);

      expect(Object.keys(ClientEvent.events).length).toBe(1);
      expect(ClientEvent.events[ClientEventTypes.SET_SNACK_BAR_MSG].length).toBe(2);

      expect(ClientEvent.events[ClientEventTypes.SET_SNACK_BAR_MSG]).toEqual([{
        instance: "test1",
        listener: testFunction1
      }, {
        instance: "test2",
        listener: testFunction2
      }]);
    });
    it("on - overwites method to events object when using same instance key", () => {
      expect(Object.keys(ClientEvent.events).length).toBe(0);
      const testFunction1 = () => undefined;
      const testFunction2 = () => undefined;

      ClientEvent.on(ClientEventTypes.SET_SNACK_BAR_MSG, "test1", testFunction1);
      ClientEvent.on(ClientEventTypes.SET_SNACK_BAR_MSG, "test1", testFunction2);

      expect(Object.keys(ClientEvent.events).length).toBe(1);
      expect(ClientEvent.events[ClientEventTypes.SET_SNACK_BAR_MSG].length).toBe(1);

      expect(ClientEvent.events[ClientEventTypes.SET_SNACK_BAR_MSG]).toEqual([{
        instance: "test1",
        listener: testFunction2
      }]);
    });
  });

  describe("clearAll", function () {
    it("clearAll - Removes all events", () => {
      const testFunction = () => undefined;

      ClientEvent.on(ClientEventTypes.SET_SNACK_BAR_MSG, "clearall", testFunction);
      expect(Object.keys(ClientEvent.events).length).toBeGreaterThan(0);
      ClientEvent.clearAll();
      expect(Object.keys(ClientEvent.events).length).toBe(0);
    });
  });

  describe('emit', function () {
    it('will send call to listener', () => {
      const spyFunction = jest.fn();
      ClientEvent.on(ClientEventTypes.SET_SNACK_BAR_MSG, "spy", spyFunction);
      ClientEvent.emit(ClientEventTypes.SET_SNACK_BAR_MSG, "Message Sent!");
      expect(spyFunction).toBeCalledWith("Message Sent!");
    });
    it('will send call to multiple listener', () => {
      const spyFunction1 = jest.fn();
      const spyFunction2 = jest.fn();
      ClientEvent.on(ClientEventTypes.SET_SNACK_BAR_MSG, "spy1", spyFunction1);
      ClientEvent.on(ClientEventTypes.SET_SNACK_BAR_MSG, "spy2", spyFunction2);
      ClientEvent.emit(ClientEventTypes.SET_SNACK_BAR_MSG, "Message Sent!");
      expect(spyFunction1).toBeCalledWith("Message Sent!");
      expect(spyFunction2).toBeCalledWith("Message Sent!");
    });
    it('will only send to proper listener type', () => {
      const spyFunction1 = jest.fn();
      const spyFunction2 = jest.fn();
      ClientEvent.on(ClientEventTypes.SET_SNACK_BAR_MSG, "spy1", spyFunction1);
      ClientEvent.on(ClientEventTypes.OTHER, "spy2", spyFunction2);
      ClientEvent.emit(ClientEventTypes.SET_SNACK_BAR_MSG, "Message Sent!");
      expect(spyFunction1).toBeCalledWith("Message Sent!");
      expect(spyFunction2).not.toBeCalled();
    });
    it('will gracefully handle empty events array', () => {
      ClientEvent.events[ClientEventTypes.SET_SNACK_BAR_MSG] = [];
      ClientEvent.emit(ClientEventTypes.SET_SNACK_BAR_MSG, "Message Sent!");
      ClientEvent.emit(ClientEventTypes.OTHER, "Message Sent!");
    });
  });

  describe("off", function () {
    it('will remove instance of event from events', () => {
      const spyFunction1 = jest.fn();

      // add an event with one instance to the events list
      ClientEvent.on(ClientEventTypes.SET_SNACK_BAR_MSG, "spy1", spyFunction1);
      expect(Object.keys(ClientEvent.events).length).toEqual(1);
      expect(ClientEvent.events[ClientEventTypes.SET_SNACK_BAR_MSG].length).toEqual(1);

      // call 'off' on the newly added event and instance and make sure the event event is still present, but the instance is gone
      ClientEvent.off(ClientEventTypes.SET_SNACK_BAR_MSG, "spy1");
      expect(Object.keys(ClientEvent.events).length).toEqual(1);
      expect(ClientEvent.events[ClientEventTypes.SET_SNACK_BAR_MSG].length).toEqual(0);
    });

    it('will remove instance of event only from specified event when there are more than one events with instances that contain the same instance key', () => {
      const spyFunction1 = jest.fn();
      const spyFunction2 = jest.fn();

      // add two events with one instance each to the events list
      ClientEvent.on(ClientEventTypes.SET_SNACK_BAR_MSG, "spy1", spyFunction1);
      ClientEvent.on(ClientEventTypes.OTHER, "spy1", spyFunction2);

      // make sure the two events exist and each contains its one instance
      expect(Object.keys(ClientEvent.events).length).toEqual(2);
      expect(ClientEvent.events[ClientEventTypes.SET_SNACK_BAR_MSG].length).toEqual(1);
      expect(ClientEvent.events[ClientEventTypes.OTHER].length).toEqual(1);

      // remove the instance from the 'SET_SNACK_BAR_MSG' event, but not the 'OTHER' event
      ClientEvent.off(ClientEventTypes.SET_SNACK_BAR_MSG, "spy1");

      // make sure the 'SET_SNACK_BAR_MSG' event exists still, but that the instance was removed and make sure the 'OTHER' event and instance remain untouched
      expect(Object.keys(ClientEvent.events).length).toEqual(2);
      expect(ClientEvent.events[ClientEventTypes.SET_SNACK_BAR_MSG].length).toEqual(0);
      expect(ClientEvent.events[ClientEventTypes.OTHER].length).toEqual(1);
    });
    it('events remain unchanged if instance key does not exist', () => {
      const spyFunction1 = jest.fn();

      // add an event with one instance to the events list
      ClientEvent.on(ClientEventTypes.SET_SNACK_BAR_MSG, "spy1", spyFunction1);
      expect(Object.keys(ClientEvent.events).length).toEqual(1);
      expect(ClientEvent.events[ClientEventTypes.SET_SNACK_BAR_MSG].length).toEqual(1);

      // call 'off' on the newly added event but with an instance that doesnt exist, make sure events remain unchanged
      ClientEvent.off(ClientEventTypes.SET_SNACK_BAR_MSG, "notAnInstance");
      expect(Object.keys(ClientEvent.events).length).toEqual(1);
      expect(ClientEvent.events[ClientEventTypes.SET_SNACK_BAR_MSG].length).toEqual(1);
    });

  });

});