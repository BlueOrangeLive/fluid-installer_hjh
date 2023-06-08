import React, { useEffect, useState } from "react";
import { Config } from "../../model/Config";
import {

    Container,

    Nav,
    Row,
    Tab
} from "react-bootstrap";
import TextField from "./fields/TextField";
import SelectField from "./fields/SelectField";
import yamlConfig from "../../configs/6P_extn";
import jsYaml from "js-yaml";

import { StreamLanguage } from "@codemirror/language";
import { linter, lintGutter } from "@codemirror/lint";
import * as yamlMode from "@codemirror/legacy-modes/mode/yaml";
import AxesGroup from "./groups/AxesGroup";
import { Boards } from "../../model/Boards";
import SPIGroup from "./groups/SPIGroup";
import SteppingGroup from "./groups/SteppingGroup";
import I2SOGroup from "./groups/I2SOGroup";
import SDCardGroup from "./groups/SDCardGroup";
import Editor from "../../components/editor/Editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const DEFAULT_CONFIG: Config = {};

const yamlExtension = StreamLanguage.define(yamlMode.yaml);

const yamlLinter = linter((view) => {
    const diagnostics: any[] = [];

    try {
        jsYaml.load(view.state.doc);
    } catch (e) {
        const loc = e.mark;
        const from = loc ? loc.position : 0;
        const to = from;
        const severity = "error";

        diagnostics.push({
            from,
            to,
            message: e.message,
            severity
        });
    }

    return diagnostics;
});

const Configuration = ({ onClose }) => {
    const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
    const [configString, setConfigString] = useState<string>(yamlConfig);
    const [tab, setTab] = useState<string>("general");
    const [lintErrors, setLintErrors] = useState<any[]>([]);

    const appendConfig = (conf) => {
        const newConfig = { ...config, ...conf };
        setConfig(newConfig);
        setConfigString(jsYaml.dump(newConfig));
    };

    useEffect(() => {
        try {
            const data = jsYaml.load(configString);
            const newData = { ...data, ...config };
            setConfigString(jsYaml.dump(newData));
        } catch (error) {
            console.log("Could not parse yaml");
        }
    }, []);

    useEffect(() => {
        try {
            const data = jsYaml.load(configString);
            setConfig((config) => {
                return {
                    ...config,
                    ...data
                };
            });
        } catch (error) {
            console.log(error);
        }
    }, [configString]);

    return (
        <Container>
            <br />
            <Tab.Container defaultActiveKey="general">
                <Nav
                    fill
                    variant="tabs"
                    onSelect={(tabId) => setTab(tabId as string)}>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="general"
                            disabled={lintErrors.length > 0}>
                            General{" "}
                            {lintErrors.length > 0 && (
                                <FontAwesomeIcon
                                    icon={faWarning as IconDefinition}
                                />
                            )}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="axes"
                            disabled={lintErrors.length > 0}>
                            Axes{" "}
                            {lintErrors.length > 0 && (
                                <FontAwesomeIcon
                                    icon={faWarning as IconDefinition}
                                />
                            )}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="io"
                            disabled={lintErrors.length > 0}>
                            IO{" "}
                            {lintErrors.length > 0 && (
                                <FontAwesomeIcon
                                    icon={faWarning as IconDefinition}
                                />
                            )}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="spindle"
                            disabled={lintErrors.length > 0}>
                            Spindle{" "}
                            {lintErrors.length > 0 && (
                                <FontAwesomeIcon
                                    icon={faWarning as IconDefinition}
                                />
                            )}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            eventKey="source"
                            disabled={lintErrors.length > 0}>
                            Source
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    <br />
                    <Tab.Pane eventKey="general">
                        <h4>Board information</h4>
                        <TextField
                            label="Name"
                            placeholder="A descriptive name of the configuration"
                            value={config.name}
                            setValue={(value) => appendConfig({ name: value })}
                        />
                        <SelectField
                            label="Board"
                            value={config.board}
                            options={[{ name: "6 Pack", value: "6 Pack" }]}
                            setValue={(value) => appendConfig({ board: value })}
                        />
                        <TextField
                            label="Meta"
                            placeholder="Meta information"
                            value={config.meta}
                            setValue={(value) => appendConfig({ meta: value })}
                        />

                        <br />
                        <br />

                        <SteppingGroup steppingConfig={config.stepping} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="axes">
                        <AxesGroup
                            board={Boards[0]}
                            axes={config.axes}
                            setValue={(value) => appendConfig({ axes: value })}
                        />
                    </Tab.Pane>
                    <Tab.Pane eventKey="io">
                        <I2SOGroup
                            board={Boards[0]}
                            i2so={config.i2so}
                            setValue={(i2so) => appendConfig({ i2so })}
                        />

                        <SPIGroup
                            board={Boards[0]}
                            spi={config.spi}
                            setValue={(spi) => appendConfig({ spi })}
                        />

                        <SDCardGroup
                            board={Boards[0]}
                            sdcard={config.sdcard}
                            setValue={(sdcard) => appendConfig({ sdcard })}
                        />
                    </Tab.Pane>
                    <Tab.Pane eventKey="source">
                        <Editor
                            value={configString}
                            onChange={setConfigString}
                            onLint={setLintErrors}
                            maxHeight="800px"
                            extensions={[lintGutter(), yamlLinter]}
                        />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    );
};

export default Configuration;