import { Component, ComponentInterface } from '@stencil/core';
import { StateManager } from './store';

@Component({
  tag: 'store-demo-child',
})
export class StoreDemoChild implements ComponentInterface {
  private readonly state = StateManager.get(this);

  render() {
    return `Este es el Child: ${this.state.seconds} seconds`;
  }
}
