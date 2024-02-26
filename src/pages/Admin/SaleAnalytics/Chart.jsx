import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ( { data } ) => {
  return (
    <ResponsiveContainer width="90%" height={ 300 } margin={ { top: 20, right: 20, left: 20, bottom: 20 } }>
      <LineChart data={ data }>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis
          label={ { value: '', angle: -90, position: 'left' } }
          tickFormatter={ ( value ) => ( value > 1000 ? `${ ( value / 1000 ).toFixed( 1 ) }K` : value ) }
          domain={ [ 0, 'dataMax' ] }
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
