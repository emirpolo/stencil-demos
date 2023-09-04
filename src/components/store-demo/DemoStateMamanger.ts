import { ComponentInterface, getElement } from '@stencil/core';
import { createStore } from '@stencil/store';

interface IStore {
  seconds: number;
}

const Manager = new Map<string, IStore>();
const initialState: IStore = { seconds: 0 };

let parentElementName;

export const DemoStateManager = {
  /**
   * This creates a new Store 
   * It must be called by the Main Componente (Parent) in any initial hook (constructor, connectecCallbacl, componentWillLoad) or directly asiggned to a property
   * @param componentRef this is the context (this) of the stencil component 
   * @returns {IStore} state - the State Manager 
   * @example
   * private state = StateManager.new(this);
   */
  new(componentRef: ComponentInterface) {
    const { state } = createStore<IStore>(initialState);
    const parentElement = getElement(componentRef);
    const id = crypto['randomUUID']();
    
    parentElement.dataset.id = id; // Save ID in the element storage 
    parentElementName = parentElement.tagName.toLowerCase(); // save the parent tag name, required for childrends 

    Manager.set(id, state);

    return state;
  },

  /**
   * Delete the State from the StateManager Map
   * this must be called by the Main Componente (Parent), on DisconnectedCallback Hook
   * @param componentRef this is the context (this) of the stencil component 
   */
  delete(componentRef: ComponentInterface) {
    const id = getElement(componentRef).dataset.id;
    Manager.delete(id);
  },

  /**
   * This return an existing state
   * This must be called by child components 
   * @param componentRef this is the context (this) of the stencil component 
   * @returns {IStore} state - the State Manager
   * @example
   * private state = StateManager.get(this); 
   */
  get(componentRef: ComponentInterface) {
    const mainElement: HTMLElement = getElement(componentRef).closest(parentElementName);
    const id = mainElement?.dataset.id || '';
    return Manager.get(id);
  },
};
