import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'my-child',
  styleUrl: 'my-panel.css',
  shadow: true,
})
export class MyChild {

  render() {
    return <Host>
      <h3>I'm a child</h3>
      <my-subchild />
    </Host>;
  }

}
