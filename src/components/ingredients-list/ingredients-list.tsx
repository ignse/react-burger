import React, {FC, LegacyRef, ReactChildren, ReactNode} from 'react';
import styles from './ingredients_list.module.css';

type IngredientsList = {
    title: string;
    name: string;
    sectionRef: LegacyRef<HTMLLabelElement>;
    children?: ReactNode;
};

const IngredientsList: FC<IngredientsList> = (props) => {
    return (
        <>
            <section className={`${styles.section_name} mt-10`}>
                <label className='text text_type_main-medium' ref={props.sectionRef}>
                    {props.title}
                </label>
            </section>
            <section className={styles.section_title}>
                    <section className={styles.section}>
                        {props.children}
                    </section>
            </section>
        </>
    );
}

export default IngredientsList;