import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { updateFolderOrFile, getFoldersForMoveModal } from '../Firebase/Firebase';
import { StateRoot } from '../Store/Reducer';
export default function MoveModal({ show, moveItem, moveItemType, closeMoveModal }) {
  const user = useSelector((state: StateRoot) => state.user);
  const [showModel, setShowModel] = useState(false);
  const [selectFolder, setSelectFolder] = useState(null);
  const [history, setHistory] = useState([]);
  const [disable, setDisable] = useState(true);
  const [arrFolder, setArrFolder] = useState([]);

  const showFolders = useCallback(
    async (folderId, moveItem, back) => {
      // setHistory((h) => {
      //   return h
      // });
      // lodash

      if (back === true) {
        history.pop();
        setHistory(history);
        folderId = history.splice(-1)[0];
        setDisable(false);
        if (folderId === null) {
          setHistory([null]);
          setDisable(true);
        }
      } else {
        const newdata = [...history, folderId];

        setHistory(newdata);
        if (folderId === null) {
          setDisable(true);
        } else {
          setDisable(false);
        }
      }

      const arr = await getFoldersForMoveModal(folderId, user.uid, moveItem);
      setArrFolder(arr);
    },
    [user, history, setHistory]
  );

  useEffect(() => {
    setShowModel(show);
    if (show === true) {
      showFolders(null, moveItem, false);
    }
  }, [show, moveItem, showFolders]);

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

  const selectFromList = (id) => {
    setArrFolder(
      arrFolder.map((folder) => {
        if (folder.id === id) {
          selectFolder(id);
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
        <Button disabled={disable} onClick={() => showFolders(null, moveItem, true)}>
          ←
        </Button>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {arrFolder.map((folder) => {
            return (
              <ListGroup.Item
                className='d-flex justify-content-between align-items-start'
                key={folder.id}
                disabled={folder.disablecond}
                action
                active={folder.activecond}
                onClick={() => selectFromList(folder.id)}>
                <div> {folder.foldername}</div>
                <Button
                  variant='light'
                  disabled={folder.disablecond}
                  onClick={() => showFolders(folder.id, moveItem, false)}>
                  →{' '}
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={moveFolder}>
          Move Here
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
