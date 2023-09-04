import { Component, ComponentInterface, Fragment, Prop, h } from '@stencil/core';
import { StateManager } from './store';

@Component({
  tag: 'store-demo',
  styles: 'store-demo {display: block; border: 1px solid; padding: 10px; margin: 10px}',
})
export class StoreDemo implements ComponentInterface {
  private readonly state = StateManager.new(this);

  @Prop() start = 0;

  componentWillLoad() {
    this.state.seconds = this.start;
    setInterval(() => this.state.seconds++, 1000);
  }

  disconnectedCallback(): void {
    StateManager.delete(this);
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
