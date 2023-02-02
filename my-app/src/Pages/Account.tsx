import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddFolderbtn from '../Components/AddFolderbtn';
import AddFilebtn from '../Components/AddFilebtn';
import { connect } from 'react-redux';
import NavBar from '../Components/NavBar.js';
import { FaFolder } from 'react-icons/fa';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import { AiFillFile } from 'react-icons/ai';
import { BsImage } from 'react-icons/bs';
import MoveModal from '../Components/MoveModal';
import { deleteFile, deleteFolder, getFoldersOrFilesQuery } from '../Firebase/Firebase';
import { Dropdown, Table, Container, Row, Col, DropdownButton, Breadcrumb } from 'react-bootstrap';
import { onSnapshot } from 'firebase/firestore';
import { selectFolder, updateFolder, setChildFile, setChildFolder } from '../Store/Actions';

const Account = ({
  folderId,
  user,
  selectFolder,
  setChildFile,
  setChildFolder,
  childFile,
  childFolder
}) => {
  const navigate = useNavigate();
  const { folderIdParams } = useParams();
  const [show, setShow] = useState(false);
  const [moveItem, setMoveItem] = useState(null);
  const [moveItemType, setMoveItemType] = useState(null);

  useEffect(() => {
    if (!!folderIdParams === false) {
      selectFolder(null);
    } else {
      selectFolder(folderIdParams);
    }
  }, [folderIdParams, selectFolder]);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      const q = getFoldersOrFilesQuery('folder', folderId, user.uid);
      onSnapshot(q, (querySnapshot) => {
        const childarr = [];
        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };
          childarr.push(data);
        });
        setChildFolder(folderId, childarr);
      });
    }
  }, [folderId, setChildFolder, user]);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      const q = getFoldersOrFilesQuery('file', folderId, user.uid);

      onSnapshot(q, (querySnapshot) => {
        const childarr = [];
        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };
          childarr.push(data);
        });
        setChildFile(folderId, childarr);
      });
    }
  }, [folderId, user, setChildFile]);

  const goToFolder = (folderid: any) => {
    navigate(`/Account/${folderid}`);
  };

  function IconType({ name }) {
    if (name === 'application/pdf') {
      return <BsFileEarmarkPdf className='icon2' />;
    } else {
      if (name === 'image/jpeg') {
        return <BsImage className='icon2' />;
      } else {
        return <AiFillFile className='icon2' />;
      }
    }
  }
  const showMoveModal = (current: any, type: any) => {
    setMoveItem(current);
    setMoveItemType(type);
    setShow(true);
  };
  const closeMoveModal = () => {
    setShow(false);
  };

  const viewFile = (url: any) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const DeleteFile = async (id: any, name: any) => {
    await deleteFile(id, name);
  };

  const DeleteFolder = async (id: any) => {
    await deleteFolder(id);
  };

  // const downloadfile = async (url, name) => {
  //   // const img = document.getElementById("myimg");
  //   // img.setAttribute("src", url);

  //   // const a = document.createElement("a");
  //   // a.href = url;
  //   // a.download = name;
  //   // document.body.appendChild(a);
  //   // a.click();
  //   // document.body.removeChild(a);

  //   // console.log(url);

  //   // let blob = await fetch(url, {
  //   //   method: "get",
  //   //   mode: "no-cors",
  //   //   referrerPolicy: "no-referrer",
  //   // });
  //   // console.log(blob);

  //   // const storage = getStorage();
  //   // const storageRef = ref(storage, "IMG_3273.PNG");
  //   // const blobb = await getBlob(storageRef);
  //   // console.log(blobb);
  //   // const urlo = URL.createObjectURL(blobb);

  //   // fetch(url, {
  //   //   method: "get",
  //   //   mode: "no-cors",
  //   //   referrerPolicy: "no-referrer",
  //   // })
  //   //   .then((res) => res.blob())
  //   //   .then((res) => {
  //   //     console.log(res);
  //   //     const x = URL.createObjectURL(res);
  //   //     console.log(x);
  //   //     const a = document.createElement("a");
  //   //     a.href = x;
  //   //     a.download = name;
  //   //     document.body.appendChild(a);
  //   //     a.click();
  //   //     document.body.removeChild(a);
  //   //     // URL.revokeObjectURL(x);
  //   //   });

  //   const xhr = new XMLHttpRequest();
  //   xhr.responseType = "blob";
  //   xhr.onload = (event) => {
  //     const blob = xhr.response;
  //     console.log(blob);
  //   };
  //   xhr.open("GET", url);
  //   xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  //   xhr.setRequestHeader(
  //     "Access-Control-Allow-Methods",
  //     "GET,HEAD,OPTIONS,POST,PUT"
  //   );
  //   xhr.setRequestHeader(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  //   );
  //   xhr.send();
  // };

  return (
    <div className='App'>
      <NavBar />

      <Container className='Homecontainer'>
        <Row className='Homerow' style={{ height: '90%' }}>
          <div className='carddrive'>
            <Row className='mt-5'>
              <Col>
                <h1 className='  fw-bold  ' style={{ color: 'black' }}>
                  My Cloud
                </h1>
              </Col>
              <Col md='auto'>
                <AddFolderbtn> </AddFolderbtn>
              </Col>
              <Col md='auto'>
                <AddFilebtn> </AddFilebtn>
              </Col>
            </Row>

            <Row style={{ alignItems: 'center', justifyContent: 'center' }} className='px-3 mt-3'>
              <Table borderless hover>
                <thead>
                  <tr>
                    <th> Name</th>

                    {/* <th>Size</th> */}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {childFolder.map(
                    (childfolder: {
                      id: React.Key | null | undefined;
                      foldername:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                    }) => {
                      return (
                        <tr key={childfolder.id} onClick={() => goToFolder(childfolder.id)}>
                          <td>
                            <FaFolder className='icon2' />
                            {childfolder.foldername}
                          </td>
                          {/* <td> </td> */}

                          <td>
                            <DropdownButton
                              // rootCloseEvent="mousedown"
                              title='...'
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              id={`dropdown-button-drop-${childfolder.id}`}>
                              <Dropdown.Item onClick={() => DeleteFolder(childfolder.id)}>
                                Delete
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => showMoveModal(childfolder.id, 'folder')}>
                                Move
                              </Dropdown.Item>
                            </DropdownButton>
                          </td>
                        </tr>
                      );
                    }
                  )}

                  {childFile.map(
                    (childfile: {
                      id: React.Key | null | undefined;
                      fileurl: any;
                      type: any;
                      filename:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined;
                    }) => {
                      return (
                        <tr key={childfile.id} onClick={() => viewFile(childfile.fileurl)}>
                          <td>
                            <IconType name={childfile.type} />

                            {childfile.filename}
                          </td>

                          {/* <td> {childfile.size}</td> */}
                          <td>
                            <DropdownButton title='...' onClick={(e) => e.stopPropagation()}>
                              <Dropdown.Item
                                onClick={() => DeleteFile(childfile.id, childfile.filename)}>
                                Delete
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => showMoveModal(childfile.id, 'file')}>
                                Move
                              </Dropdown.Item>
                            </DropdownButton>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </Table>
            </Row>
          </div>
        </Row>
      </Container>

      <MoveModal
        show={show}
        moveItem={moveItem}
        moveItemType={moveItemType}
        closeMoveModal={closeMoveModal}></MoveModal>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user,
    folderId: state.folderid,
    childFolder: state.childfolder,
    childFile: state.childfile
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    payload:
      | { FolderId: any }
      | { FolderId: any }
      | { FolderId: any; ChildFolder: any }
      | { FolderId: any; ChildFile: any };
  }) => any
) => {
  return {
    selectFolder: (folderid: any) => dispatch(selectFolder(folderid)),
    updateFolder: (folderid: any) => dispatch(updateFolder(folderid)),
    setChildFolder: (id: any, arr: any) => dispatch(setChildFolder(id, arr)),
    setChildFile: (id: any, arr: any) => dispatch(setChildFile(id, arr))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);

//export default Account;
