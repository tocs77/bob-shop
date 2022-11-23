import React from 'react';
import PropTypes from 'prop-types';
import { ImStarEmpty, ImStarHalf, ImStarFull } from 'react-icons/im';

const Rating = ({ value, text, color }: { value: number; text: string; color: string }) => {
  return (
    <div className='rating d-flex align-items-center'>
      <div className=' d-flex align-items-center mr-3'>
        <div style={{ color, marginRight: '3px', height: '1.5rem' }}>
          {value >= 1 ? <ImStarFull /> : value >= 0.5 ? <ImStarHalf /> : <ImStarEmpty />}
        </div>
        <div style={{ color, marginRight: '3px', height: '1.5rem' }}>
          {value >= 2 ? <ImStarFull /> : value >= 1.5 ? <ImStarHalf /> : <ImStarEmpty />}
        </div>
        <div style={{ color, marginRight: '3px', height: '1.5rem' }}>
          {value >= 3 ? <ImStarFull /> : value >= 2.5 ? <ImStarHalf /> : <ImStarEmpty />}
        </div>
        <div style={{ color, marginRight: '3px', height: '1.5rem' }}>
          {value >= 4 ? <ImStarFull /> : value >= 3.5 ? <ImStarHalf /> : <ImStarEmpty />}
        </div>
        <div style={{ color, marginRight: '3px', height: '1.5rem' }}>
          {value >= 5 ? <ImStarFull /> : value >= 4.5 ? <ImStarHalf /> : <ImStarEmpty />}
        </div>
      </div>

      <span style={{ verticalAlign: 'baseline' }}>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
