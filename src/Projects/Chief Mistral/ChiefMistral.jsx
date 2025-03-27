import React, { useEffect, useState, useRef, forwardRef } from 'react'
import ReactMarkdown from 'react-markdown'
import './ChiefMistral.css'
// import { chiefMistralLogo } from '../../assets/ChiefMistralLogo.jpg'
import { PlusIcon } from '../../assets/Icons'
import  ChiefMistralLogo from '../../assets/ChiefMistralLogo.jpg'

import { getRecipeFromMistral } from './AiModel'


const Header = () => {
    return (
        <header 
            className='d-flex justify-content-center align-items-center sticky-top mb-3 cc-header'
        >
            <img src={ChiefMistralLogo} alt='Logo' className='cc-logo'/>
            <h1 className='text-white'>Chief Mistral</h1>
        </header>
    )
}

const Footer = () => {
    return (
        <footer className='d-flex justify-content-center align-items-center p-2'>
            <small>@Little Thinker</small>
        </footer>
    )
}

const InputForm = ({ addIngredient }) => {

    const handleSumbit = (event) => {
        event.preventDefault(); // Prevent the page refresh after the form submitted
        const formData = new FormData(event.currentTarget);
        const newIngredient = formData.get("ingredient");

        addIngredient(newIngredient);

        event.currentTarget.reset(); // Clear the form after the submit
    }

    // If you are using the <label /> tag then use the htmlFor property to associate 
    // the input with an id, because we are directly working with an virtual DOM

    // Instead of using the onSubmit property, use the action property that automatically 
    // create the formData object

    return (
        <form className='mb-3' onSubmit={handleSumbit}>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-11 col-md-5 col-sm-7'>
                    <input
                        type='text'
                        className='form-control mb-2'
                        aria-label='Add ingredient'
                        placeholder='e.g. Tomato'
                        name='ingredient'
                        required
                    />
                    
                </div>
                <div className='col-5 col-md-4 col-sm-4'>
                    <button 
                        type='submit' 
                        className='btn btn-primary mb-2'
                        aria-label='Click to add a ingrident to the list for the recipe'
                    >
                        <PlusIcon width='1rem' height='1rem' className='p-3 align-baseline'/> Add ingredient
                    </button>
                </div>
            </div>
        </form>
    )
}

const IngredientList = ({ ingredientList }) => {
    return (
        <section className='m-1 p-3 list-group'>
            <div>
                {ingredientList.length ? <h3>Ingredients on hand:</h3> : <h5>No ingredient... Add here 👆🏽</h5>}
            </div>
            <div className='ms-5 mt-2'>
                <ul className='list-group'>
                    {ingredientList.map((item, index) => {
                        return (<li key={index} className='p-1'>{item}</li>)
                    }) }
                </ul>
            </div>
        </section>
    )
}

const GetRecipe = forwardRef((props, ref) => {
    // Functional components cannot directly accept refs the way class 
    // components can. Instead, you need to use React.forwardRef() 
    // to handle refs within functional components
    const [loading, setLoading] = useState(false);

    async function handleSubmitAPI() {
        setLoading(true);
        const markdownResponse = await getRecipeFromMistral(props.ingredientList);
        props.setRecipeIdea(markdownResponse);

        props.setRecipeShown(prevState => !prevState);
        setLoading(false);
        return;
    }

    return (
        <section className='col-12 col-md-12 col-sm-12 mt-3 d-flex justify-content-center'>
            <div className='row rounded p-2' style={{maxWidth: '700px', backgroundColor: 'rgba(211, 211, 211, 0.43)'}}>
                {props.showBtn ? (
                    <>
                        <div className='col-8' ref={ref}>
                            <div className=''>
                                <h5>Ready for a recipe?</h5>
                            </div>
                            <div className='text-secondary'>
                                <p>Generate a recipe from your list of ingredients</p>
                            </div>
                        </div>
                        <div className='col-4 d-flex justify-content-center align-items-center'>
                            <button type='submit' className='btn btn-primary' onClick={handleSubmitAPI} disabled={loading}>
                                {loading && <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true"></span>}
                                Get Recipe
                            </button>
                        </div>
                    </> ) : (
                        <p>Add more items to get the recipe</p>
                    )
                }
            </div>
        </section>
    )
})

const MistralRecipe = (props) => {
    return (
        <>
            <section className='p-3' aria-live='polite'>
                <h3>Mistral Recipe Recommentations</h3>
                <ReactMarkdown className='recipe-container'>{props.recipeIdea}</ReactMarkdown>
            </section>
        </>
    )
}

const MainContent = () => {
    const [ingredientList, setIngredientList] = useState([]);
    const [recipeShown, setRecipeShown] = useState(false);
    const [recipeIdea, setRecipeIdea] = useState('');

    const recipeRef = useRef(null); 
    // After the recipe is loaded, then the page is scrolled down, so that take the 
    // reference of the 'div' section where the 'get recipe' button is in.

    useEffect(() => {
        if(recipeIdea !== "" && recipeRef.current !== null) {
            recipeRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [recipeIdea])

    // Create the function and pass as props
    const addIngredient = (newIngredient) => {
        if(newIngredient && newIngredient.trim() !== '' && !/\d/.test(newIngredient)) {
            setIngredientList(
                prevIngredientList => [...prevIngredientList, newIngredient.trim()]
                // If you consider the previous values or change the state according to the previous value,
                // then you need to use like this.
            );
        }
    }

    return (
        <main className='container-fluid p-3'>
            <InputForm addIngredient={addIngredient} />
            <div className='' style={{ width: '80%', margin: '0 auto' }}>
                <IngredientList ingredientList={ingredientList} />
            </div>
            {ingredientList.length ? 
                ingredientList.length > 2 ? 
                    <GetRecipe 
                        showBtn={true} 
                        ingredientList={ingredientList} 
                        setRecipeShown={setRecipeShown}
                        setRecipeIdea={setRecipeIdea} 
                        ref={recipeRef}
                    /> : <GetRecipe showBtn={false} ingredientList={null} /> : null
            }
            {recipeShown ? (
                <>
                    <div className='mt-4 border'>
                        <MistralRecipe recipeIdea={recipeIdea} />
                    </div>
                </> ) : null
            }
        </main>
    )
}

const ChiefMistral = () => {
  return (
    <>
        <Header />
        <MainContent />
        <Footer />
    </>
  )
}

export default ChiefMistral