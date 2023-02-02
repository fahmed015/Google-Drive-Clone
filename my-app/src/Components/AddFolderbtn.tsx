import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiFolderPlus } from 'react-icons/fi';
import { Button, Form, Modal } from 'react-bootstrap';
import { createFolder } from '../Firebase/Firebase';
import { StateRoot } from '../Store/Reducer';
export default function AddFolderbtn(props: any) {
  const currentFolder = useSelector((state: StateRoot) => state.folderid);
  const user = useSelector((state: StateRoot) => state.user);
  const [show, setShow] = useState(false);
  const [folderName, setFolderName] = useState('');

  const handleClose = () => {
    setFolderName('');
    setShow(false);
  };
  const handleShow = () => {
    setFolderName('');
    setShow(true);
  };

  const addFolder = async () => {
    handleClose();
    if (folderName) {
      await createFolder(folderName, currentFolder, user.uid);
    }
  };

  return (
    <div>
      <Button className='DriveButton' onClick={handleShow}>
        <FiFolderPlus className='icon' />
        Add Folder
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        {/* <Modal.Header closeButton></Modal.Header> */}
        <Modal.Body>
          <div>New Folder</div>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                // placeholder="Folder Name"
                onChange={(e) => setFolderName(e.target.value)}
                value={folderName}
              />
            </Form.Group>
          </Form>
          <div className='d-flex justify-content-end'>
            <Button variant='secondry' onClick={handleClose}>
              cancel
            </Button>
            <Button className='addfolderbtn' onClick={addFolder}>
              Create
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
