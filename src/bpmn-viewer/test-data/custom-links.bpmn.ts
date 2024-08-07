export default `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:modeler="http://camunda.org/schema/modeler/1.0" id="Definitions_07ptvjq" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="5.24.0" modeler:executionPlatform="Camunda Cloud" modeler:executionPlatformVersion="8.5.0" xmlns:bizdevops="https://github.com/biz-dev-ops/web-components/schema/1.0">
  <bpmn:process id="Process_0pr0dze" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:outgoing>Flow_09122oy</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:userTask id="Activity_0vl2m4j" name="Test">
      <bpmn:incoming>Flow_09122oy</bpmn:incoming>
      <bpmn:outgoing>Flow_1ibejop</bpmn:outgoing>
      <bpmn:extensionElements>
        <bizdevops:links>
          <bizdevops:link name="Test" value="www.test.com" />
          <bizdevops:link value="www.test2.com" />
        </bizdevops:links>
      </bpmn:extensionElements>
    </bpmn:userTask>
    <bpmn:endEvent id="Event_05d9n1q">
      <bpmn:incoming>Flow_1ibejop</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1ibejop" sourceRef="Activity_0vl2m4j" targetRef="Event_05d9n1q" />
    <bpmn:sequenceFlow id="Flow_09122oy" sourceRef="StartEvent_1" targetRef="Activity_0vl2m4j" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0pr0dze">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="279" y="99" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0vl2m4j_di" bpmnElement="Activity_0vl2m4j">
        <dc:Bounds x="370" y="77" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_05d9n1q_di" bpmnElement="Event_05d9n1q">
        <dc:Bounds x="522" y="99" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1ibejop_di" bpmnElement="Flow_1ibejop">
        <di:waypoint x="470" y="117" />
        <di:waypoint x="522" y="117" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_09122oy_di" bpmnElement="Flow_09122oy">
        <di:waypoint x="315" y="117" />
        <di:waypoint x="370" y="117" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;
