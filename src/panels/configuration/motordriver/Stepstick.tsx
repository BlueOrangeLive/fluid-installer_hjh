import React from "react";
import { Board } from "../../../model/Boards";
import { Motor, PinConfig } from "../../../model/Config";
import PinField from "../../../components/fields/PinField";

type StepstickProps = {
    board: Board;
    motor: Motor;
    updateMotorDriverValue: (motor: Motor) => void;
    usedPins: Map<string, PinConfig>;
};

const Stepstick = ({
    board,
    motor,
    updateMotorDriverValue,
    usedPins
}: StepstickProps) => {
    return (
        <>
            <PinField
                label="Step pin"
                board={board}
                value={PinConfig.fromString(motor?.stepstick?.step_pin)}
                setValue={(value) =>
                    updateMotorDriverValue({
                        stepstick: {
                            step_pin: value.toString()
                        }
                    })
                }
                usedPins={usedPins}
            />

            <PinField
                label="Direction pin"
                board={board}
                value={PinConfig.fromString(motor?.stepstick?.direction_pin)}
                setValue={(value) =>
                    updateMotorDriverValue({
                        stepstick: {
                            direction_pin: value.toString()
                        }
                    })
                }
                usedPins={usedPins}
            />

            <PinField
                label="Disable pin"
                board={board}
                value={PinConfig.fromString(motor?.stepstick?.disable_pin)}
                setValue={(value) =>
                    updateMotorDriverValue({
                        stepstick: {
                            disable_pin: value.toString()
                        }
                    })
                }
                usedPins={usedPins}
            />

            <PinField
                label="MS1 pin"
                board={board}
                value={PinConfig.fromString(motor?.stepstick?.ms1_pin)}
                setValue={(value) =>
                    updateMotorDriverValue({
                        stepstick: {
                            ms1_pin: value.toString()
                        }
                    })
                }
                usedPins={usedPins}
            />

            <PinField
                label="MS2 pin"
                board={board}
                value={PinConfig.fromString(motor?.stepstick?.ms2_pin)}
                setValue={(value) =>
                    updateMotorDriverValue({
                        stepstick: {
                            ms2_pin: value.toString()
                        }
                    })
                }
                usedPins={usedPins}
            />

            <PinField
                label="MS3 pin"
                board={board}
                value={PinConfig.fromString(motor?.stepstick?.ms3_pin)}
                setValue={(value) =>
                    updateMotorDriverValue({
                        stepstick: {
                            ms3_pin: value.toString()
                        }
                    })
                }
                usedPins={usedPins}
            />
        </>
    );
};

export default Stepstick;
