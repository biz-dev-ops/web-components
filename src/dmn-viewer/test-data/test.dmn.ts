export default `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" xmlns:di="http://www.omg.org/spec/DMN/20180521/DI/" xmlns:modeler="http://camunda.org/schema/modeler/1.0" id="Definitions_1y42u6n" name="DRD" namespace="http://camunda.org/schema/1.0/dmn" exporter="Camunda Modeler" exporterVersion="5.8.0" modeler:executionPlatform="Camunda Platform" modeler:executionPlatformVersion="7.18.0">
  <decision id="Decision_16wqg49" name="Decision 1">
    <informationRequirement id="InformationRequirement_139spcv">
      <requiredInput href="#InputData_1029ovb" />
    </informationRequirement>
    <knowledgeRequirement id="KnowledgeRequirement_11rexb3">
      <requiredKnowledge href="#BusinessKnowledgeModel_1j6tzvf" />
    </knowledgeRequirement>
    <authorityRequirement id="AuthorityRequirement_0ttokok">
      <requiredAuthority href="#KnowledgeSource_0ufj5ng" />
    </authorityRequirement>
    <decisionTable id="DecisionTable_1wi1sbd">
      <input id="Input_1">
        <inputExpression id="InputExpression_1" typeRef="string">
          <text></text>
        </inputExpression>
      </input>
      <output id="Output_1" typeRef="string" />
    </decisionTable>
  </decision>
  <inputData id="InputData_1029ovb" />
  <businessKnowledgeModel id="BusinessKnowledgeModel_1j6tzvf">
    <variable id="InformationItem_08hmx5m" />
    <encapsulatedLogic id="FunctionDefinition_18otr4y">
      <literalExpression id="LiteralExpression_1sdpl2e" />
    </encapsulatedLogic>
  </businessKnowledgeModel>
  <knowledgeSource id="KnowledgeSource_0ufj5ng" />
  <dmndi:DMNDI>
    <dmndi:DMNDiagram>
      <dmndi:DMNShape dmnElementRef="Decision_16wqg49">
        <dc:Bounds height="80" width="180" x="260" y="160" />
      </dmndi:DMNShape>
      <dmndi:DMNShape id="DMNShape_18ve2rd" dmnElementRef="InputData_1029ovb">
        <dc:Bounds height="45" width="125" x="288" y="338" />
      </dmndi:DMNShape>
      <dmndi:DMNEdge id="DMNEdge_1tldqrq" dmnElementRef="InformationRequirement_139spcv">
        <di:waypoint x="351" y="338" />
        <di:waypoint x="350" y="260" />
        <di:waypoint x="350" y="240" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge id="DMNEdge_18by0zj" dmnElementRef="KnowledgeRequirement_11rexb3">
        <di:waypoint x="595" y="338" />
        <di:waypoint x="440" y="199" />
      </dmndi:DMNEdge>
      <dmndi:DMNShape id="DMNShape_00l7wpp" dmnElementRef="BusinessKnowledgeModel_1j6tzvf">
        <dc:Bounds height="46" width="135" x="553" y="338" />
      </dmndi:DMNShape>
      <dmndi:DMNShape id="DMNShape_0zmszs6" dmnElementRef="KnowledgeSource_0ufj5ng">
        <dc:Bounds height="63" width="100" x="50" y="330" />
      </dmndi:DMNShape>
      <dmndi:DMNEdge id="DMNEdge_0xbzuim" dmnElementRef="AuthorityRequirement_0ttokok">
        <di:waypoint x="145" y="330" />
        <di:waypoint x="272" y="240" />
      </dmndi:DMNEdge>
    </dmndi:DMNDiagram>
  </dmndi:DMNDI>
</definitions>`;