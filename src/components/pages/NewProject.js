import {useNavigate} from 'react-router-dom'

import styles from './NewProject.module.css'

import ProjectForm from '../project/ProjectForm'

function NewProject(){

    const history = useNavigate()

    function createPost(project){

        // initialize cost and service
        project.cost = 0
        project.services = []

        const { id, ...projectWithoutId } = project
        
        fetch("http://localhost:5000/projects",{
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(projectWithoutId), 
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            // redirect
             history('/projects', { state: { message: 'projeto criado com sucesso!' } })
        })
        .catch((err) => console.log(err))

    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie o seu projeto para depois adicionar serviços</p>
            <p>Formulário</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>

    )
}

export default NewProject