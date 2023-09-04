import { Component, ComponentInterface } from '@stencil/core';
import { DemoStateManager } from './DemoStateMamanger';

@Component({
  tag: 'store-demo-child',
})
export class StoreDemoChild implements ComponentInterface {
  private readonly state = DemoStateManager.get(this);

  render() {
    return `Este es el Child: ${this.state.seconds} seconds`;
  }
}
