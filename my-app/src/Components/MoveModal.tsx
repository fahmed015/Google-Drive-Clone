import React, { useState, useEffect } from "react";
import { Button, Modal, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  updateFolderOrFile,
  getFoldersForMoveModal,
} from "../Firebase/Firebase";
// import { StateRoot } from "../Store/Reducer";

interface PropsMoveType {
  show: boolean;
  moveItem: string;
  moveItemType: string;
  closeMoveModal: () => void;
}

export default function MoveModal({
  show,
  moveItem,
  moveItemType,
  closeMoveModal,
}: PropsMoveType) {
  const user = useSelector((state: StateRoot) => state.user);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [selectFolder, setSelectFolder] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [disable, setDisable] = useState<boolean>(true);
  const [arrFolder, setArrFolder] = useState<ArrayMove[]>([]);

  const showFolders = async (
    folderId: string | null,
    moveItem: string,
    back: boolean
  ) => {
    if (back === true) {
      const newarr = history.slice(0, -1);

      setHistory(newarr);

      await setHistory((prev) => {
        if (prev.length === 0) {
          setDisable(true);
          folderId = null;
        } else {
          setDisable(false);
          folderId = prev.slice(-1)[0];
        }

        return prev;
      });
    } else {
      if (folderId === null) {
        setDisable(true);
      } else {
        setDisable(false);
        const x = [folderId];
        setHistory((prev) => [...prev, ...x]);
        setHistory((prev) => {
          return prev;
        });
      }
    }
    const arr = await getFoldersForMoveModal(folderId, user.uid, moveItem);
    setArrFolder(arr);
  };

  useEffect(() => {
    setShowModel(show);
    if (show === true) {
      showFolders(null, moveItem, false);
    }
  }, [show, moveItem]);

  const handleClose = () => {
    setHistory([]);
    setSelectFolder(null);
    closeMoveModal();
    // setShowModel(false);
  };

  const moveFolder = () => {
    updateFolderOrFile(moveItemType, selectFolder, moveItem);
    handleClose();
  };

  const selectFromList = (id: string) => {
    setArrFolder(
      arrFolder.map((folder) => {
        if (folder.id === id) {
          setSelectFolder(id);
          return { ...folder, activecond: true };
        } else {
          return { ...folder, activecond: false };
        }
      })
    );
  };

  return (
    <Modal show={showModel} onHide={handleClose}>
      <Modal.Header closeButton>
        <Button
          disabled={disable}
          onClick={() => showFolders(null, moveItem, true)}
        >
          ←
        </Button>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {arrFolder.map((folder) => {
            return (
              <ListGroup.Item
                className="d-flex justify-content-between align-items-start"
                key={folder.id}
                disabled={folder.disablecond}
                action
                active={folder.activecond}
                onClick={() => selectFromList(folder.id)}
              >
                <div> {folder.foldername}</div>
                <Button
                  variant="light"
                  disabled={folder.disablecond}
                  onClick={() => showFolders(folder.id, moveItem, false)}
                >
                  →{" "}
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={moveFolder}>
          Move Here
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
