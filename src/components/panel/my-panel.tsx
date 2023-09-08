import { Component, ComponentInterface, Host, Listen, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-panel',
  styleUrl: 'my-panel.css',
  shadow: true,
})
export class MyPanel implements ComponentInterface {
  private menu: HTMLMyPanelActionMenuElement;

  @Prop() actions = [
    'DRILL_DOWN',
    'SEE_DATA',
    {
      label: 'Drill To chart',
      trigger(evt) {
        console.log('This is a custom click action', evt)
      }
    },
    {
      label: 'go to url',
      trigger(evt) {
        console.log('This is a custom click action', evt)
      }
    }
  ];


  @Listen('notifyToParent', { capture: true })
  subscribeChildren(evt) {
    evt.stopImmediatePropagation();
    this.menu.dataToDispatch = evt.detail?.data;
    this.menu.show();
  }

  render() {
    return <Host>
      <h2>I'm the Parent</h2>
      <my-child />
      
      <my-panel-action-menu 
      ref={el => this.menu = el }
      menuItems={this.actions}
      />
    </Host>;
  }

}
