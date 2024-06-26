import React, { useState } from "react";
import { Button, Spinner } from "../../components";
import { Modal } from "react-bootstrap";
import { InstallerState } from "../../services";
import { Progress } from "../../panels";
import { FlashProgress } from "../../services/FlashService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import BootloaderInfo from "../../panels/bootloaderinfo/BootloaderInfo";
import Log from "../log/Log";

type InstallerModalProps = {
    state: InstallerState;
    progress: FlashProgress;
    errorMessage: string | undefined;
    onClose: () => void;
    log: string;
};

const InstallerModal = ({
    state,
    progress,
    errorMessage,
    onClose,
    log
}: InstallerModalProps) => {
    const [showLog, setShowLog] = useState<boolean>(false);

    return (
        <Modal centered show={true} size="lg">
            <Modal.Body>
                {(state === InstallerState.DOWNLOADING ||
                    state === InstallerState.CHECKING_SIGNATURES) && (
                    <>
                        <h3>Downloading</h3>
                        <p>
                            Downloading package... <Spinner />
                        </p>
                    </>
                )}
                {state === InstallerState.ENTER_FLASH_MODE && (
                    <BootloaderInfo />
                )}
                {state === InstallerState.FLASHING && (
                    <Progress progress={progress} status={state} />
                )}
                {state === InstallerState.RESTARTING && (
                    <>
                        <h3>Restarting</h3>
                        <p>
                            Waiting for controller restart... <Spinner />
                        </p>
                    </>
                )}
                {state === InstallerState.DONE && (
                    <>
                        <h3>Done</h3>
                        <p>
                            The controller has been successfully installed and
                            is ready to be used.
                        </p>
                    </>
                )}
                {state === InstallerState.ERROR && (
                    <>
                        <h3>Error!</h3>
                        <div className="alert alert-danger">
                            <FontAwesomeIcon icon={faBan as IconDefinition} />{" "}
                            {errorMessage}
                        </div>
                    </>
                )}
                <Log show={showLog} onShow={setShowLog}>
                    {log}
                </Log>
            </Modal.Body>
            {state === InstallerState.DONE && (
                <Modal.Footer>
                    <Button onClick={onClose}>
                        <>Continue</>
                    </Button>
                </Modal.Footer>
            )}
            {state === InstallerState.ERROR && (
                <Modal.Footer>
                    <Button onClick={onClose}>
                        <>Close</>
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default InstallerModal;
