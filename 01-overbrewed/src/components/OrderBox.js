import styles from './OrderBox.module.css';

function OrderBox({ ingredients, order, gameOver }) {
  return (
    <div className={styles.order}>
      <h3>Current Order:</h3>
      <ol>
        {order.map((ingredient, index) => (
          <li key={index}>
            {!gameOver &&
            ingredients[index] &&
            ingredients[index].name === ingredient.name
              ? '✅'
              : ingredients.length > index
              ? '❌'
              : ''}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default OrderBox;
