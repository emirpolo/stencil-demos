import { Component, ComponentInterface, Listen, Method, Prop, h } from '@stencil/core';

const coreActionsDictionary = {
    SEE_DATA: { label: 'See Data', key: 'seeData' },
    FILTER_BY: { label: 'Filter By', key: 'fiterBy' },
    DRILL_DOWN: { label: 'Drill Down', key: 'drillDown' },
}

@Component({
    tag: 'my-panel-action-menu',
    shadow: true,
})
export class MyPanelMenu implements ComponentInterface {
    private dialog: HTMLDialogElement;

    @Prop() menuItems = [];

    /** Data that will be triggered when a menu item is clicked */
    @Prop() dataToDispatch = {};

    @Listen('click', { target: 'window', capture: true })
    clickOutside() {
        this.dialog.close();
    }

    @Method()
    async show() {
        this.dialog.show();
    }

    private dispatch(action) {
        console.log(
            action,
            this.dataToDispatch
        )
    }

    private renderMenuItems() {
        return this.menuItems.map((item) => {
            let value, id;

            if (typeof item === 'string') {
                const { key, label } = coreActionsDictionary[item] || {};
                id = key;
                value = label;
            }
            else {
                id = 'custom';
                value = item?.label;
            }

            return <li
                data-key={id}
                onClick={() => this.dispatch(id)}
            >{value}</li>
        });
    }


    render() {
        const itemSize = this.menuItems?.length || 0;

        if (itemSize === 0) return;

        // if (!shouldshowMenu){ 
        //     // dispatchEvent
        //     return
        // }

        return <dialog ref={el => this.dialog = el}>
            <ul>
                {this.renderMenuItems()}
            </ul>
        </dialog>;
    }

}
