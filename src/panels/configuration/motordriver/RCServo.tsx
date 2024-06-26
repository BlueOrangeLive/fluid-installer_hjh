import React from "react";
import { Board } from "../../../model/Boards";
import { Motor, PinConfig } from "../../../model/Config";
import PinField from "../../../components/fields/PinField";
import TextField from "../../../components/fields/TextField";

type RCServoProps = {
    board: Board;
    motor: Motor;
    updateMotorDriverValue: (motor: Motor) => void;
    usedPins: Map<string, PinConfig>;
};

const RCServo = ({
    board,
    motor,
    updateMotorDriverValue,
    usedPins
}: RCServoProps) => {
    return (
        <>
            <PinField
                label="Output pin"
                board={board}
                value={PinConfig.fromString(motor?.rc_servo?.output_pin)}
                setValue={(value) =>
                    updateMotorDriverValue({
                        rc_servo: {
                            output_pin: value.toString()
                        }
                    })
                }
                usedPins={usedPins}
            />

            <TextField
                label="PWM"
                value={motor?.rc_servo?.pwm_hz ?? 50}
                setValue={(value) =>
                    updateMotorDriverValue({
                        rc_servo: {
                            pwm_hz: Number(value)
                        }
                    })
                }
                unit="Hz"
            />

            <TextField
                label="Min pulse"
                value={motor?.rc_servo?.min_pulse_us ?? 1000}
                setValue={(value) =>
                    updateMotorDriverValue({
                        rc_servo: {
                            min_pulse_us: Number(value)
                        }
                    })
                }
                unit="µS"
            />
            <TextField
                label="Max pulse"
                value={motor?.rc_servo?.max_pulse_us ?? 2000}
                setValue={(value) =>
                    updateMotorDriverValue({
                        rc_servo: {
                            max_pulse_us: Number(value)
                        }
                    })
                }
                unit="µS"
            />
        </>
    );
};

export default RCServo;
