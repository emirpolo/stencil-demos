import { ComponentInterface, getElement } from '@stencil/core';
import { createStore } from '@stencil/store';

interface IStore {
  seconds: number;
}

const Manager = new Map<string, IStore>();
const initialState: IStore = { seconds: 0 };

globalThis.manager = Manager;

let parentElementName;

export const StateManager = {
  new(componentRef: ComponentInterface) {
    const { state } = createStore<IStore>(initialState);
    const parentElement = getElement(componentRef);
    const id = (parentElement.dataset.id = crypto['randomUUID']());

    parentElementName = parentElement.tagName.toLowerCase();
    Manager.set(id, state);

    return state;
  },
  get(componentRef: ComponentInterface) {
    const mainElement: HTMLElement = getElement(componentRef).closest(parentElementName);
    const id = mainElement?.dataset.id;
    return Manager.get(id);
  },
  delete(componentRef: ComponentInterface) {
    const id = getElement(componentRef).dataset.id;
    Manager.delete(id);
  },
};
