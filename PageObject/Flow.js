var env = require('../env.conf');
var mqtt = require('async-mqtt');

let I = actor();
// let ids;
var deviceId;

module.exports = {

    init(i) {
        I = i;
    },

    async createDevice(){
        let template = await I.createTemplate({
            label: "String Template",
            attrs: [
                {
                    label: "input",
                    type: "dynamic",
                    value_type: "string"
                },
                {
                    label: "output",
                    type: "dynamic",
                    value_type: "string"
                }
            ]
        });
        console.log('template created...');
    
        let templateId = template['template']['id'];
    
        let device = await I.createDevice({
            "templates": [
                templateId
            ],
            "label": "String device"
        });
        console.log('device created...');
        
        return device['devices'][0]['id'];
    },

    clickOpen() {
        I.click(locate('a').withAttr({href: '#/flows'}));
    },

    clickCreateNew() {
        I.click(locate('a').withAttr({href: '#/flows/new'}));
        I.wait(1);
    },

    setFlowName(value){
        I.fillField('Flow name', value);
    },

    addDeviceInput(){
        I.dragSlider("#palette_node_device_in", 400);
    },

    addSwitch(){
        I.dragSlider("#palette_node_switch", 600);
    },

    addChange(){
        I.dragSlider("#palette_node_change", 800);
    },

    addDeviceOutput(){
        I.dragSlider("#palette_node_device_out", 1000);
    },

    addNotification(){
        I.dragSlider("#palette_node_notification", 1200);
    },


    async connectFlows(){
        ids = await I.grabAttributeFrom('.nodegroup', 'id');
        I.dragAndDrop(locate(`.port_output`).inside(`#${ids[0]}`), locate(`.port_input`).inside(`#${ids[1]}`));
        I.dragAndDrop(locate(`.port_output`).inside(`#${ids[1]}`), locate(`.port_input`).inside(`#${ids[2]}`));
        I.dragAndDrop(locate(`.port_output`).inside(`#${ids[2]}`), locate(`.port_input`).inside(`#${ids[3]}`));
        I.dragAndDrop(locate(`.port_output`).inside(`#${ids[2]}`), locate(`.port_input`).inside(`#${ids[4]}`));
    },

    clickOnDeviceInput(){
        I.click(`#${ids[0]}`);
        I.doubleClick(`#${ids[0]}`);
    },

    editDeviceInputName(){
        I.fillField('#node-input-name', "my input");
    },

    selectDevice(deviceId){
        I.fillField('#node-input-device_source_id', `String device (${deviceId})`);
    },

    clickOnDone(){
        I.click("Done");
    },

    clickOnSwitch(){
        I.click(`#${ids[1]}`);
        I.doubleClick(`#${ids[1]}`);
    },

    editSwitchProperty(){
        I.fillField('#node-input-property', 'payload.input');
    },

    editSwitchCondition(){
        I.fillField('.node-input-rule-value', 'input value');
    },

    clickOnChange(){
        I.click(`#${ids[2]}`);
        I.doubleClick(`#${ids[2]}`);
    },

    editChangeProperty(){
        I.fillField('.node-input-rule-property-name', 'out.output');
    },

    editChangePropertyValue(){
        I.fillField('.node-input-rule-property-value', 'output value');
    },

    clickOnDeviceOutput(){
        I.click(`#${ids[3]}`);
        I.doubleClick(`#${ids[3]}`);
    },

    editDeviceOutputSource(){
        I.fillField('#node-input-attrs', 'out');
    },

    clickOnSave(){
        I.click('.new-btn-circle');
    },

    seeFlowHasCreated() {
        I.wait(1);
        I.see('Flow created.');
    },

    async sendMQTTMessages(deviceId){
        await I.sendMQTTMessage(deviceId, '{"input": "input value"}');
        await I.sendMQTTMessage(deviceId, '{"input": "input value"}');
    }



}
