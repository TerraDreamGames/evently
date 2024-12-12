type EventHandler<T> = (eventData: T) => void;

interface EventDefinitionsType<T> {
	on<K extends keyof T>(eventName: K, handler: EventHandler<T[K]>): void;
	trigger<K extends keyof T>(eventName: K, eventData: T[K]): void;
}

function EventDefinitions<T extends Record<string, unknown>>(): EventDefinitionsType<T> {
	const handlers: Partial<{ [K in keyof T]: Array<EventHandler<T[K]>> }> = {};

	return {
		on<K extends keyof T>(eventName: K, handler: EventHandler<T[K]>): void {
			if (!handlers[eventName]) {
				handlers[eventName] = [];
			}
			handlers[eventName].push(handler);
		},

		trigger<K extends keyof T>(eventName: K, eventData: T[K]): void {
			const eventHandlers = handlers[eventName];
			if (eventHandlers) {
				eventHandlers.forEach((handler) => {
					handler(eventData);
				});
			}
		},
	};
}

export = EventDefinitions;
