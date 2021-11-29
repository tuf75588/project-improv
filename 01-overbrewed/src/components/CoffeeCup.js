import styles from './CoffeeCup.module.css';

function CoffeeCup({ ingredients }) {
  return (
    <div className={styles.coffeeContainer}>
      <div className={styles.cup}>
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.name}
            style={{
              background: ingredient.background,
              height: `${(1 / ingredients.length) * 100}%`,
              width: `100%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default CoffeeCup;
