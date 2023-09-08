import { Component, ComponentInterface, Event, EventEmitter, Host, Listen, h } from '@stencil/core';

@Component({
  tag: 'my-subchild',
  styleUrl: 'my-panel.css',
  shadow: true,
})
export class MySubChild implements ComponentInterface {
  @Event() notifyToParent: EventEmitter<{ action: string, data, originalEvent }>;

  @Listen('click')
  clickHanlder(originalEvent): void {
   
    this.notifyToParent.emit({
      action: 'datapointClick',
      originalEvent,

      data: {
        category: 'A',
        value: 1,
        // modelChart
        // tokens 
      },
    });
  }

  render() {
    return (
      <Host>
        <h4>I'm sub-child</h4>
      </Host>
    );
  }

}
