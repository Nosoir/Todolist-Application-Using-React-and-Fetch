import React,{ useState, useEffect } from "react";
import '../../styles/index.css';

//create your first component
const Home = () => {

	const [tarea, setTarea] = useState("");
	const [listaDeTareas, setListaDeTareas] = useState([]);

	// Funcion para agregar una nueva tarea
	const nuevaTarea = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			setListaDeTareas([...listaDeTareas, { label: tarea, done: false }]);
			setTarea("");
			modificarTarea([...listaDeTareas, { label: tarea, done: false }]);
			console.log(listaDeTareas);
		}
	};

	// Funcion para borrar una tarea
	function borrar (id) {
		const unaTarea = listaDeTareas.filter((tarea, index) => {
			if (index !== id) {
				return tarea;
			};
		})
		setListaDeTareas(unaTarea);
		modificarTarea(unaTarea);
	};

	// PUT
	const modificarTarea = async () => {
		const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/astrid1', {
			method: "PUT",
			body: JSON.stringify([...listaDeTareas, { label: tarea, done: false }]),
			headers: {
				'Content-Type': "application/json"
			}
		})
		const data = await response.json();
		console.log(data);
	}

	console.log(listaDeTareas);	
	useEffect(() => {
		// GET
		fetch('https://assets.breatheco.de/apis/fake/todos/user/astrid1')
			.then((response) => response.json())
			.then((data) => setListaDeTareas(data))
			.catch((err) => console.log(err))
	}, [])



	return (
		<div className="container">
			<div className="m-3">
				<h1>To do List</h1>
				<hr className='una' />
				<p></p>
					<form>
						<div className="input-group input-group-lg">
							<label className="input-group-text rounded-0"><i className="fas fa-tasks"></i></label>
							<input className="form-control form-control-lg shadow-none fs-2" type="text" placeholder="What needs to be done?" 
								 onChange={(e) => setTarea(e.target.value)}
								value={tarea} onKeyDown={nuevaTarea} />
						</div>
					</form>
					<ul className="list-group">	
					{listaDeTareas.map((tarea, id)=><li className="list-group-item fs-4" key={id}>
						{tarea.label} 
						<button className="btn btn-outline-dark border border-0 float-end" onClick={() => borrar(id)}>X</button>
					</li>)}
				</ul>
				<div className="p-2 color"> {listaDeTareas.length == 0 ? "No hay tareas, añade una" : "Numero de tareas: " + listaDeTareas.length}</div>
			</div>
		</div>
	);
};

export default Home;
