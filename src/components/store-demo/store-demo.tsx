import { Component, ComponentInterface, Fragment, Prop, h } from '@stencil/core';
import { DemoStateManager } from './DemoStateMamanger';

@Component({
  tag: 'store-demo',
  styles: 'store-demo {display: block; border: 1px solid; padding: 10px; margin: 10px}',
})
export class StoreDemo implements ComponentInterface {
  private readonly state = DemoStateManager.new(this);

  @Prop() start = 0;

  componentWillLoad() {
    this.state.seconds = this.start;
    setInterval(() => this.state.seconds++, 1000);
  }

  disconnectedCallback(): void {
    DemoStateManager.delete(this);
  }

  render() {
    return (
      <Fragment>
        Este es el Parent: {this.state.seconds}
        <br/>
        <store-demo-child />
      </Fragment>
    );
  }
}
