import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const ManageFavorites = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //For New Entries
    const [movie, setMovie]  = useState('');
    const [actor, setActor]  = useState('');
    const [director, setDirector]  = useState('');

    //For edit form
   // const [editID , setEditId] = useState('');
    const [editmovie, setEditMovie]  = useState('');
    const [editactor, setEditActor]  = useState('');
    const [editdirector, setEditDirector]  = useState('');

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavoriteMovies();
    }, []);

    const fetchFavoriteMovies = async () => {
        try {
            const response = await fetch('http://localhost:5022/api/FavoriteMovies');
            if (!response.ok) {
                throw new Error('Failed to fetch favorite movies');
            }
            const data = await response.json();
            setFavorites(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (id) => {
        //alert(id);
        handleShow();
    }
    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete")== true)
        {
            alert(id);
        }
       
    }

    const handleUpdate = () => {
       
    }

    return (
        <>
        <Container>
        <Row>
             <Col><input type="text" className="form-control" placeholder="Enter Movie" value ={movie} onChange={(e)=> setMovie(e.target.value)}/></Col>          
             <Col><input type="text" className="form-control" placeholder="Enter Director" value={actor} onChange={(e)=> setActor(e.target.value)}  /></Col>
             <Col><input type="text" className="form-control" placeholder="Enter Actor" value={director} onChange={(e)=> setDirector(e.target.value)} /></Col>
             <Col><button className="btn btn-primary" > Submit </button> </Col>
        </Row>
         
         </Container>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Favorite Movie</th>
                    <th>Actor</th>
                    <th>Director</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {favorites.map((item, index) => (
                    <tr key={index+ 1}>
                        <td>{item.movieName}</td>  
                        <td>{item.actor}</td>
                        <td>{item.director}</td>
                        <td colSpan={2}>
                            <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}>Edit</button> &nbsp;
                            <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}>Delete </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
         <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
           <Modal.Title>Modify Favorites</Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <Row>
             <Col><input type="text" className="form-control" placeholder="Enter Movie" value ={editmovie} onChange={(e)=> setEditMovie(e.target.value)}/></Col>          
             <Col><input type="text" className="form-control" placeholder="Enter Director" value={editactor} onChange={(e)=> setEditActor(e.target.value)}  /></Col>
             <Col><input type="text" className="form-control" placeholder="Enter Actor" value={editdirector} onChange={(e)=> setEditDirector(e.target.value)} /></Col>
        </Row>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={handleClose}>
             Close
           </Button>
           <Button variant="primary" onClick={handleUpdate}>
             Save Changes
           </Button>
         </Modal.Footer>
       </Modal>
     </>
    );
}

export default ManageFavorites;
