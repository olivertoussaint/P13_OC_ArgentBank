import PropTypes from 'prop-types'

function Item({ image, descriptionImage, title, description }) {
  return (
    <div className='feature-item'>
      <img src={image} alt={descriptionImage} className="feature-item-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

Item.propTypes = {
  image: PropTypes.string.isRequired,
  descriptionImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Item