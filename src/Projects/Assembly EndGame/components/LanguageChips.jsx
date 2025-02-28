import React, { useState, useEffect } from 'react'
import '../index.css';
import clsx from 'clsx';
import { languages } from '../assets/languages'

const LanguageChips = (props) => {

    const [availableLanguages, setAvailableLanguages] = useState([]);

    useEffect(() => {
        const newArray = [];
        for(let i=props.lostCount; i<languages.length; i++) {
            if(i < props.lostCount) {
                newArray.push("blank");
            }
            else {
                newArray.push(languages[i].name);
            }
        }
        setAvailableLanguages(newArray);
    }, [props.lostCount]);

    const languageChips = languages.map((language, index) => {
        const styles = {
            backgroundColor: language.backgroundColor,
            color: language.color,
            fontSize: 'large'
        }

        const isLost = index < props.lostCount;

        const className = clsx({
            lost: isLost,
        });

        return (
            <span 
                key={language.name} 
                className={`badge badge-pill m-1 p-2 ${className}`}
                style={styles}
                aria-live='polite'
            >
                {language.name}
            </span>
        )
    })

  return (
    <>
        <section className='d-flex flex-wrap justify-content-center align-items-center language-section'>
          {languageChips}
        </section>
        <section
            className='d-none'
            aria-live='polite'
            role='status'
        >
            <p>
                Currently Available Language: 
                {
                    " " + availableLanguages.map((language) => language).join('. ')
                    /**Adding the dot(.) between the each languages, the screen reader 
                     * make a small pause for that before go to the next 
                    */ 
                }
            </p>
        </section>
    </>
  )
}

export default LanguageChips