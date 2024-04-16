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
    const [editId, setEditId] = useState(null);
    const [editMovie, setEditMovie] = useState('');
    const [editActor, setEditActor] = useState('');
    const [editDirector, setEditDirector] = useState('');
    const [movie, setMovie] = useState('');
    const [actor, setActor] = useState('');
    const [user, setUser] = useState('');
    const [director, setDirector] = useState('');
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

    const handleEdit = (id, movie, actor, director,user) => {
        setEditId(id);
        setEditMovie(movie);
        setEditActor(actor);
        setEditDirector(director);
        setUser(user);
        setShow(true);
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            try {
                const response = await fetch(`http://localhost:5022/api/FavoriteMovies/${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Failed to delete favorite movie');
                }
                fetchFavoriteMovies();
            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleUpdate = async (e) => {
        console.log("entered update method")
        console.log(e)
        const s = 3
        try {
            const response = await fetch(`http://localhost:5022/api/FavoriteMovies`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: editId,
                    userName: user,
                    movieName: editMovie,
                    actor: editActor,
                    director: editDirector
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update favorite movie');
            }
            setShow(false);
            fetchFavoriteMovies();
        } catch (error) {
            console.error(error);
        }
    }
    

    const handleAdd = async () => {
        try {
            const response = await fetch('http://localhost:5022/api/FavoriteMovies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    movieName: movie,
                    actor: actor,
                    director: director
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add favorite movie');
            }
            setMovie('');
            setActor('');
            setDirector('');
            setUser('');
            fetchFavoriteMovies();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col><input type="text" className="form-control" placeholder="Enter Movie" value={movie} onChange={(e) => setMovie(e.target.value)} /></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter Director" value={actor} onChange={(e) => setActor(e.target.value)} /></Col>
                    <Col><input type="text" className="form-control" placeholder="Enter Actor" value={director} onChange={(e) => setDirector(e.target.value)} /></Col>
                    <Col><button className="btn btn-primary" onClick={handleAdd}>Submit</button> </Col>
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
                        <tr key={index + 1}>
                            <td>{item.movieName}</td>
                            <td>{item.actor}</td>
                            <td>{item.director}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleEdit(item.id, item.movieName, item.actor, item.director, item.userName)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify Favorites</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col><input type="text" className="form-control" placeholder="Enter Movie" value={editMovie} onChange={(e) => setEditMovie(e.target.value)} /></Col>
                        <Col><input type="text" className="form-control" placeholder="Enter Director" value={editActor} onChange={(e) => setEditActor(e.target.value)} /></Col>
                        <Col><input type="text" className="form-control" placeholder="Enter Actor" value={editDirector}  onChange={(e) => setEditDirector(e.target.value)} /></Col>                        
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={(e) => handleUpdate(e)}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ManageFavorites;
