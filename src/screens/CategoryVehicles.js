import React from 'react';
import Cars from '../components/VehiclesCars';
import MotorBike from '../components/VehiclesMotorBike';
import Bike from '../components/VehiclesBike';
import Popular from '../components/VehiclePopular';

const CategoryVehicles = ({navigation, route}) => {
  const {category, cars, motorbike, bike, popular} = route.params;
  console.log('CATEGORY', category);
  // console.log('CARS', cars);
  // console.log('MOTORBIKE', motorbike);
  // console.log('BIKE', bike);
  return (
    <>
      {category === 'cars' ? (
        <Cars navigation={navigation} cars={cars} />
      ) : category === 'motorbike' ? (
        <MotorBike navigation={navigation} motorbike={motorbike} />
      ) : category === 'bike' ? (
        <Bike navigation={navigation} bike={bike} />
      ) : category === 'popular' ? (
        <Popular navigation={navigation} popular={popular} />
      ) : null}
    </>
  );
};

export default CategoryVehicles;
