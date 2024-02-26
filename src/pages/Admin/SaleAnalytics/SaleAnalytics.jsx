import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Chart from './Chart';

const formatDate = ( date ) => {
  const year = date.getFullYear();
  const month = String( date.getMonth() + 1 ).padStart( 2, '0' );
  const day = String( date.getDate() ).padStart( 2, '0' );
  return `${ year }/${ month }/${ day }`;
};

const revenueData = [
  { date: '2023-10-04', revenue: 5564000 },
  { date: '2023-10-05', revenue: 5564000 },
  { date: '2023-10-06', revenue: 28984000 },
  { date: '2023-10-07', revenue: 728000 },
  // Thêm dữ liệu cho các ngày còn lại
];

const SaleAnalytics = () => {
  const [ startDate, setStartDate ] = useState( '' );
  const [ finishDate, setFinishDate ] = useState( '' );

  const handleStartDateChange = ( e ) => {

    setStartDate( e.target.value );
  }

  const handleFinishDateChange = ( e ) => {
    setFinishDate( e.target.value );
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Ngày bắt đầu</Form.Label>
              <Form.Control
                type="date"
                value={ startDate }
                onChange={ handleStartDateChange }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Ngày kết thúc</Form.Label>
              <Form.Control
                type="date"
                value={ finishDate }
                onChange={ handleFinishDateChange }
                min={ startDate }
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
      <div className='mt-4'></div>
      <div className="chart" style={ { marginLeft: 100 } }>
        <Chart data={ revenueData } chartName="Biểu đồ doanh thu" />
      </div >
    </>
  )
}

export default SaleAnalytics