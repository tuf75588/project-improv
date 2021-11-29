import styles from './Ingredients.module.css';

// let us append as many classnames as we want

const classNames = (...names) => names.join(' ');

function Ingredients({ badRecipe, ingredients, selectedIngredient }) {
  return (
    <div
      className={classNames(styles.container, badRecipe ? styles.disabled : '')}
    >
      <div className={styles.info}>
        {ingredients[selectedIngredient] &&
          ingredients[selectedIngredient].name}
      </div>
      <div className={styles.ingredients}>
        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.name}
            style={{ background: ingredient.background }}
            className={classNames(
              styles.ingredient,
              selectedIngredient === index ? 'styles.selected' : ''
            )}
          ></div>
        ))}
      </div>
    </div>
  );
}
export default Ingredients;
