import PropTypes from 'prop-types';

function Item({ image, descriptionImage, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 transition-transform duration-300 ease-in-out transform hover:scale-105 bg-gray-50 dark:bg-gray-800 sm:md:rounded-lg sm:md:shadow-md lg:bg-transparent lg:shadow-none lg:hover:scale-100">
      <div className="flex items-center justify-center w-36 h-36 border-8 lg:border-10 border-green-500 rounded-full bg-white">
        <img
          src={image}
          alt={descriptionImage}
          className="w-20 h-20"
        />
      </div>
      <h3 className="text-lg font-semibold mt-4 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

Item.propTypes = {
  image: PropTypes.string.isRequired,
  descriptionImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Item;
